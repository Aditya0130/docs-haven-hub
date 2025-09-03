import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Menu, Search, Send, MessageCircle, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  dispatchToPolaris,
  usePolarisProvider,
  usePolarisContext,
  usePolarisAction,
  PolarisContextPayload,
} from "@contentstack/polaris-core";
import { useState, useEffect } from "react";
import { useDocsContent } from "@/hooks/use-docs-content";
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
  const provider = usePolarisProvider();
  const [isPolarisOpen, setIsPolarisOpen] = useState(false);
  const content = useDocsContent();
  const [docsResponse, setDocsResponse] = useState(null);
  const [newComment, setNewComment] = useState("");
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
    module: "docs:introduction",
    data: content,
  });


  usePolarisAction("docs:introduction", async (artifact) => {
    if (artifact && artifact.type === "update" && artifact.data) {
      const { scroll, ScrollTo, comment } = artifact.data;
      const scrollTarget = scroll || ScrollTo;

      // Handle scroll functionality with enhanced timing and fallbacks
      if (scrollTarget) {
        console.log(`Attempting to scroll to: "${scrollTarget}"`);

        const performScroll = () => {
          // Special case: scroll to bottom
          if (scrollTarget === "bottom") {
            window.scrollTo({
              top: document.body.scrollHeight,
              behavior: "smooth",
            });
            return true;
          }

          // Find the section element by ID
          const sectionElement = document.getElementById(scrollTarget);
          if (sectionElement) {
            console.log(
              `Found element with ID "${scrollTarget}", scrolling...`
            );

            // Add a small offset to account for sticky headers
            const elementTop = sectionElement.offsetTop;
            const offset = 80; // Adjust based on your header height

            window.scrollTo({
              top: elementTop - offset,
              behavior: "smooth",
            });

            // Alternative method if the above doesn't work
            setTimeout(() => {
              sectionElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }, 100);

            return true;
          }
          return false;
        };

        // Try immediate scroll
        if (!performScroll()) {
          console.warn(
            `Section with ID "${scrollTarget}" not found, retrying...`
          );

          // Retry after DOM updates
          setTimeout(() => {
            if (!performScroll()) {
              console.warn(
                `Section with ID "${scrollTarget}" still not found after retry`
              );

              // Final debug: List all elements with IDs
              const elementsWithIds = document.querySelectorAll("[id]");
              console.log(
                "Available IDs on page:",
                Array.from(elementsWithIds).map((el) => el.id)
              );

              // Try one more time with a longer delay
              setTimeout(() => {
                performScroll();
              }, 500);
            }
          }, 200);
        }
      }

      // Handle comment functionality
      if (comment) {
        // Add the comment to the comments list
        const newComment: Comment = {
          id: comments.length + 1,
          author: "AI Assistant",
          avatar: "AI",
          content: comment,
          timestamp: "Just now",
          isHelpful: false,
        };

        setComments((prevComments) => [...prevComments, newComment]);

        // Scroll to comments section after a brief delay to allow state update
        setTimeout(() => {
          const commentsSection = document.getElementById("comments-section");
          if (commentsSection) {
            commentsSection.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }
        }, 100);
      }
    }

    setDocsResponse(artifact);
    return { success: true };
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
      const sidebarHeader = document.querySelector(
        '[data-testid="sidebar-header"]'
      );
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
      attributeFilter: ["data-testid"],
    });

    // Initial check
    checkPolarisState();

    // Also listen for resize events in case sidebar affects layout
    window.addEventListener("resize", checkPolarisState);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", checkPolarisState);
    };
  }, [provider]);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative">
        <AppSidebar />

        <div
          className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
            isPolarisOpen ? "lg:mr-80 md:mr-72 mr-0" : "mr-0"
          }`}
          style={{
            // Ensure our content doesn't get hidden behind the Polaris sidebar
            zIndex: isPolarisOpen ? 1 : "auto",
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
                        <Button
                          onClick={handleSubmitComment}
                          disabled={!newComment.trim()}
                          className="flex items-center gap-2"
                        >
                          <Send className="w-4 h-4" />
                          Post Comment
                        </Button>
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
