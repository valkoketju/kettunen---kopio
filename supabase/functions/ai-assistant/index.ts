// Supabase Edge Function: AI chat stream proxy
// - Reads messages from request body { messages: Array<{role:string, content:string}> }
// - Proxies to an OpenAI-compatible Chat Completions API with stream=true
// - Emits SSE lines "data: <json>" compatible with OpenAI delta format

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });
}

function sseHeaders() {
  return {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache, no-transform",
    "Connection": "keep-alive",
    ...corsHeaders,
  };
}

function getConfig() {
  const apiUrl = Deno.env.get("AI_API_URL") || "https://openrouter.ai/api/v1/chat/completions";
  const apiKey = Deno.env.get("AI_API_KEY") || Deno.env.get("LOVABLE_API_KEY");
  const model = Deno.env.get("AI_MODEL") || "openai/gpt-4o-mini";
  return { apiUrl, apiKey, model };
}

// Basic system prompt to keep responses helpful
const SYSTEM_PROMPT = {
  role: "system",
  content:
    "You are a helpful assistant for a tattoo and art portfolio website. Be concise, friendly, and answer in the user's language when possible.",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" }, 405);
  }

  let payload: any;
  try {
    payload = await req.json();
  } catch (_) {
    return jsonResponse({ error: "Invalid JSON" }, 400);
  }

  const messages = Array.isArray(payload?.messages) ? payload.messages : null;
  if (!messages || messages.length === 0) {
    return jsonResponse({ error: "Missing messages array" }, 400);
  }

  const { apiUrl, apiKey, model } = getConfig();
  if (!apiKey) {
    // Payment required / missing credentials
    return new Response("", { status: 402, headers: corsHeaders });
  }

  const upstreamBody = {
    model,
    stream: true,
    messages: [SYSTEM_PROMPT, ...messages],
  };

  let upstream: Response;
  try {
    upstream = await fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(upstreamBody),
    });
  } catch (err) {
    console.error("Upstream fetch error:", err);
    return jsonResponse({ error: "Upstream connection failed" }, 502);
  }

  if (upstream.status === 429) {
    return new Response("", { status: 429, headers: corsHeaders });
  }

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text();
    return jsonResponse({ error: "Upstream error", detail: text }, upstream.status || 500);
  }

  // Pipe upstream stream to client as SSE
  const reader = upstream.body.getReader();
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      try {
        controller.enqueue(encoder.encode(`:ok\n\n`));
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          // Forward as-is; upstream already sends OpenAI-style SSE lines
          controller.enqueue(value);
        }
        // End of stream
        controller.enqueue(encoder.encode(`data: [DONE]\n\n`));
      } catch (err) {
        console.error("Stream relay error:", err);
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "stream_error" })}\n\n`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, { status: 200, headers: sseHeaders() });
});