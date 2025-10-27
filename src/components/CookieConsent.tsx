import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

export const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { t } = useLanguage();

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      setTimeout(() => setIsVisible(true), 1000);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <Card className="w-full max-w-2xl p-6 shadow-2xl animate-slide-in-bottom border-2 border-primary/20 bg-gradient-to-br from-card via-card to-card/95">
        <div className="space-y-4">
          <div className="space-y-2">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              {t("cookie.title")}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {t("cookie.description")}
            </p>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              onClick={handleDecline}
              className="hover:scale-105 transition-transform"
            >
              {t("cookie.decline")}
            </Button>
            <Button
              onClick={handleAccept}
              className="bg-gradient-to-r from-primary to-primary/80 hover:scale-105 transition-transform shadow-lg"
            >
              {t("cookie.accept")}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};
