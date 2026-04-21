import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LanguageProvider } from "@/contexts/LanguageContext";
import SiteLayout from "./layout/SiteLayout";
import Index from "./pages/Index.tsx";
import Search from "./pages/Search";
import ProviderProfile from "./pages/ProviderProfile";
import ServiceRequest from "./pages/ServiceRequest";
import Chat from "./pages/Chat";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProviderDashboard from "./pages/ProviderDashboard";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<SiteLayout />}>
              <Route path="/" element={<Index />} />
              <Route path="/search" element={<Search />} />
              <Route path="/provider/:id" element={<ProviderProfile />} />
              <Route path="/request/:id" element={<ServiceRequest />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/dashboard" element={<CustomerDashboard />} />
              <Route path="/provider" element={<ProviderDashboard />} />
              <Route path="/auth" element={<Auth />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
