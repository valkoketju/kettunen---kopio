import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Portfolio from "./pages/Portfolio";
import Kauppa from "./pages/Kauppa";
import Yhteystiedot from "./pages/Yhteystiedot";
import Admin from "./pages/Admin";
import Arvostelut from "./pages/Arvostelut";
import TietoaMeista from "./pages/TietoaMeista";
import Tatuoinnit from "./pages/Tatuoinnit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/kauppa" element={<Kauppa />} />
              <Route path="/arvostelut" element={<Arvostelut />} />
              <Route path="/tatuoinnit" element={<Tatuoinnit />} />
              <Route path="/tietoa-meista" element={<TietoaMeista />} />
              <Route path="/yhteystiedot" element={<Yhteystiedot />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
