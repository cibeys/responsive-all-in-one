
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Layers,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  Filter,
  Download,
  Star,
  DollarSign
} from "lucide-react";
import { toast } from "sonner";

// Mock templates data
const templateData = [
  {
    id: "1",
    title: "Business Landing",
    status: "published",
    category: "Landing Page",
    date: "May 1, 2024",
    downloads: 2500,
    rating: 4.9,
    reviews: 124,
    price: "Free",
  },
  {
    id: "2",
    title: "Portfolio Pro",
    status: "published",
    category: "Portfolio",
    date: "April 28, 2024",
    downloads: 1845,
    rating: 4.7,
    reviews: 96,
    price: "$19",
  },
  {
    id: "3",
    title: "E-commerce Starter",
    status: "published",
    category: "E-commerce",
    date: "April 25, 2024",
    downloads: 3200,
    rating: 4.8,
    reviews: 215,
    price: "$29",
  },
  {
    id: "4",
    title: "Blog Standard",
    status: "draft",
    category: "Blog",
    date: "April 22, 2024",
    downloads: 0,
    rating: 0,
    reviews: 0,
    price: "Free",
  },
  {
    id: "5",
    title: "Admin Dashboard",
    status: "published",
    category: "Dashboard",
    date: "April 19, 2024",
    downloads: 2100,
    rating: 4.9,
    reviews: 189,
    price: "$39",
  },
  {
    id: "6",
    title: "SaaS Homepage",
    status: "draft",
    category: "Landing Page",
    date: "April 16, 2024",
    downloads: 0,
    rating: 0,
    reviews: 0,
    price: "$24",
  },
];

// All categories from templates
const categories = ["all", ...Array.from(new Set(templateData.map((template) => template.category.toLowerCase())))];

export default function TemplatesManagementPage() {
  const [templates, setTemplates] = useState(templateData);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deleteTemplateId, setDeleteTemplateId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // Filter templates based on search query, status, and category
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || template.status === statusFilter;
    
    const matchesCategory = categoryFilter === "all" || template.category.toLowerCase() === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Delete template handler
  const handleDeleteTemplate = () => {
    if (deleteTemplateId) {
      setTemplates(templates.filter((template) => template.id !== deleteTemplateId));
      toast.success("Template deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeleteTemplateId(null);
    }
  };

  // Toggle template status handler
  const toggleTemplateStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    setTemplates(templates.map((template) => 
      template.id === id ? { ...template, status: newStatus } : template
    ));
    toast.success(`Template ${newStatus === "published" ? "published" : "unpublished"}`);
  };

  // To confirm deletion
  const openDeleteDialog = (id: string) => {
    setDeleteTemplateId(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Template Management</h2>
          <p className="text-muted-foreground">
            Manage your templates, drafts, and categories.
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/templates/new">
            <Plus className="mr-2 h-4 w-4" />
            New Template
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Published Templates */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Published Templates
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {templates.filter((template) => template.status === "published").length}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xs text-muted-foreground">
              {templates.filter((template) => template.status === "published" && new Date(template.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} published in last 7 days
            </div>
          </CardContent>
        </Card>
        
        {/* Drafts */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Draft Templates
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {templates.filter((template) => template.status === "draft").length}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xs text-muted-foreground">
              {templates.filter((template) => template.status === "draft" && new Date(template.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} created in last 7 days
            </div>
          </CardContent>
        </Card>
        
        {/* Total Downloads */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Total Downloads
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {templates.reduce((acc, template) => acc + template.downloads, 0).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xs text-muted-foreground">
              Across all published templates
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search templates..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-32">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                <SelectValue placeholder="Status" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
          
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                <SelectValue placeholder="Category" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.slice(1).map((category) => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Templates table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Rating</TableHead>
                <TableHead className="text-right">Downloads</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTemplates.length > 0 ? (
                filteredTemplates.map((template) => (
                  <TableRow key={template.id}>
                    <TableCell>
                      <div className="font-medium line-clamp-1">{template.title}</div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        template.status === "published"
                          ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }`}>
                        {template.status === "published" ? "Published" : "Draft"}
                      </div>
                    </TableCell>
                    <TableCell>{template.category}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <DollarSign className={`h-3 w-3 mr-1 ${template.price === "Free" ? "text-muted-foreground" : "text-green-600"}`} />
                        {template.price}
                      </div>
                    </TableCell>
                    <TableCell>{template.date}</TableCell>
                    <TableCell className="text-right">
                      {template.rating > 0 ? (
                        <div className="flex items-center justify-end">
                          <Star className="h-3 w-3 fill-yellow-500 text-yellow-500 mr-1" />
                          {template.rating}
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      {template.downloads > 0 ? (
                        <div className="flex items-center justify-end">
                          <Download className="h-3 w-3 mr-1" />
                          {template.downloads.toLocaleString()}
                        </div>
                      ) : (
                        "—"
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-40">
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/templates/edit/${template.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/templates/${template.id}`} target="_blank">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => toggleTemplateStatus(template.id, template.status)}
                          >
                            <Layers className="mr-2 h-4 w-4" />
                            {template.status === "published" ? "Unpublish" : "Publish"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => openDeleteDialog(template.id)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center">
                    No templates found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Template</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this template? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteTemplate}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
