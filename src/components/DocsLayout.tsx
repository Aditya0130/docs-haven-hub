import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { dispatchToPolaris, usePolarisProvider } from "@contentstack/polaris-core";
import { useState, useEffect } from "react";
interface DocsLayoutProps {
  children: React.ReactNode;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const provider = usePolarisProvider();
  const [isPolarisOpen, setIsPolarisOpen] = useState(false);
  
  const openSidebar = () => {
    dispatchToPolaris(provider, "OPEN_SIDEBAR", {
      open: true,
    });
    setIsPolarisOpen(true);
  };

  // Listen for Polaris sidebar state changes
  useEffect(() => {
    if (!provider) return;

    // Simple and accurate Polaris sidebar detection
    const checkPolarisState = () => {
      const sidebarHeader = document.querySelector('[data-testid="sidebar-header"]');
      const isOpen = sidebarHeader !== null;
      setIsPolarisOpen(isOpen);
    };

    // Use MutationObserver to detect DOM changes
    const observer = new MutationObserver(() => {
      // Debounce the check to avoid excessive calls
      setTimeout(checkPolarisState, 100);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-testid']
    });

    // Initial check
    checkPolarisState();
    
    // Also listen for resize events in case sidebar affects layout
    window.addEventListener('resize', checkPolarisState);
    
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', checkPolarisState);
    };
  }, [provider]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative">
        <AppSidebar />
        
        <div 
          className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
            isPolarisOpen ? 'lg:mr-80 md:mr-72 mr-0' : 'mr-0'
          }`}
          style={{
            // Ensure our content doesn't get hidden behind the Polaris sidebar
            zIndex: isPolarisOpen ? 1 : 'auto'
          }}
        >
          {/* Header */}
          <header className="sticky top-0 z-40 w-full border-b border-docs-border-subtle bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center px-4">
              <SidebarTrigger className="mr-4">
                <Menu className="w-4 h-4" />
              </SidebarTrigger>
              
              <div className="flex-1 flex items-center space-x-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search documentation..." 
                    className="pl-10 bg-muted/50 border-docs-border-subtle"
                  />
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm" onClick={openSidebar}>
                    Ask AI
                  </Button>
                  {/* Debug indicator - remove in production */}
                  {isPolarisOpen && (
                    <div className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      Sidebar Open
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            <div className="container max-w-4xl mx-auto px-4 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}