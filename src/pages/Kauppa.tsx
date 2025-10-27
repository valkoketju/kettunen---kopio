import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { AIAssistant } from "@/components/AIAssistant";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { ShoppingCart } from "lucide-react";

const Kauppa = () => {
  const { data: products, isLoading } = useQuery({
    queryKey: ["shop-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("is_available", true)
        .order("created_at", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  const filterByCategory = (category: string) => {
    if (!products) return [];
    if (category === "kaikki") return products;
    return products.filter((p) => p.category === category);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Navigation />
      <AIAssistant />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-12" data-aos="zoom-in">
          <h1 className="text-5xl font-bold mb-4" data-aos="zoom-in">Kauppa</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto" data-aos="zoom-in">
            Osta uniikkeja taideteoksia ja varaa tatuointiaikoja
          </p>
        </div>

        <Tabs defaultValue="kaikki" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 mb-8">
            <TabsTrigger value="kaikki">Kaikki</TabsTrigger>
            <TabsTrigger value="taideteokset">Taideteokset</TabsTrigger>
            <TabsTrigger value="tatuoinnit">Tatuoinnit</TabsTrigger>
          </TabsList>

          <TabsContent value="kaikki">
            <ProductGrid products={filterByCategory("kaikki")} isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="taideteokset">
            <ProductGrid products={filterByCategory("taideteokset")} isLoading={isLoading} />
          </TabsContent>
          
          <TabsContent value="tatuoinnit">
            <ProductGrid products={filterByCategory("tatuoinnit")} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

const ProductGrid = ({ products, isLoading }: { products: any[]; isLoading: boolean }) => {
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
        <p className="text-muted-foreground">Ei tuotteita tässä kategoriassa.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <Card key={product.id} data-aos="zoom-in" className="overflow-hidden hover:shadow-[var(--shadow-medium)] transition-shadow">
          {product.image_url && (
            <img
              src={product.image_url}
              alt={product.title}
              className="w-full h-64 object-cover"
            />
          )}
          <div className="p-6" data-aos="zoom-in">
            <div className="flex items-start justify-between mb-2" data-aos="zoom-in">
              <h3 className="text-xl font-semibold" data-aos="zoom-in">{product.title}</h3>
              <Badge variant="secondary" data-aos="zoom-in">{product.price.toFixed(2)} €</Badge>
            </div>
            {product.description && (
              <p className="text-muted-foreground mb-4 line-clamp-2" data-aos="zoom-in">{product.description}</p>
            )}
            <Button 
              className="w-full" 
              variant="default"
              onClick={() => window.location.href = '/yhteystiedot'}
              data-aos="zoom-in"
            >
              <ShoppingCart className="mr-2" size={18} />
              Ota yhteyttä
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default Kauppa;