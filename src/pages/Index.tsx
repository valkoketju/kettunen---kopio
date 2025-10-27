import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { CookieConsent } from "@/components/CookieConsent";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Card3D } from "@/components/ui/card-3d";
import { Badge } from "@/components/ui/badge";
import { AnimatedButton } from "@/components/ui/animated-button";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { Star, Palette, Heart, ShoppingBag, Shield, Sparkles, Users, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";


const Index = () => {
  const { t } = useLanguage();

  const { data: publishedNews } = useQuery({
    queryKey: ["published-news"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("news")
        .select("*")
        .eq("is_published", true)
        .order("created_at", { ascending: false })
        .limit(3);
      
      if (error) throw error;
      return data;
    },
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <AIAssistant />
      <CookieConsent />
      <ScrollToTop />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 bg-gradient-to-b from-background via-background/95 to-background">

        <div className="relative z-10 container mx-auto px-4 text-center" data-aos="zoom-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent drop-shadow-2xl" data-aos="zoom-in">
            {t("home.hero.title")}
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 mb-8 max-w-2xl mx-auto animate-fade-in drop-shadow-lg backdrop-blur-sm" style={{ animationDelay: "0.1s" }} data-aos="zoom-in">
            {t("home.hero.subtitle")}
          </p>
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <AnimatedButton 
              to="/portfolio" 
              topText="TUTUSTU" 
              bottomText="TEOKSIIN"
            />
          </div>
        </div>
      </section>

      {/* Navigation Cards Section */}
      <section className="py-20 container mx-auto px-4 bg-background">
        <div className="text-center mb-12 animate-fade-in" data-aos="zoom-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" data-aos="zoom-in">Tutustu palveluihimme</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-aos="zoom-in">
            Selaa portfoliotamme, tutustu tuotteisiimme tai lue asiakkaiden kokemuksia
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Link to="/portfolio" className="block">
            <Card3D data-aos="zoom-in" className="group animate-fade-in cursor-pointer h-full" style={{ animationDelay: "0.1s" }}>
              <div className="p-8 space-y-4 flex flex-col h-full" data-aos="zoom-in">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4" data-aos="zoom-in">
                  <Palette className="text-primary" size={28} />
                </div>
                <h3 className="text-2xl font-bold" data-aos="zoom-in">Portfolio</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow" data-aos="zoom-in">
                  Katso työskentelyn tuloksia ja inspiroidu aiemmista projekteistamme
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold mt-4 group-hover:gap-3 transition-all">
                  Lisätietoja <ArrowRight size={20} />
                </div>
              </div>
            </Card3D>
          </Link>

          <Link to="/kauppa" className="block">
            <Card3D data-aos="zoom-in" className="group animate-fade-in cursor-pointer h-full" style={{ animationDelay: "0.2s" }}>
              <div className="p-8 space-y-4 flex flex-col h-full" data-aos="zoom-in">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4" data-aos="zoom-in">
                  <ShoppingBag className="text-primary" size={28} />
                </div>
                <h3 className="text-2xl font-bold" data-aos="zoom-in">Kauppa</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow" data-aos="zoom-in">
                  Tutustu tuotevalikoimaamme ja tilaa haluamasi tuotteet kätevästi verkosta
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold mt-4 group-hover:gap-3 transition-all">
                  Lisätietoja <ArrowRight size={20} />
                </div>
              </div>
            </Card3D>
          </Link>

          <Link to="/arvostelut" className="block">
            <Card3D data-aos="zoom-in" className="group animate-fade-in cursor-pointer h-full" style={{ animationDelay: "0.3s" }}>
              <div className="p-8 space-y-4 flex flex-col h-full" data-aos="zoom-in">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4" data-aos="zoom-in">
                  <Star className="text-primary" size={28} />
                </div>
                <h3 className="text-2xl font-bold" data-aos="zoom-in">Arvostelut</h3>
                <p className="text-muted-foreground leading-relaxed flex-grow" data-aos="zoom-in">
                  Lue mitä asiakkaamme sanovat meistä ja palveluistamme
                </p>
                <div className="flex items-center gap-2 text-primary font-semibold mt-4 group-hover:gap-3 transition-all">
                  Lisätietoja <ArrowRight size={20} />
                </div>
              </div>
            </Card3D>
          </Link>
        </div>
      </section>

      {/* Tattoo Services Section */}
      <section className="py-20 container mx-auto px-4 bg-background">
        <div className="text-center mb-12 animate-fade-in" data-aos="zoom-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6" data-aos="zoom-in">Tutustu tatuointipalveluihimme</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed" data-aos="zoom-in">
            Tarjoamme yksilöllisiä, luonnon inspiroiman tatuointeja. Jokainen tatuointi on ainutlaatuinen taideteos, 
            jossa yhdistyvät taiteellinen näkemys, ammattitaito ja sinun tarinasi.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card3D data-aos="zoom-in" className="group animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="p-8 space-y-4" data-aos="zoom-in">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4" data-aos="zoom-in">
                <Sparkles className="text-primary" size={28} />
              </div>
              <h3 className="text-2xl font-bold" data-aos="zoom-in">Yksilöllinen suunnittelu</h3>
              <p className="text-muted-foreground leading-relaxed" data-aos="zoom-in">
                Suunnittelemme jokaisen tatuoinnin yhdessä kanssasi – tarinasi, toiveesi ja tyylisi mukaan.
              </p>
            </div>
          </Card3D>

          <Card3D data-aos="zoom-in" className="group animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="p-8 space-y-4" data-aos="zoom-in">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4" data-aos="zoom-in">
                <Shield className="text-primary" size={28} />
              </div>
              <h3 className="text-2xl font-bold" data-aos="zoom-in">Turvallisuus edellä</h3>
              <p className="text-muted-foreground leading-relaxed" data-aos="zoom-in">
                Käytämme vain laadukkaita välineitä ja noudatamme tiukkoja hygieniastandardeja.
              </p>
            </div>
          </Card3D>

          <Card3D data-aos="zoom-in" className="group animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <div className="p-8 space-y-4" data-aos="zoom-in">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4" data-aos="zoom-in">
                <Palette className="text-primary" size={28} />
              </div>
              <h3 className="text-2xl font-bold" data-aos="zoom-in">Taiteellinen visio</h3>
              <p className="text-muted-foreground leading-relaxed" data-aos="zoom-in">
                Luonnon inspiroimaa taidetta – jokainen viiva ja sävy harkittu ja toteutettu huolella.
              </p>
            </div>
          </Card3D>
        </div>

      </section>

      {/* Reviews Section */}
      <section className="py-20 bg-background animate-fade-in" style={{ animationDelay: "0.5s" }}>
        <ReviewsCarousel />
      </section>

      {/* News Section */}
      {publishedNews && publishedNews.length > 0 && (
        <section className="py-20 container mx-auto px-4 bg-background">
          <div className="text-center mb-12" data-aos="zoom-in">
            <h2 className="text-4xl font-bold mb-4 animate-fade-in" data-aos="zoom-in">Ajankohtaista</h2>
            <p className="text-lg text-muted-foreground animate-fade-in" style={{ animationDelay: "0.1s" }} data-aos="zoom-in">
              Tuoreimmat kuulumiset ja uutiset
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {publishedNews.map((newsItem: any, index: number) => (
              <Card3D 
                key={newsItem.id}
                data-aos="zoom-in"
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-8 space-y-4 min-h-[280px] flex flex-col" data-aos="zoom-in">
                  <Badge className="mb-2 w-fit" data-aos="zoom-in">Uutinen</Badge>
                  <h3 className="text-2xl font-bold" data-aos="zoom-in">{newsItem.title}</h3>
                  <p className="text-muted-foreground leading-relaxed flex-grow" data-aos="zoom-in">{newsItem.content}</p>
                  <p className="text-sm text-muted-foreground mt-auto" data-aos="zoom-in">
                    {new Date(newsItem.created_at).toLocaleDateString("fi-FI")}
                  </p>
                </div>
              </Card3D>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default Index;