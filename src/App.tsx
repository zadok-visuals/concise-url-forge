
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Pages
import Layout from "./pages/Layout";
import HomePage from "./pages/HomePage";
import UrlsPage from "./pages/UrlsPage";
import StatisticsPage from "./pages/StatisticsPage";
import ApiDocsPage from "./pages/ApiDocsPage";
import RedirectPage from "./pages/RedirectPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="urls" element={<UrlsPage />} />
            <Route path="statistics/:urlPath" element={<StatisticsPage />} />
            <Route path="api-docs" element={<ApiDocsPage />} />
          </Route>
          <Route path="/:urlPath" element={<RedirectPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
