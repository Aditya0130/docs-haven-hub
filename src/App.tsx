import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DocsLayout } from "./components/DocsLayout";
import Introduction from "./pages/docs/Introduction";
import QuickStart from "./pages/docs/QuickStart";
import Installation from "./pages/docs/Installation";
import ApiReference from "./pages/docs/ApiReference";
import Components from "./pages/docs/Components";
import Database from "./pages/docs/Database";
import NotFound from "./pages/NotFound";
import { PolarisProvider, PolarisSidebar } from "@contentstack/polaris-core";
import '@contentstack/polaris-core/dist/styles.css';
import { templates } from "./data/templates";
import { ThemeProvider } from "./contexts/ThemeContext";
const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PolarisProvider>
        <PolarisSidebar 
          templates={templates}
          moduleName="cms:docs"
        />
        <ThemeProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />

            <BrowserRouter>
              <DocsLayout>
                <Routes>
                  <Route path="/" element={<Introduction />} />
                  <Route path="/quick-start" element={<QuickStart />} />
                  <Route path="/installation" element={<Installation />} />
                  <Route path="/api" element={<ApiReference />} />
                  <Route path="/components" element={<Components />} />
                  <Route path="/database" element={<Database />} />
                  {/* Placeholder routes for other sidebar items */}
                  <Route
                    path="/auth"
                    element={
                      <div className="docs-content">
                        <h1>Authentication Guide</h1>
                        <p>Coming soon...</p>
                      </div>
                    }
                  />
                  <Route
                    path="/performance"
                    element={
                      <div className="docs-content">
                        <h1>Performance Optimization</h1>
                        <p>Coming soon...</p>
                      </div>
                    }
                  />
                  <Route
                    path="/deployment"
                    element={
                      <div className="docs-content">
                        <h1>Deployment Guide</h1>
                        <p>Coming soon...</p>
                      </div>
                    }
                  />
                  <Route
                    path="/team"
                    element={
                      <div className="docs-content">
                        <h1>Team Management</h1>
                        <p>Coming soon...</p>
                      </div>
                    }
                  />
                  <Route
                    path="/analytics"
                    element={
                      <div className="docs-content">
                        <h1>Analytics & Insights</h1>
                        <p>Coming soon...</p>
                      </div>
                    }
                  />
                  <Route
                    path="/community"
                    element={
                      <div className="docs-content">
                        <h1>Community & Support</h1>
                        <p>Coming soon...</p>
                      </div>
                    }
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </DocsLayout>
            </BrowserRouter>
          </TooltipProvider>
        </ThemeProvider>
      </PolarisProvider>
    </QueryClientProvider>
  );
};

export default App;
