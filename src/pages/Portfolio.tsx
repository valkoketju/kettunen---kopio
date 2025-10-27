import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const Portfolio = () => {
  const { data: portfolioItems, isLoading } = useQuery({
    queryKey: ["portfolio-items"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("portfolio_items")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const getCategoryLabel = (category: string) => {
    const labels: Record<string, string> = {
      taideteokset: "Taideteokset",
      tatuoinnit: "Tatuoinnit",
      muu: "Muu",
    };
    return labels[category] || category;
  };

  const filterByCategory = (category: string) => {
    if (!portfolioItems) return [];
    if (category === "kaikki") return portfolioItems;
    return portfolioItems.filter((p) => p.category === category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Navigation />
      <AIAssistant />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12 animate-fade-in" data-aos="zoom-in">
          <h1 className="text-5xl font-bold mb-4" data-aos="zoom-in">Portfolio</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-aos="zoom-in">
            Tutustu laajaan kokoelmaamme taideteoksia ja tatuointisuunnitelmia
          </p>
        </div>

        <Tabs defaultValue="kaikki" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="kaikki">Kaikki</TabsTrigger>
            <TabsTrigger value="taideteokset">Taideteokset</TabsTrigger>
            <TabsTrigger value="tatuoinnit">Tatuoinnit</TabsTrigger>
          </TabsList>

          <TabsContent value="kaikki">
            <ProductGrid products={filterByCategory("kaikki")} isLoading={isLoading} getCategoryLabel={getCategoryLabel} />
          </TabsContent>
          
          <TabsContent value="taideteokset">
            <ProductGrid products={filterByCategory("taideteokset")} isLoading={isLoading} getCategoryLabel={getCategoryLabel} />
          </TabsContent>
          
          <TabsContent value="tatuoinnit">
            <ProductGrid products={filterByCategory("tatuoinnit")} isLoading={isLoading} getCategoryLabel={getCategoryLabel} />
          </TabsContent>
        </Tabs>

      </main>

      <Footer />
    </div>
  );
};

const ProductGrid = ({ products, isLoading, getCategoryLabel }: { products: any[]; isLoading: boolean; getCategoryLabel: (cat: string) => string }) => {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Ladataan...</p>
      </div>
    );
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Ei kohteita tässä kategoriassa.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((item, index) => (
        <Card 
          key={item.id}
          data-aos="zoom-in"
          className="overflow-hidden hover:shadow-[var(--shadow-medium)] transition-all duration-300 hover:-translate-y-1 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {item.image_url && (
            <img
              src={item.image_url}
              alt={item.title}
              className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
            />
          )}
          <div className="p-6" data-aos="zoom-in">
            <div className="flex items-start justify-between mb-2" data-aos="zoom-in">
              <h3 className="text-xl font-semibold" data-aos="zoom-in">{item.title}</h3>
              <Badge variant="secondary" data-aos="zoom-in">
                {getCategoryLabel(item.category)}
              </Badge>
            </div>
            {item.description && (
              <p className="text-muted-foreground" data-aos="zoom-in">{item.description}</p>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Portfolio;