
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Save, ArrowLeft } from "lucide-react";

export default function TemplateEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const isEditing = !!id;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here would be the API call to save or update the template
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      toast.success(isEditing ? "Template updated successfully!" : "Template created successfully!");
      navigate("/admin/templates");
    } catch (error) {
      toast.error("Failed to save template");
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
            {isEditing ? "Edit Template" : "Create Template"}
          </h2>
          <p className="text-muted-foreground">
            {isEditing
              ? "Edit your template and update it"
              : "Create a new template for your marketplace"}
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={() => navigate("/admin/templates")}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Templates
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Template Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter template name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter template description"
                rows={3}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="code">Code</Label>
              <Textarea
                id="code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Enter template code"
                rows={10}
                className="font-mono"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="outline" type="button" onClick={() => navigate("/admin/templates")}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              <Save className="mr-2 h-4 w-4" />
              {isEditing ? "Update Template" : "Save Template"}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
