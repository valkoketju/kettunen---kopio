import { Instagram } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { useLanguage } from "@/contexts/LanguageContext";

export const Footer = () => {
  const { t } = useLanguage();

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
      </div>
    </footer>
  );
};