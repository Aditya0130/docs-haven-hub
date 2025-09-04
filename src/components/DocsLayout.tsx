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
  usePolarisProvider,
  usePolarisContext,
} from "@contentstack/polaris-core";
import { useState } from "react";
import { useDocsContent } from "@/hooks/use-docs-content";
interface DocsLayoutProps {
  children: React.ReactNode;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

interface Comment {
  id: number;
  author: string;
  avatar?: string;
  content: string;
  timestamp: string;
  isHelpful?: boolean;
}

export function DocsLayout({ children, sidebarOpen, setSidebarOpen }: DocsLayoutProps) {
  const provider = usePolarisProvider();
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
    module: "cms:docs",
    data: content,
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
    setSidebarOpen(true);
  };


  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background relative">
        <AppSidebar />

        <div
          className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${
            sidebarOpen ? "lg:mr-80 md:mr-72 mr-0" : "mr-0"
          }`}
          style={{
            // Ensure our content doesn't get hidden behind the Polaris sidebar
            zIndex: sidebarOpen ? 1 : "auto",
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
