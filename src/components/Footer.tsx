import { Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Footer = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [pwd, setPwd] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD ?? "dev1234";

  const handleAccess = () => {
    if (pwd === ADMIN_PASSWORD) {
      setError(null);
      navigate("/admin");
    } else {
      setError("Väärä salasana");
    }
  };

  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">{t("home.hero.title")}</h3>
            <p className="text-muted-foreground text-sm">
              {t("home.hero.subtitle")}
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">{t("nav.portfolio")}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/portfolio" className="hover:text-primary transition-colors">{t("nav.portfolio")}</a></li>
              <li><a href="/kauppa" className="hover:text-primary transition-colors">{t("nav.shop")}</a></li>
              <li><a href="/yhteystiedot" className="hover:text-primary transition-colors">{t("nav.contact")}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Social Media</h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label="TikTok"
              >
                <SiTiktok size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {t("home.hero.title")}. {t("footer.rights")}
        </div>

        {/* Minimal Dev panel access */}
        <div className="mt-6 pt-6 border-t border-border flex flex-col items-center gap-1">
          {!showPrompt ? (
            <button
              className="text-[10px] text-muted-foreground hover:text-foreground tracking-wide"
              onClick={() => setShowPrompt(true)}
            >
              Dev panel
            </button>
          ) : (
            <div className="flex w-full max-w-xs items-center gap-2">
              <Input
                type="password"
                placeholder="Anna salasana"
                value={pwd}
                className="h-8 text-xs"
                onChange={(e) => setPwd(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") handleAccess(); }}
                autoFocus
              />
              <Button size="sm" variant="ghost" onClick={handleAccess}>Avaa</Button>
            </div>
          )}
          {error && (
            <div className="text-destructive text-[10px]">{error}</div>
          )}
        </div>
      </div>
    </footer>
  );
};