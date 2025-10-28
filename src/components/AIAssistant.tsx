import { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { MessageCircle, X, Send, Sparkles } from "lucide-react";
import { Card } from "./ui/card";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";

type Message = {
  role: "user" | "assistant";
  content: string;
};

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Initialize a persistent session id for chat logging
    const existing = localStorage.getItem("ai_session_id");
    if (existing) {
      setSessionId(existing);
    } else {
      const id = crypto.randomUUID();
      localStorage.setItem("ai_session_id", id);
      setSessionId(id);
    }
  }, []);

  const streamChat = async (userMessage: Message, retryCount = 0) => {
    const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-assistant`;
    const MAX_RETRIES = 3;
    const RETRY_DELAY = 2000; // 2 sekuntia
    
    try {
      // Log user message to Supabase
      if (sessionId) {
        await supabase.from("ai_messages").insert({
          session_id: sessionId,
          role: "user",
          content: userMessage.content,
        });
      }

      const response = await fetch(CHAT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Supabase Edge Functions require an Authorization header by default
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (response.status === 429) {
        if (retryCount < MAX_RETRIES) {
          toast({
            title: t("ai.error.retry"),
            description: t("ai.error.retry.desc", { count: retryCount + 1, max: MAX_RETRIES }),
            variant: "default",
          });
          
          // Odota ennen uudelleenyritystä
          await new Promise(resolve => setTimeout(resolve, RETRY_DELAY * (retryCount + 1)));
          
          // Yritä uudelleen kasvavalla viiveellä
          return streamChat(userMessage, retryCount + 1);
        } else {
          toast({
            title: t("ai.error.rate"),
            description: t("ai.error.rate.desc"),
            variant: "destructive",
          });
          setIsLoading(false);
          return;
        }
      }

      if (response.status === 402) {
        toast({
          title: t("ai.error.payment"),
          description: t("ai.error.payment.desc"),
          variant: "destructive",
        });
        setIsLoading(false);
        return;
      }

      if (!response.ok) {
        // Jos vastaus ei ole ok, mutta ei ole 429 tai 402, käsitellään se tässä
        const errorText = await response.text();
        console.error("API error:", response.status, errorText);
        
        // Lisätään virheilmoitus keskusteluun
        const errorMessage = "Virhe palvelussa. Yritä myöhemmin uudelleen.";
        setMessages(prev => [...prev, { role: "assistant", content: errorMessage }]);
        setIsLoading(false);
        return;
      }
      
      if (!response.body) {
        throw new Error("Failed to start stream");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let textBuffer = "";
      let streamDone = false;
      let assistantContent = "";
      let hasAddedMessage = false;

      while (!streamDone) {
        const { done, value } = await reader.read();
        if (done) break;
        
        textBuffer += decoder.decode(value, { stream: true });

        let newlineIndex: number;
        while ((newlineIndex = textBuffer.indexOf("\n")) !== -1) {
          let line = textBuffer.slice(0, newlineIndex);
          textBuffer = textBuffer.slice(newlineIndex + 1);

          if (line.endsWith("\r")) line = line.slice(0, -1);
          if (line.startsWith(":") || line.trim() === "") continue;
          if (!line.startsWith("data: ")) continue;

          const jsonStr = line.slice(6).trim();
          if (jsonStr === "[DONE]") {
            streamDone = true;
            break;
          }

          try {
            const parsed = JSON.parse(jsonStr);
            const content = parsed.choices?.[0]?.delta?.content as string | undefined;
            
            if (content) {
              assistantContent += content;
              
              // Varmistetaan, että viesti lisätään vain kerran, jos sisältöä ei ole
              if (!hasAddedMessage) {
                setMessages(prev => [...prev, { role: "assistant", content: assistantContent }]);
                hasAddedMessage = true;
              } else {
                // Päivitetään olemassa olevaa viestiä
                setMessages(prev => 
                  prev.map((m, i) => i === prev.length - 1 ? { ...m, content: assistantContent } : m)
                );
              }
            }
          } catch (e) {
            console.error("JSON parse error:", e, "Line:", jsonStr);
            textBuffer = line + "\n" + textBuffer;
            break;
          }
        }
      }
      
      // Jos ei saatu mitään sisältöä, lisätään virheilmoitus
      if (!assistantContent) {
        setMessages(prev => [...prev, { role: "assistant", content: "Pahoittelut, en saanut vastausta. Yritä uudelleen." }]);
      }

      // Persist assistant message when stream completes
      if (assistantContent && sessionId) {
        await supabase.from("ai_messages").insert({
          session_id: sessionId,
          role: "assistant",
          content: assistantContent,
        });
      }

      setIsLoading(false);
    } catch (error) {
      console.error("Stream error:", error);
      toast({
        title: t("ai.error.connection"),
        description: t("ai.error.connection.desc"),
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    await streamChat(userMessage);
  };

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group fixed bottom-4 right-4 z-[60] w-16 h-16 rounded-full bg-gradient-to-br from-primary via-primary/90 to-primary/70 text-primary-foreground shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] hover:shadow-[0_25px_70px_-15px_rgba(0,0,0,0.4)] hover:scale-110 transition-all duration-500 border-2 border-primary-foreground/20 backdrop-blur-xl relative overflow-hidden flex items-center justify-center"
        aria-label="Toggle AI Assistant"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
        <div className="relative">
          {isOpen ? <X size={28} className="animate-fade-in" /> : <Sparkles size={28} className="animate-pulse" />}
        </div>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-24 right-4 z-[60] w-[420px] h-[600px] flex flex-col shadow-[0_25px_80px_-15px_rgba(0,0,0,0.4)] animate-scale-in rounded-3xl overflow-hidden border-2 border-primary/30 backdrop-blur-2xl bg-gradient-to-br from-card/95 via-card/90 to-card/95">
          <div className="relative p-6 bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/20 via-transparent to-transparent" />
            <div className="relative flex items-center gap-4">
              <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary-foreground/30 to-primary-foreground/10 flex items-center justify-center backdrop-blur-sm border border-primary-foreground/20 shadow-lg">
                <Sparkles size={24} className="animate-pulse" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
              </div>
              <div>
                <h3 className="font-bold text-lg">{t("ai.title")}</h3>
                <p className="text-sm opacity-90">{t("ai.subtitle")}</p>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-muted/5 to-transparent">
            {messages.length === 0 && (
              <div className="text-muted-foreground text-sm text-center mt-12 p-6 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50 backdrop-blur-sm">
                <Sparkles className="w-8 h-8 mx-auto mb-3 text-primary animate-pulse" />
                <p className="leading-relaxed">{t("ai.welcome")}</p>
              </div>
            )}
            
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === "user" ? "justify-end" : "justify-start"} animate-fade-in`}
              >
                <div
                  className={`max-w-[85%] p-4 rounded-3xl shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-[1.02] ${
                    message.role === "user"
                      ? "bg-gradient-to-br from-primary via-primary/95 to-primary/80 text-primary-foreground border border-primary-foreground/20"
                      : "bg-gradient-to-br from-card to-card/80 text-foreground border border-border/50 backdrop-blur-sm"
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="bg-gradient-to-br from-card to-card/80 p-4 rounded-3xl border border-border/50 backdrop-blur-sm shadow-lg">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce shadow-lg" style={{ animationDelay: "0ms" }} />
                    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce shadow-lg" style={{ animationDelay: "150ms" }} />
                    <div className="w-2.5 h-2.5 bg-primary rounded-full animate-bounce shadow-lg" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          <div className="p-5 border-t border-border/50 bg-gradient-to-br from-muted/20 to-transparent backdrop-blur-sm">
            <div className="flex gap-3">
              <Textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
                placeholder={t("ai.placeholder")}
                className="resize-none rounded-2xl border-2 border-border/50 bg-card/50 backdrop-blur-sm focus:border-primary/50 transition-all duration-300 shadow-sm"
                rows={2}
                disabled={isLoading}
              />
              <Button
                onClick={handleSend}
                disabled={isLoading || !input.trim()}
                size="icon"
                className="self-end h-11 w-11 rounded-2xl bg-gradient-to-br from-primary to-primary/80 hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Send size={20} />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  );
};