import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Menu, Search, Send, MessageCircle, User } from "lucide-react";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ThemeSwitcher } from "./ThemeSwitcher";
import {
  usePolarisContext,
  usePolarisSidebar,
  usePolarisAction,
  PolarisActions
} from "@contentstack/polaris-core";
import { useState } from "react";
import { useDocsContent } from "@/hooks/use-docs-content";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useTheme } from '@/contexts/ThemeContext';

interface DocsLayoutProps {
  children: React.ReactNode;
}

interface Comment {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  isHelpful?: boolean;
}

export function DocsLayout({ children }: DocsLayoutProps) {
  const content = useDocsContent();
  const navigate = useNavigate();
  const [docsResponse, setDocsResponse] = useState(null);
  const [newComment, setNewComment] = useState("");
  const polarisSidebar = usePolarisSidebar();
  const { theme, setTheme } = useTheme();
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      author: "Sarah Chen",
      avatar: "SC",
      content:
        "This documentation is really helpful! The examples are clear and easy to follow. Thanks for the detailed explanations on the API endpoints.",
      timestamp: "2 hours ago",
      isHelpful: true,
    },
    {
      id: 2,
      author: "Mike Rodriguez",
      avatar: "MR",
      content:
        "I was struggling with the installation process, but this guide made it super straightforward. The troubleshooting section saved me a lot of time!",
      timestamp: "1 day ago",
      isHelpful: true,
    },
  ]);

  // Setup Polaris context with dynamic content
  usePolarisContext({
    module: "cms:docs",
    payload: content, //change to payload
  });
  usePolarisContext({
    module: "app:theme",
    payload: {
      currentTheme: theme,
    },
  });
  // Handle navigation actions from Polaris -- remove this
  usePolarisAction(PolarisActions.APP_NAVIGATE, async (artifact) => {
    console.log("Navigation action received:", artifact);
    
    try {
      if (!artifact?.artifact.data.navigate) {
        return {
          success: false,
          error: "No navigation destination provided",
        };
      }

      const destination = artifact.artifact.data.navigate;
      let route = "/";
      
      // Map navigation destinations to routes
      switch (destination.toLowerCase()) {
        case "introduction":
          route = "/";
          break;
        case "quickstart":
        case "quick-start":
          route = "/quick-start";
          break;
        case "installation":
          route = "/installation";
          break;
        case "apireference":
        case "api-reference":
        case "api":
          route = "/api";
          break;
        case "components":
          route = "/components";
          break;
        case "database":
          route = "/database";
          break;
        case "auth":
        case "authentication":
          route = "/auth";
          break;
        case "performance":
          route = "/performance";
          break;
        case "deployment":
          route = "/deployment";
          break;
        case "team":
          route = "/team";
          break;
        case "analytics":
          route = "/analytics";
          break;
        case "community":
          route = "/community";
          break;
        default:
          // If no match, try using the destination as-is with leading slash
          route = destination.startsWith("/") ? destination : `/${destination.toLowerCase()}`;
      }
      
      navigate(route);
      
      return {
        success: true,
        message: `Navigated to ${route}`,
      };
    } catch (error) {
      console.error("Error handling navigation action:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  });

  // Handle scroll actions from Polaris
  usePolarisAction(PolarisActions.APP_SCROLL_TO, async (artifact) => {
    console.log("Scroll action received:", artifact);
    
    try {
      if (!artifact?.artifact.data.scroll) {
        return {
          success: false,
          error: "No scroll target provided",
        };
      }

      const scrollTarget = artifact.artifact.data.scroll;
      
      if (scrollTarget === "bottom") {
        // Scroll to bottom of the page - use multiple methods to ensure we get the absolute bottom
        const scrollToBottom = () => {
          const documentHeight = Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
          );
          
          window.scrollTo({
            top: documentHeight,
            behavior: "smooth"
          });
        };
        
        // Add a small delay to account for any dynamic content loading
        setTimeout(scrollToBottom, 100);
        
        return {
          success: true,
          message: "Scrolled to bottom of page",
        };
      }

      // Function to find element by exact ID or partial match
      const findScrollElement = (targetId: string) => {
        // First try exact match
        let element = document.getElementById(targetId);
        if (element) {
          console.log(`Found element by exact ID: ${targetId}`);
          return element;
        }

        // If not found, try to find by partial match or related IDs
        const possibleIds = [
          targetId,
          `${targetId}-desc`,
          `${targetId}-table`,
          `${targetId}-list`,
          `${targetId}-code`,
          `${targetId}-example`
        ];

        for (const id of possibleIds) {
          element = document.getElementById(id);
          if (element) {
            console.log(`Found element by related ID: ${id}`);
            return element;
          }
        }

        // Last resort: search for any element containing the target ID
        const allElements = document.querySelectorAll('[id]');
        for (const el of allElements) {
          if (el.id && el.id.includes(targetId)) {
            console.log(`Found element by partial match: ${el.id}`);
            return el as HTMLElement;
          }
        }

        return null;
      };

      const element = findScrollElement(scrollTarget);
      
      if (element) {
        // Add a small delay to ensure DOM is ready
        setTimeout(() => {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest"
          });
          
          // Add visual highlight temporarily
          element.style.transition = "background-color 0.3s ease";
          const originalBg = element.style.backgroundColor;
          element.style.backgroundColor = "rgba(59, 130, 246, 0.1)"; // Light blue highlight
          
          setTimeout(() => {
            element.style.backgroundColor = originalBg;
          }, 2000);
        }, 100);
        
        return {
          success: true,
          message: `Scrolled to element with ID: ${element.id}`,
        };
      } else {
        // Debug: List all available IDs
        const allIds = Array.from(document.querySelectorAll('[id]')).map(el => el.id);
        console.warn(`Element with ID "${scrollTarget}" not found. Available IDs:`, allIds);
        
        return {
          success: false,
          error: `Element with ID "${scrollTarget}" not found. Available IDs: ${allIds.join(', ')}`,
        };
      }
    } catch (error) {
      console.error("Error handling scroll action:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  });

  // Handle content addition actions from Polaris
  usePolarisAction(PolarisActions.CONTENT_ADD, async (artifact) => {
    console.log("Content add action received:", artifact);
    
    try {
      if (!artifact?.artifact.data.comment) {
        return {
          success: false,
          error: "No comment content provided",
        };
      }

      // Handle comment addition
      const newComment: Comment = {
        id: comments.length + 1,
        author: "AI Assistant",
        avatar: "AI",
        content: artifact.artifact.data.comment,
        timestamp: "Just now",
        isHelpful: false,
      };
      
      setComments(prevComments => [...prevComments, newComment]);
      
      return {
        success: true,
        message: "Comment added successfully",
      };
    } catch (error) {
      console.error("Error handling content add action:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  });

  usePolarisAction(PolarisActions.THEME_CHANGE, async (artifact) => {
    console.log("Theme change action received:", artifact);
    setTheme(artifact.artifact.data.theme);
  });


  const handleSubmitComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: comments.length + 1,
      author: "Anonymous User",
      avatar: "AU",
      content: newComment.trim(),
      timestamp: "Just now",
      isHelpful: false,
    };

    setComments([...comments, comment]);
    setNewComment("");
  };

  


  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative">
        <AppSidebar />

        <div
          className={`flex-1 flex flex-col transition-all duration-300 ease-in-out
            `}
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
               
                <Button variant="default" onClick={() => polarisSidebar.open()}>
                  Ask AI

                </Button>
                <div className="flex items-center space-x-2">
                  <ThemeSwitcher />
                 
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

          {/* Comments Section Footer */}
          <footer className="border-t border-docs-border-subtle bg-muted/30">
            <div className="container max-w-4xl mx-auto px-4 py-8">
              <Card id="comments-section">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Comments ({comments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Existing Comments */}
                  <div className="space-y-4">
                    {comments.map((comment) => (
                      <div
                        key={comment.id}
                        className="flex gap-3 p-4 rounded-lg bg-background border border-docs-border-subtle"
                      >
                        <Avatar className="w-10 h-10">
                          <AvatarFallback className="bg-primary/10 text-primary font-medium">
                            {comment.avatar}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-medium text-sm">
                              {comment.author}
                            </h4>
                            <span className="text-xs text-muted-foreground">
                              {comment.timestamp}
                            </span>
                            {comment.isHelpful && (
                              <Badge variant="secondary" className="text-xs">
                                Helpful
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-foreground leading-relaxed">
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Comment */}
                  <div className="border-t pt-6">
                    <h3 className="font-medium text-sm mb-3 flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Add a comment
                    </h3>
                    <div className="space-y-3">
                      <Textarea
                        placeholder="Share your thoughts, ask questions, or provide feedback..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="min-h-[100px] resize-none"
                      />
                      <div className="flex justify-end">
                        {/* <Button
                          onClick={handleSubmitComment}
                          disabled={!newComment.trim()}
                          className="flex items-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Post Comment
                        </Button> */}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </footer>
        </div>
      </div>
    </SidebarProvider>
  );
}
  