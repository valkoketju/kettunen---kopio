import { Link, useLocation } from "react-router-dom";
import { Menu, X, Briefcase, ShoppingBag, Star, Sparkles, Users, Mail } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";

export const Navigation = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();

  const links = [
    { to: "/portfolio", label: t("nav.portfolio"), icon: Briefcase },
    { to: "/kauppa", label: t("nav.shop"), icon: ShoppingBag },
    { to: "/arvostelut", label: t("nav.reviews"), icon: Star },
    { to: "/tatuoinnit", label: t("nav.tattoos"), icon: Sparkles },
    { to: "/tietoa-meista", label: t("nav.about"), icon: Users },
    { to: "/yhteystiedot", label: t("nav.contact"), icon: Mail },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-7xl">
      <div className="bg-card/90 backdrop-blur-xl border border-border/30 rounded-full shadow-[var(--shadow-soft)] transition-all duration-300 hover:shadow-[var(--shadow-medium)]">
        <div className="flex items-center justify-between px-6 h-14">
          <Link 
            to="/" 
            className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent hover:scale-105 transition-transform"
          >
            Taide & Tatuoinnit
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center gap-2 px-4 py-2 text-base font-semibold rounded-full transition-all duration-300 ${
                    isActive(link.to) 
                      ? "bg-primary/10 text-primary shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  }`}
                >
                  <Icon size={18} />
                  {link.label}
                </Link>
              );
            })}
            <ThemeToggle />
            <LanguageSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-muted/50 rounded-full transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4 pt-2 border-t border-border/30 animate-fade-in">
            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center gap-2 px-4 py-2 text-base font-semibold rounded-full transition-all ${
                      isActive(link.to) 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    <Icon size={18} />
                    {link.label}
                  </Link>
                );
              })}
              <div className="flex items-center gap-2 px-2 py-1 border-t border-border/30 mt-2 pt-3">
                <ThemeToggle />
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};