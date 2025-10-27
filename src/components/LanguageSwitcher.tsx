import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => setLanguage(language === "fi" ? "en" : "fi")}
      className="gap-2 hover:scale-105 transition-transform rounded-full"
    >
      <Globe size={16} />
      <span className="font-medium">{language === "fi" ? "EN" : "FI"}</span>
    </Button>
  );
};
