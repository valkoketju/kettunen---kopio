import { createContext, useContext, useState, ReactNode, useEffect } from "react";

type Language = "fi" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<Language, Record<string, string>> = {
  fi: {
    // Navigation
    "nav.portfolio": "Portfolio",
    "nav.shop": "Kauppa",
    "nav.reviews": "Arvostelut",
    "nav.tattoos": "Tatuoinnit",
    "nav.about": "Tietoa meistä",
    "nav.contact": "Yhteystiedot",
    
    // Home page
    "home.hero.title": "Taide & Tatuoinnit",
    "home.hero.subtitle": "Luonnon inspiroima taide ja tatuoinnit",
    "home.hero.cta": "Tutustu teoksiin",
    "home.art.title": "Taideteokset",
    "home.art.description": "Ainutlaatuisia taideteoksia luonnosta inspiroituneena",
    "home.art.link": "Katso teokset",
    "home.tattoo.title": "Tatuoinnit",
    "home.tattoo.description": "Henkilökohtaiset tatuoinnit jotka kertovat tarinasi",
    "home.tattoo.link": "Tutustu palveluun",
    "home.shop.title": "Verkkokauppa",
    "home.shop.description": "Osta taidetta suoraan verkkokaupastamme",
    "home.shop.link": "Siirry kauppaan",
    
    // Portfolio
    "portfolio.title": "Portfolio",
    "portfolio.subtitle": "Tutustu ainutlaatuisiin teoksiimme",
    "portfolio.all": "Kaikki",
    "portfolio.empty": "Ei teoksia saatavilla.",
    
    // Shop
    "shop.title": "Verkkokauppa",
    "shop.subtitle": "Osta taidetta suoraan verkkokaupastamme",
    "shop.all": "Kaikki",
    "shop.empty": "Ei tuotteita saatavilla.",
    "shop.contact": "Ota yhteyttä",
    
    // Reviews
    "reviews.title": "Arvostelut",
    "reviews.subtitle": "Mitä asiakkaamme sanovat",
    "reviews.average": "Keskiarvo",
    "reviews.total": "arvostelua",
    "reviews.empty": "Ei arvosteluja vielä.",
    
    // About
    "about.title": "Tietoa meistä",
    "about.subtitle": "Luovuutta ja ammattitaitoa",
    "about.mission.title": "Missiomme",
    "about.mission.text": "Luomme ainutlaatuista taidetta ja tatuointeja, jotka kertovat sinun tarinasi. Jokainen teos on huolellisesti käsityönä valmistettu ja inspiroitunut luonnon kauneudesta.",
    "about.story.title": "Tarinaamme",
    "about.story.text": "Taidestudiomme on syntynyt intohimosta luontoa ja taidetta kohtaan. Olemme erikoistuneet luontoaiheisiin teoksiin ja tatuointeihin, jotka tuovat esiin jokaisen asiakkaan henkilökohtaisen tarinan.",
    "about.team.title": "Tiimimme",
    "about.team.artist": "Päätatuoija & Taiteilija",
    "about.team.artist.bio": "Yli 10 vuoden kokemus tatuoinneista ja taiteesta. Erikoistunut luontoaiheisiin ja yksityiskohtaisiin töihin.",
    "about.team.designer": "Graafinen Suunnittelija",
    "about.team.designer.bio": "Luo ainutlaatuisia designeja ja auttaa asiakkaita löytämään täydellisen tyylin.",
    
    // Contact
    "contact.title": "Yhteystiedot",
    "contact.subtitle": "Ota yhteyttä - vastaamme mielellämme!",
    "contact.form.title": "Lähetä viesti",
    "contact.form.name": "Nimi",
    "contact.form.email": "Sähköposti",
    "contact.form.message": "Viesti",
    "contact.form.send": "Lähetä viesti",
    "contact.form.success": "Viesti lähetetty!",
    "contact.form.success.desc": "Vastaamme sinulle mahdollisimman pian.",
    "contact.form.error": "Virhe",
    "contact.form.error.desc": "Viestin lähetys epäonnistui. Yritä uudelleen.",
    "contact.info.title": "Yhteystiedot",
    "contact.info.email": "Sähköposti",
    "contact.info.phone": "Puhelin",
    "contact.info.address": "Osoite",
    
    // AI Assistant
    "ai.title": "AI-Assistentti",
    "ai.subtitle": "Aina valmiina auttamaan",
    "ai.placeholder": "Kirjoita viestisi...",
    "ai.welcome": "Kysy mitä tahansa teoksista, tatuoinneista tai palveluistamme!",
    "ai.error.rate": "Liikaa pyyntöjä",
    "ai.error.rate.desc": "Yritä hetken kuluttua uudelleen.",
    "ai.error.payment": "Virhe",
    "ai.error.payment.desc": "Palvelu ei ole käytettävissä. Ota yhteyttä ylläpitoon.",
    "ai.error.connection": "Virhe",
    "ai.error.connection.desc": "Yhteysvirhe. Yritä uudelleen.",
    
    // Cookie Consent
    "cookie.title": "Käyttöehdot",
    "cookie.description": "Käytämme evästeitä parantaaksemme käyttökokemustasi. Jatkamalla sivuston käyttöä hyväksyt käyttöehtomme.",
    "cookie.accept": "Hyväksy",
    "cookie.decline": "Hylkää",
    
    // Footer
    "footer.rights": "Kaikki oikeudet pidätetään.",
  },
  en: {
    // Navigation
    "nav.portfolio": "Portfolio",
    "nav.shop": "Shop",
    "nav.reviews": "Reviews",
    "nav.tattoos": "Tattoos",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    
    // Home page
    "home.hero.title": "Art & Tattoos",
    "home.hero.subtitle": "Nature-inspired art and tattoos",
    "home.hero.cta": "Explore Works",
    "home.art.title": "Artworks",
    "home.art.description": "Unique artworks inspired by nature",
    "home.art.link": "View Works",
    "home.tattoo.title": "Tattoos",
    "home.tattoo.description": "Personal tattoos that tell your story",
    "home.tattoo.link": "Learn More",
    "home.shop.title": "Online Shop",
    "home.shop.description": "Buy art directly from our online shop",
    "home.shop.link": "Go to Shop",
    
    // Portfolio
    "portfolio.title": "Portfolio",
    "portfolio.subtitle": "Explore our unique works",
    "portfolio.all": "All",
    "portfolio.empty": "No works available.",
    
    // Shop
    "shop.title": "Online Shop",
    "shop.subtitle": "Buy art directly from our online shop",
    "shop.all": "All",
    "shop.empty": "No products available.",
    "shop.contact": "Contact Us",
    
    // Reviews
    "reviews.title": "Reviews",
    "reviews.subtitle": "What our customers say",
    "reviews.average": "Average",
    "reviews.total": "reviews",
    "reviews.empty": "No reviews yet.",
    
    // About
    "about.title": "About Us",
    "about.subtitle": "Creativity and expertise",
    "about.mission.title": "Our Mission",
    "about.mission.text": "We create unique art and tattoos that tell your story. Each piece is carefully handcrafted and inspired by the beauty of nature.",
    "about.story.title": "Our Story",
    "about.story.text": "Our art studio was born from a passion for nature and art. We specialize in nature-themed works and tattoos that bring out each client's personal story.",
    "about.team.title": "Our Team",
    "about.team.artist": "Lead Tattoo Artist & Artist",
    "about.team.artist.bio": "Over 10 years of experience in tattoos and art. Specialized in nature themes and detailed work.",
    "about.team.designer": "Graphic Designer",
    "about.team.designer.bio": "Creates unique designs and helps clients find the perfect style.",
    
    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Get in touch - we're happy to help!",
    "contact.form.title": "Send Message",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.send": "Send Message",
    "contact.form.success": "Message sent!",
    "contact.form.success.desc": "We'll get back to you as soon as possible.",
    "contact.form.error": "Error",
    "contact.form.error.desc": "Failed to send message. Please try again.",
    "contact.info.title": "Contact Information",
    "contact.info.email": "Email",
    "contact.info.phone": "Phone",
    "contact.info.address": "Address",
    
    // AI Assistant
    "ai.title": "AI Assistant",
    "ai.subtitle": "Always ready to help",
    "ai.placeholder": "Type your message...",
    "ai.welcome": "Ask anything about our works, tattoos or services!",
    "ai.error.rate": "Too many requests",
    "ai.error.rate.desc": "Please try again later.",
    "ai.error.payment": "Error",
    "ai.error.payment.desc": "Service unavailable. Please contact support.",
    "ai.error.connection": "Error",
    "ai.error.connection.desc": "Connection error. Please try again.",
    
    // Cookie Consent
    "cookie.title": "Terms of Use",
    "cookie.description": "We use cookies to improve your experience. By continuing to use this site, you accept our terms of use.",
    "cookie.accept": "Accept",
    "cookie.decline": "Decline",
    
    // Footer
    "footer.rights": "All rights reserved.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved === "en" || saved === "fi") ? saved : "fi";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
