import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MessageSquare, CheckCircle, Palette, Droplet, Moon, XCircle, Sparkles, Shirt, Droplets, Phone } from "lucide-react";

const Tatuoinnit = () => {
  const scrollToProcess = () => {
    document.getElementById("process")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Navigation />
      <AIAssistant />

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background z-0" />
        <div className="container mx-auto px-4 pt-32 pb-16 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in" data-aos="zoom-in">
            Tatuoinnit – taidetta, joka kulkee mukanasi
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }} data-aos="zoom-in">
            Jokainen tatuointi suunnitellaan yksilöllisesti asiakkaan toiveiden ja luonnon inspiroimana.
          </p>
          <Button 
            onClick={scrollToProcess}
            size="lg"
            className="animate-fade-in"
            style={{ animationDelay: "0.2s" }}
          >
            Lue lisää prosessista
          </Button>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12 space-y-24">
        {/* Process Section */}
        <section id="process" className="scroll-mt-24">
          <div className="text-center mb-12" data-aos="zoom-in">
            <h2 className="text-4xl font-bold mb-4" data-aos="zoom-in">Näin tatuointisi syntyy vaihe vaiheelta</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-aos="zoom-in">
              Tatuointi on yhteistyötä asiakkaan ja taiteilijan välillä. Jokainen vaihe tehdään huolellisesti, 
              jotta lopputulos on turvallinen, kestävä ja kaunis.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <Card 
                key={index}
                className="p-6 hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mb-4 text-primary" data-aos="zoom-in">{step.icon}</div>
                <h3 className="text-xl font-semibold mb-3" data-aos="zoom-in">{step.title}</h3>
                <ul className="space-y-2 text-muted-foreground" data-aos="zoom-in">
                  {step.points.map((point, i) => (
                    <li key={i} className="text-sm" data-aos="zoom-in">• {point}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </section>

        {/* Duration Section */}
        <section>
          <div className="text-center mb-12" data-aos="zoom-in">
            <h2 className="text-4xl font-bold mb-4" data-aos="zoom-in">Kuinka kauan tatuointi kestää</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-aos="zoom-in">
              Kesto riippuu tatuoinnin koosta, yksityiskohtaisuudesta ja sijainnista kehossa.
            </p>
          </div>

          <Card className="overflow-hidden max-w-4xl mx-auto" data-aos="zoom-in">
            <div className="overflow-x-auto" data-aos="zoom-in">
              <table className="w-full" data-aos="zoom-in">
                <thead className="bg-primary/10">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Tatuoinnin koko</th>
                    <th className="px-6 py-4 text-left font-semibold">Keskimääräinen aika</th>
                    <th className="px-6 py-4 text-left font-semibold">Esimerkki</th>
                  </tr>
                </thead>
                <tbody>
                  {durationData.map((row, index) => (
                    <tr key={index} className="border-t border-border/50">
                      <td className="px-6 py-4">{row.size}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.duration}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.example}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </section>

        {/* Pricing Section */}
        <section>
          <div className="text-center mb-12" data-aos="zoom-in">
            <h2 className="text-4xl font-bold mb-4" data-aos="zoom-in">Hinnasto</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto" data-aos="zoom-in">
              Hinta määräytyy koon, yksityiskohtien ja sijainnin mukaan. 
              Tarkka arvio annetaan aina suunnittelun yhteydessä.
            </p>
          </div>

          <Card className="overflow-hidden max-w-4xl mx-auto mb-6" data-aos="zoom-in">
            <div className="overflow-x-auto" data-aos="zoom-in">
              <table className="w-full" data-aos="zoom-in">
                <thead className="bg-primary/10">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Koko / Tyyppi</th>
                    <th className="px-6 py-4 text-left font-semibold">Hinta-arvio (€)</th>
                  </tr>
                </thead>
                <tbody>
                  {pricingData.map((row, index) => (
                    <tr key={index} className="border-t border-border/50">
                      <td className="px-6 py-4">{row.type}</td>
                      <td className="px-6 py-4 text-muted-foreground">{row.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <p className="text-center text-muted-foreground">
            <strong>Minimiveloitus:</strong> 80 € (sisältää tarvikkeet ja jälkihoito-ohjeet)
          </p>
        </section>

        {/* Before Tattoo Section */}
        <section>
          <Card className="p-8 md:p-12 bg-gradient-to-r from-primary/10 via-primary/5 to-background" data-aos="zoom-in">
            <h2 className="text-3xl font-bold mb-6 text-center" data-aos="zoom-in">Ennen tatuointia – tärkeää tietää</h2>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {beforeTattooTips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="text-primary mt-1">{tip.icon}</div>
                  <p className="text-muted-foreground">{tip.text}</p>
                </div>
              ))}
            </div>
          </Card>
        </section>

        {/* Aftercare Section */}
        <section>
          <div className="text-center mb-12" data-aos="zoom-in">
            <h2 className="text-4xl font-bold mb-4" data-aos="zoom-in">Jälkihoito</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {aftercareTips.map((tip, index) => (
              <Card 
                key={index}
                className="p-6 text-center hover:shadow-[var(--shadow-glow)] transition-all duration-300"
              >
                <div className="flex justify-center mb-3 text-primary">{tip.icon}</div>
                <p className="text-sm text-muted-foreground">{tip.text}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section>
          <Card className="p-8 md:p-12 text-center bg-gradient-to-r from-primary/10 via-primary/5 to-background" data-aos="zoom-in">
            <h2 className="text-3xl md:text-4xl font-bold mb-4" data-aos="zoom-in">
              Haluatko oman uniikin tatuoinnin?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8" data-aos="zoom-in">
              Ota yhteyttä ja varaa aika suunnitteluun – yhdessä luomme teoksen, joka on juuri sinulle.
            </p>
            <Link to="/yhteystiedot">
              <Button size="lg">
                Ota yhteyttä
              </Button>
            </Link>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

const processSteps = [
  {
    icon: <MessageSquare size={40} />,
    title: "Keskustelu ja suunnittelu",
    points: [
      "Käydään läpi toiveet, tyyli, koko ja sijainti",
      "Taiteilija tekee luonnoksen tai useita ehdotuksia",
      "Tämä vaihe kestää yleensä 30–60 minuuttia"
    ]
  },
  {
    icon: <CheckCircle size={40} />,
    title: "Luonnoksen hyväksyntä",
    points: [
      "Asiakas saa nähdä luonnoksen ennen tatuointia",
      "Pienet muutokset voidaan tehdä paikan päällä",
      "Hyväksynnän jälkeen sovitaan tatuointiaika"
    ]
  },
  {
    icon: <Palette size={40} />,
    title: "Tatuointipäivä",
    points: [
      "Pienet tatuoinnit: 30 min – 1 h",
      "Keskikokoiset: 1–3 h",
      "Suuret teokset: useampi käynti",
      "Käytämme vain laadukkaita ja turvallisia välineitä"
    ]
  },
  {
    icon: <Droplet size={40} />,
    title: "Jälkihoito ja ohjeet",
    points: [
      "Saat kirjalliset hoito-ohjeet",
      "Parantumisaika on yleensä 1–3 viikkoa",
      "Suosittelemme välttämään uimista ja aurinkoa"
    ]
  }
];

const durationData = [
  { size: "Pieni (1–5 cm)", duration: "30 min – 1 h", example: "pieni symboli, nimi" },
  { size: "Keskikokoinen (5–15 cm)", duration: "1–3 h", example: "kukka, eläin, yksityiskohtainen kuvio" },
  { size: "Suuri (käsivarsi / selkä)", duration: "4–8 h+", example: "vaativa taideteos, varjostukset" }
];

const pricingData = [
  { type: "Pieni (symboli / teksti)", price: "alkaen 80 €" },
  { type: "Keskikokoinen (yksityiskohtainen kuva)", price: "150–300 €" },
  { type: "Suuri (useampi tunti / sessio)", price: "400 €+" },
  { type: "Korjaus / Peitetatuointi", price: "sovitaan tapauskohtaisesti" }
];

const beforeTattooTips = [
  { icon: <Moon size={24} />, text: "Tule hyvin levänneenä ja syöneenä" },
  { icon: <XCircle size={24} />, text: "Älä käytä alkoholia tai verenohennuslääkkeitä ennen tatuointia" },
  { icon: <Sparkles size={24} />, text: "Ihoalueen tulee olla terve (ei haavoja tai ihottumaa)" },
  { icon: <Shirt size={24} />, text: "Suosittelemme ottamaan mukaan mukavat vaatteet ja juotavaa" }
];

const aftercareTips = [
  { icon: <Droplets size={40} />, text: "Pidä tatuointi puhtaana ja kosteutettuna" },
  { icon: <Droplet size={40} />, text: "Käytä hajusteettomia tuotteita ja vältä hankausta" },
  { icon: <XCircle size={40} />, text: "Älä raavi tai irrota rupea" },
  { icon: <Phone size={40} />, text: "Jos tatuointi punoittaa pitkään, ota yhteyttä taiteilijaan" }
];

export default Tatuoinnit;
