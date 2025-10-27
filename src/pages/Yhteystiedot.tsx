import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Star, Phone, Mail } from "lucide-react";
import { ImageUpload } from "@/components/ui/image-upload";

const Yhteystiedot = () => {
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  
  const [reviewForm, setReviewForm] = useState({
    authorName: "",
    content: "",
    rating: 5,
    imageUrl: "",
  });
  
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("contact_messages").insert([contactForm]);

      if (error) throw error;

      toast({
        title: "Viesti lähetetty!",
        description: "Otamme yhteyttä pian.",
      });

      setContactForm({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      toast({
        title: "Virhe",
        description: error.message || "Viestin lähettäminen epäonnistui.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from("reviews").insert([
        {
          author_name: reviewForm.authorName,
          content: reviewForm.content,
          rating: reviewForm.rating,
          image_url: reviewForm.imageUrl || null,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Arvostelu lähetetty!",
        description: "Kiitos palautteestasi! Arvostelusi julkaistaan hyväksynnän jälkeen.",
      });

      setReviewForm({ authorName: "", content: "", rating: 5, imageUrl: "" });
    } catch (error: any) {
      toast({
        title: "Virhe",
        description: error.message || "Arvostelun lähettäminen epäonnistui.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Navigation />
      <AIAssistant />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12" data-aos="zoom-in">
          <h1 className="text-5xl font-bold mb-4" data-aos="zoom-in">Ota yhteyttä</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-aos="zoom-in">
            Lähetä viesti tai jätä arvostelu
          </p>
        </div>

        {/* Yhteystiedot */}
        <Card data-aos="zoom-in" className="p-8 mb-8 max-w-6xl mx-auto bg-gradient-to-r from-primary/10 via-primary/5 to-background">
          <h2 className="text-3xl font-bold mb-6 text-center" data-aos="zoom-in">Yhteystiedot</h2>
          <p className="text-center text-muted-foreground mb-8 max-w-2xl mx-auto" data-aos="zoom-in">
            Haluatko keskustella projektiasi tai saada lisätietoja? Soita meille tai lähetä sähköpostia!
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <a href="tel:+358401234567" className="block">
              <Card className="p-6 hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Puhelin</h3>
                    <p className="text-muted-foreground">+358 40 123 4567</p>
                  </div>
                </div>
              </Card>
            </a>
            
            <a href="mailto:info@example.com" className="block">
              <Card className="p-6 hover:shadow-[var(--shadow-glow)] transition-all duration-300 hover:-translate-y-1 cursor-pointer">
                <div className="flex items-center gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">Sähköposti</h3>
                    <p className="text-muted-foreground">info@example.com</p>
                  </div>
                </div>
              </Card>
            </a>
          </div>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Contact Form */}
          <Card data-aos="zoom-in" className="p-8">
            <h2 className="text-2xl font-bold mb-6" data-aos="zoom-in">Lähetä viesti</h2>
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Nimi</Label>
                <Input
                  id="name"
                  type="text"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  required
                  placeholder="Matti Meikäläinen"
                />
              </div>

              <div>
                <Label htmlFor="email">Sähköposti</Label>
                <Input
                  id="email"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  required
                  placeholder="matti@example.com"
                />
              </div>

              <div>
                <Label htmlFor="subject">Aihe</Label>
                <Input
                  id="subject"
                  type="text"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  required
                  placeholder="Kysymys tuotteesta"
                />
              </div>

              <div>
                <Label htmlFor="message">Viesti</Label>
                <Textarea
                  id="message"
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  required
                  placeholder="Kirjoita viestisi tähän..."
                  rows={5}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Lähetetään..." : "Lähetä viesti"}
              </Button>
            </form>
          </Card>

          {/* Review Form */}
          <Card data-aos="zoom-in" className="p-8">
            <h2 className="text-2xl font-bold mb-6" data-aos="zoom-in">Jätä arvostelu</h2>
            <form onSubmit={handleReviewSubmit} className="space-y-4">
              <div>
                <Label htmlFor="authorName">Nimesi</Label>
                <Input
                  id="authorName"
                  type="text"
                  value={reviewForm.authorName}
                  onChange={(e) => setReviewForm({ ...reviewForm, authorName: e.target.value })}
                  required
                  placeholder="Matti Meikäläinen"
                />
              </div>

              <div>
                <Label>Arvosana</Label>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                      className="transition-colors"
                    >
                      <Star
                        size={32}
                        className={
                          star <= reviewForm.rating
                            ? "fill-primary text-primary"
                            : "text-muted-foreground"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <Label htmlFor="content">Arvostelusi</Label>
                <Textarea
                  id="content"
                  value={reviewForm.content}
                  onChange={(e) => setReviewForm({ ...reviewForm, content: e.target.value })}
                  required
                  placeholder="Kerro kokemuksestasi..."
                  rows={5}
                />
              </div>

              <div>
                <Label>Kuva (valinnainen)</Label>
                <ImageUpload
                  currentImage={reviewForm.imageUrl}
                  onImageUploaded={(url) => setReviewForm({ ...reviewForm, imageUrl: url })}
                />
              </div>

              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Lähetetään..." : "Lähetä arvostelu"}
              </Button>
              
              <p className="text-xs text-muted-foreground text-center">
                Arvostelusi julkaistaan ylläpidon hyväksynnän jälkeen.
              </p>
            </form>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Yhteystiedot;