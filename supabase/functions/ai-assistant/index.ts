import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();

    // Support configurable AI providers via environment variables.
    // Falls back to Lovable gateway if custom variables are not provided.
    const API_URL = Deno.env.get("AI_API_URL") ?? "https://ai.gateway.lovable.dev/v1/chat/completions";
    const API_KEY = Deno.env.get("AI_API_KEY") ?? Deno.env.get("LOVABLE_API_KEY");
    const MODEL = Deno.env.get("AI_MODEL") ?? "google/gemini-2.5-flash";

    if (!API_KEY) {
      throw new Error("AI_API_KEY (tai LOVABLE_API_KEY) ei ole asetettu");
    }

    console.log("AI Assistant request received");

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: MODEL,
        messages: [
          { 
            role: "system", 
            content: "Olet ystävällinen asiakaspalveluassistentti taide- ja tatuointisivustolla. Autathan kävijöitä löytämään haluamansa teokset, vastaat kysymyksiin tuotteista, ja kerrot miten he voivat ottaa yhteyttä tai jättää arvostelun. Pidä vastaukset lyhyinä ja ytimekkäinä." 
          },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Liikaa pyyntöjä. Yritä hetken kuluttua uudelleen." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Maksutiedot vaaditaan. Ota yhteyttä ylläpitoon." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (response.status === 401) {
        return new Response(JSON.stringify({ error: "Virheellinen tai puuttuva API-avain." }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      
      throw new Error(`AI API error: ${response.status}`);
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Error in ai-assistant function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});