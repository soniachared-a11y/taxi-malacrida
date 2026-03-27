import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MentionsLegales from "./pages/MentionsLegales";
import Merci from "./pages/Merci";
import NotFound from "./pages/NotFound";
import TaxiGardanne from "./pages/TaxiGardanne";
import TaxiAeroportMarignane from "./pages/TaxiAeroportMarignane";
import TaxiGareSaintCharles from "./pages/TaxiGareSaintCharles";
import TaxiGareTGVAix from "./pages/TaxiGareTGVAix";
import TaxiMeyreuil from "./pages/TaxiMeyreuil";
import TaxiPertuis from "./pages/TaxiPertuis";
import TaxiSalonDeProvence from "./pages/TaxiSalonDeProvence";
import TaxiVenelles from "./pages/TaxiVenelles";
import TaxiVitrolles from "./pages/TaxiVitrolles";
const queryClient = new QueryClient();
const App = () => (
  <QueryClientProvider client={queryClient}><TooltipProvider><Toaster /><Sonner />
    <BrowserRouter><Routes>
      <Route path="/" element={<Index />} />
      <Route path="/mentions-legales" element={<MentionsLegales />} />
      <Route path="/merci" element={<Merci />} />
      <Route path="/taxi-gardanne" element={<TaxiGardanne />} />
      <Route path="/taxi-aeroport-marignane" element={<TaxiAeroportMarignane />} />
      <Route path="/taxi-gare-saint-charles" element={<TaxiGareSaintCharles />} />
      <Route path="/taxi-gare-tgv-aix" element={<TaxiGareTGVAix />} />
      <Route path="/taxi-meyreuil" element={<TaxiMeyreuil />} />
      <Route path="/taxi-pertuis" element={<TaxiPertuis />} />
      <Route path="/taxi-salon-de-provence" element={<TaxiSalonDeProvence />} />
      <Route path="/taxi-venelles" element={<TaxiVenelles />} />
      <Route path="/taxi-vitrolles" element={<TaxiVitrolles />} />
      <Route path="*" element={<NotFound />} />
    </Routes></BrowserRouter>
  </TooltipProvider></QueryClientProvider>
);
export default App;