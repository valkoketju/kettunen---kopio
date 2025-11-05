import React, { createContext, useContext, useState, ReactNode } from "react";

type LanguageContextType = {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

type LanguageProviderProps = {
  children: ReactNode;
};

const translations = {
  fi: {
    // Navigation
    "nav.portfolio": "Portfolio",
    "nav.shop": "Kauppa",
    "nav.tattoos": "Maalaukset",
    "nav.reviews": "Arvostelut",
    "nav.art": "Taideteokset",
    "nav.about": "Tarina",
    "nav.contact": "Yhteystiedot",
    
    // Home page
    "home.hero.title": "Taide",
    "home.hero.subtitle": "Luonnosta inspiroitunutta taidetta",
    "home.hero.cta": "Tutustu teoksiin",
    "home.art.title": "Taideteokset",
    "home.art.description": "Tilaustyöt",
    "home.art.link": "Katso teokset",
    "home.tattoo.title": "Maalaukset",
    "home.tattoo.description": "Tilaustyönä toteutetut yksilölliset maalaukset - esimerkiksi lemmikistäsi",
    "home.tattoo.link": "Tilaa oma maalauksesi",
    "home.shop.title": "Verkkokauppa",
    "home.shop.description": "Vapaat teokset",
    "home.shop.link": "Siirry kauppaan",
    
    // Portfolio
    "portfolio.title": "Portfolio",
    "portfolio.subtitle": "Teokset",
    "portfolio.all": "Kaikki",
    "portfolio.empty": "Ei teoksia saatavilla.",
    
    // Shop
    "shop.title": "Verkkokauppa",
    "shop.subtitle": "Vapaat teokset",
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
    "about.story.text": "Eläin taidetta.",
    "about.team.title": "Tytti",
    "about.team.designer": "Graafinen Suunnittelija",

    
    // Contact
    "contact.title": "Yhteystiedot",
    "contact.subtitle": "Ota yhteyttä",
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
    "ai.error.retry": "Yritetään uudelleen",
    "ai.error.retry.desc": "Yritys {{count}}/{{max}}. Odota hetki...",
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
    "footer.rights": "Kaikki oikeudet pidätetään."
  },
  en: {
    // Navigation
    "nav.portfolio": "Portfolio",
    "nav.shop": "Shop",
    "nav.reviews": "Reviews",
    "nav.tattoos": "Paintings",
    "nav.about": "About Us",
    "nav.contact": "Contact",
    
    // Home page
    "home.hero.title": "Art & Tattoos",
    "home.hero.subtitle": "Nature-inspired art and tattoos",
    "home.hero.cta": "Explore Works",
    "home.art.title": "Artworks",
    "home.art.description": "Unique artworks inspired by nature",
    "home.art.link": "View Works",
    "home.tattoo.title": "Paintings",
    "home.tattoo.description": "Custom paintings made to order - for example of your beloved pet",
    "home.tattoo.link": "Order your own painting",
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
    "about.subtitle": "Creativity and professionalism",
    "about.mission.title": "Our Mission",
    "about.mission.text": "We create unique art and tattoos that tell your story. Each piece is carefully handcrafted and inspired by the beauty of nature.",
    "about.story.title": "Our Story",
    "about.story.text": "Our art studio was born from a passion for nature and art. We specialize in nature-themed works and tattoos that bring out each client's personal story.",
    "about.team.title": "Our Team",
    "about.team.artist": "Lead Tattoo Artist",
    "about.team.artist.bio": "Over 10 years of experience in tattoos and art. Specializes in nature themes and detailed work.",
    "about.team.designer": "Graphic Designer",
    "about.team.designer.bio": "Creates unique designs and helps clients find the perfect style.",
    
    // Contact
    "contact.title": "Contact",
    "contact.subtitle": "Get in touch - we'd love to hear from you!",
    "contact.form.title": "Send a Message",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.send": "Send Message",
    "contact.form.success": "Message Sent!",
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
    "ai.welcome": "Ask anything about our works, tattoos, or services!",
    "ai.error.rate": "Too Many Requests",
    "ai.error.rate.desc": "Please try again later.",
    "ai.error.retry": "Retrying",
    "ai.error.retry.desc": "Attempt {{count}}/{{max}}. Please wait...",
    "ai.error.payment": "Error",
    "ai.error.payment.desc": "Service unavailable. Please contact support.",
    "ai.error.connection": "Error",
    "ai.error.connection.desc": "Connection error. Please try again.",
    
    // Cookie Consent
    "cookie.title": "Terms of Use",
    "cookie.description": "We use cookies to improve your experience. By continuing to use the site, you accept our terms of use.",
    "cookie.accept": "Accept",
    "cookie.decline": "Decline",
    
    // Footer
    "footer.rights": "All rights reserved."
  }
};

export const LanguageProvider = ({ children }: LanguageProviderProps) => {
  const [language, setLanguage] = useState<string>(
    localStorage.getItem("language") || "fi"
  );

  const t = (key: string): string => {
    const lang = language as keyof typeof translations;
    if (!translations[lang] || !translations[lang][key as keyof typeof translations[typeof lang]]) {
      console.warn(`Missing translation: ${key} for language: ${lang}`);
      return key;
    }
    return translations[lang][key as keyof typeof translations[typeof lang]] || key;
  };

  React.useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};