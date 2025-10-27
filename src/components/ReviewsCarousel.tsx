import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card3D } from "./ui/card-3d";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export const ReviewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useLanguage();

  const { data: reviews } = useQuery({
    queryKey: ["reviews-approved"],
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

  if (!reviews || reviews.length === 0) return null;

  const itemsPerPage = 2;
  const totalPages = Math.ceil(reviews.length / itemsPerPage);
  const displayedReviews = reviews.slice(
    currentIndex * itemsPerPage,
    (currentIndex + 1) * itemsPerPage
  );

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className="py-20 bg-gradient-to-b from-transparent via-muted/20 to-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
          {t("reviews.title")}
        </h2>
        <p className="text-center text-muted-foreground mb-12 text-lg">{t("reviews.subtitle")}</p>
        
        <div className="relative max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {displayedReviews.map((review, index) => (
              <Card3D
                key={review.id}
                data-aos="zoom-in"
                className="group animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="p-8 space-y-4">
                  {review.image_url && (
                    <img 
                      src={review.image_url} 
                      alt="Arvostelu" 
                      className="w-full h-48 object-cover rounded mb-4" 
                    />
                  )}
                  <div className="flex items-center gap-1.5 mb-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        size={24}
                        className={
                          i < review.rating
                            ? "fill-primary text-primary drop-shadow-lg"
                            : "text-muted-foreground/30"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg italic">
                    "{review.content}"
                  </p>
                  <p className="font-bold text-lg bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    — {review.author_name}
                  </p>
                </div>
              </Card3D>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-6">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="rounded-full w-12 h-12 hover:scale-110 transition-transform shadow-lg hover:shadow-xl"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex gap-3">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? "bg-primary w-12 shadow-lg"
                        : "bg-muted-foreground/30 w-3 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="rounded-full w-12 h-12 hover:scale-110 transition-transform shadow-lg hover:shadow-xl"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};