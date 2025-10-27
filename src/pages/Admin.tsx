import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductsManager } from "@/components/admin/ProductsManager";
import { PortfolioManager } from "@/components/admin/PortfolioManager";
import { ReviewsManager } from "@/components/admin/ReviewsManager";
import { MessagesManager } from "@/components/admin/MessagesManager";
import { NewsManager } from "@/components/admin/NewsManager";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Admin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30">
      <Navigation />

      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-5xl font-bold mb-4">Dev-paneeli</h1>
          <p className="text-xl text-muted-foreground">
            Hallinnoi tuotteita, arvosteluja ja viestejä
          </p>
        </div>

        <Alert className="mb-8 border-primary/50 bg-primary/5">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            <strong>Huom:</strong> Tämä paneeli on nyt julkinen. Jos haluat suojata sen, kysy lisätietoja!
          </AlertDescription>
        </Alert>

        <Card className="p-6 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-8">
              <TabsTrigger value="products">Tuotteet</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="reviews">Arvostelut</TabsTrigger>
              <TabsTrigger value="messages">Viestit</TabsTrigger>
              <TabsTrigger value="news">Uutiset</TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              <ProductsManager />
            </TabsContent>

            <TabsContent value="portfolio">
              <PortfolioManager />
            </TabsContent>

            <TabsContent value="reviews">
              <ReviewsManager />
            </TabsContent>

            <TabsContent value="messages">
              <MessagesManager />
            </TabsContent>

            <TabsContent value="news">
              <NewsManager />
            </TabsContent>
          </Tabs>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;