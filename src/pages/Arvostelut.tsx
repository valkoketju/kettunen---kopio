import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { Card } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Arvostelut = () => {
  const { data: reviews, isLoading } = useQuery({
    queryKey: ["all-reviews"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*")
        .eq("is_approved", true)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const averageRating = reviews?.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : "0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Navigation />
      <AIAssistant />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 animate-fade-in" data-aos="zoom-in">
          <h1 className="text-5xl font-bold mb-4" data-aos="zoom-in">Asiakkaiden arvostelut</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-aos="zoom-in">
            Katso mitä asiakkaamme sanovat töistämme
          </p>
          
           {reviews && reviews.length > 0 && (
            <Card data-aos="zoom-in" className="inline-block px-8 py-4 mt-6">
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 fill-primary text-primary" />
                <span className="text-3xl font-bold">{averageRating}</span>
                <span className="text-muted-foreground">/ 5</span>
                <span className="text-sm text-muted-foreground ml-2">
                  ({reviews.length} {reviews.length === 1 ? "arvostelu" : "arvostelua"})
                </span>
              </div>
            </Card>
          )}
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Ladataan...</p>
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <Card 
                key={review.id}
                data-aos="zoom-in"
                className="p-6 hover:shadow-[var(--shadow-medium)] transition-all duration-300 hover:-translate-y-1 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {review.image_url && (
                  <img 
                    src={review.image_url} 
                    alt="Arvostelu" 
                    className="w-full h-48 object-cover rounded mb-4" 
                    data-aos="zoom-in"
                  />
                )}
                <div className="flex gap-1 mb-3" data-aos="zoom-in">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                  ))}
                  {[...Array(5 - review.rating)].map((_, i) => (
                    <Star key={i + review.rating} className="w-5 h-5 text-muted-foreground" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4 italic" data-aos="zoom-in">"{review.content}"</p>
                <p className="font-semibold text-primary" data-aos="zoom-in">- {review.author_name}</p>
                <p className="text-xs text-muted-foreground mt-2" data-aos="zoom-in">
                  {new Date(review.created_at).toLocaleDateString('fi-FI')}
                </p>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Ei vielä arvosteluja.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Arvostelut;