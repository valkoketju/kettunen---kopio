import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { Card } from "@/components/ui/card";
import { Users, History, Phone, Mail } from "lucide-react";

const TietoaMeista = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Navigation />
      <AIAssistant />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 animate-fade-in" data-aos="zoom-in">
          <h1 className="text-5xl font-bold mb-4" data-aos="zoom-in">Tietoa meistä</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-aos="zoom-in">
            Intohimomme on taide ja tatuoinnit
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Firman tausta */}
          <Card data-aos="zoom-in" className="p-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-3 mb-6" data-aos="zoom-in">
              <History className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold" data-aos="zoom-in">Taustamme</h2>
            </div>
            <div className="space-y-4 text-muted-foreground" data-aos="zoom-in">
              <p data-aos="zoom-in">
                Olemme intohimoinen taiteilijoiden ja tatuoijien ryhmä, joka on
                sitoutunut luomaan ainutlaatuisia ja merkityksellisiä taideteoksia.
              </p>
              <p data-aos="zoom-in">
                Vuosien kokemus on opettanut meille, että jokainen teos on tarina,
                ja jokainen asiakas ansaitsee yksilöllistä huomiota ja huippulaatua.
              </p>
              <p data-aos="zoom-in">
                Työskentelemme jatkuvasti kehittääksemme taitojamme ja löytääksemme
                uusia tapoja ilmaista luovuutta.
              </p>
            </div>
          </Card>

          {/* Henkilökunta */}
          <Card data-aos="zoom-in" className="p-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="flex items-center gap-3 mb-6" data-aos="zoom-in">
              <Users className="w-8 h-8 text-primary" />
              <h2 className="text-3xl font-bold" data-aos="zoom-in">Tiimimme</h2>
            </div>
            <div className="space-y-6" data-aos="zoom-in">
              <div className="border-l-4 border-primary pl-4" data-aos="zoom-in">
                <h3 className="font-bold text-lg mb-1" data-aos="zoom-in">Päätatuoija</h3>
                <p className="text-muted-foreground" data-aos="zoom-in">
                  Erikoistunut realistisiin muotokuviin ja luonnonaiheisiin tatuointeihin.
                  Yli 10 vuoden kokemus alalta.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4" data-aos="zoom-in">
                <h3 className="font-bold text-lg mb-1" data-aos="zoom-in">Taidegraafikko</h3>
                <p className="text-muted-foreground" data-aos="zoom-in">
                  Luo upeita digitaalisia ja perinteisiä taideteoksia. Erikoisosaaminen
                  abstraktissa taiteessa.
                </p>
              </div>
              
              <div className="border-l-4 border-primary pl-4" data-aos="zoom-in">
                <h3 className="font-bold text-lg mb-1" data-aos="zoom-in">Piirustustaiteilija</h3>
                <p className="text-muted-foreground" data-aos="zoom-in">
                  Mestari lyijykynä- ja hiilipiirustuksissa. Intohimona yksityiskohtaiset
                  luonnokset ja konseptitaide.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Arvomme */}
        <Card data-aos="zoom-in" className="p-8 mt-8 max-w-6xl mx-auto animate-fade-in" style={{ animationDelay: "0.3s" }}>
          <h2 className="text-3xl font-bold mb-6 text-center" data-aos="zoom-in">Arvomme</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6" data-aos="zoom-in">
            <div className="text-center" data-aos="zoom-in">
              <h3 className="font-bold text-xl mb-2" data-aos="zoom-in">Laatu</h3>
              <p className="text-muted-foreground" data-aos="zoom-in">
                Jokainen työ tehdään korkeimmalla ammattitaidolla ja huomiolla yksityiskohtiin.
              </p>
            </div>
            <div className="text-center" data-aos="zoom-in">
              <h3 className="font-bold text-xl mb-2" data-aos="zoom-in">Luovuus</h3>
              <p className="text-muted-foreground" data-aos="zoom-in">
                Rohkaisemme innovatiivisia ratkaisuja ja ainutlaatuisia konsepteja.
              </p>
            </div>
            <div className="text-center" data-aos="zoom-in">
              <h3 className="font-bold text-xl mb-2" data-aos="zoom-in">Asiakaspalvelu</h3>
              <p className="text-muted-foreground" data-aos="zoom-in">
                Asiakkaamme tyytyväisyys on meille ensisijaista kaikessa tekemisessämme.
              </p>
            </div>
          </div>
        </Card>

      </main>

      <Footer />
    </div>
  );
};

export default TietoaMeista;