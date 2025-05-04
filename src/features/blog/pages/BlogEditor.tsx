
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Save, ArrowLeft } from "lucide-react";

export default function BlogEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const isEditing = !!id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here would be the API call to save or update the blog post
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success(isEditing ? "Blog post updated successfully!" : "Blog post created successfully!");
      navigate("/admin/blog");
    } catch (error) {
      toast.error("Failed to save blog post");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            {isEditing ? "Edit Blog Post" : "Create Blog Post"}
          </h2>
          <p className="text-muted-foreground">
            {isEditing
              ? "Edit your blog post and update it"
              : "Create a new blog post for your website"}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate("/admin/blog")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Blog Post Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter blog content here..."
                rows={10}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => navigate("/admin/blog")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "Update Post" : "Publish Post"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
