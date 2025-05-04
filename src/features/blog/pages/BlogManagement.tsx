
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
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  FileText,
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash,
  Eye,
  Filter,
} from "lucide-react";
import { toast } from "sonner";

// Mock blog posts data
const blogPosts = [
  {
    id: "1",
    title: "Getting Started with AllInOne Platform",
    status: "published",
    author: "Admin Team",
    category: "Tutorials",
    date: "May 1, 2024",
    views: 1245,
    slug: "getting-started",
  },
  {
    id: "2",
    title: "10 Tips for Creating Engaging Blog Content",
    status: "published",
    author: "Jane Smith",
    category: "Content Marketing",
    date: "April 28, 2024",
    views: 895,
    slug: "content-tips",
  },
  {
    id: "3",
    title: "Optimizing Your Website for Mobile Devices",
    status: "published",
    author: "John Developer",
    category: "Web Development",
    date: "April 25, 2024",
    views: 721,
    slug: "mobile-optimization",
  },
  {
    id: "4",
    title: "The Power of Template-Based Design",
    status: "draft",
    author: "Sarah Designer",
    category: "Design",
    date: "April 22, 2024",
    views: 0,
    slug: "template-design",
  },
  {
    id: "5",
    title: "SEO Best Practices for 2024",
    status: "published",
    author: "Mark Optimizer",
    category: "SEO",
    date: "April 19, 2024",
    views: 567,
    slug: "seo-practices",
  },
  {
    id: "6",
    title: "Integrating Third-Party APIs with AllInOne",
    status: "draft",
    author: "Tech Team",
    category: "Development",
    date: "April 16, 2024",
    views: 0,
    slug: "api-integration",
  },
];

export default function BlogManagementPage() {
  const [posts, setPosts] = useState(blogPosts);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deletePostId, setDeletePostId] = useState<string | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  // All categories from blog posts
  const categories = ["all", ...Array.from(new Set(blogPosts.map((post) => post.category.toLowerCase())))];

  // Filter posts based on search query, status, and category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    
    const matchesCategory = categoryFilter === "all" || post.category.toLowerCase() === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Delete post handler
  const handleDeletePost = () => {
    if (deletePostId) {
      setPosts(posts.filter((post) => post.id !== deletePostId));
      toast.success("Post deleted successfully");
      setIsDeleteDialogOpen(false);
      setDeletePostId(null);
    }
  };

  // Toggle post status handler
  const togglePostStatus = (id: string, currentStatus: string) => {
    const newStatus = currentStatus === "published" ? "draft" : "published";
    setPosts(posts.map((post) => 
      post.id === id ? { ...post, status: newStatus } : post
    ));
    toast.success(`Post ${newStatus === "published" ? "published" : "unpublished"}`);
  };

  // To confirm deletion
  const openDeleteDialog = (id: string) => {
    setDeletePostId(id);
    setIsDeleteDialogOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Blog Management</h2>
          <p className="text-muted-foreground">
            Manage your blog posts, drafts, and categories.
          </p>
        </div>
        <Button asChild>
          <Link to="/admin/blog/new">
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Link>
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-3">
        {/* Published Posts */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Published Posts
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {posts.filter((post) => post.status === "published").length}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xs text-muted-foreground">
              {posts.filter((post) => post.status === "published" && new Date(post.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} published in last 7 days
            </div>
          </CardContent>
        </Card>
        
        {/* Drafts */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Draft Posts
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {posts.filter((post) => post.status === "draft").length}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xs text-muted-foreground">
              {posts.filter((post) => post.status === "draft" && new Date(post.date) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} created in last 7 days
            </div>
          </CardContent>
        </Card>
        
        {/* Total Views */}
        <Card>
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-base font-medium text-muted-foreground">
              Total Views
            </CardTitle>
            <CardDescription className="text-2xl font-bold">
              {posts.reduce((acc, post) => acc + post.views, 0).toLocaleString()}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-xs text-muted-foreground">
              Across all published posts
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Filter controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search blog posts..." 
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
                <FileText className="h-4 w-4" />
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
      
      {/* Blog posts table */}
      <Card>
        <CardContent className="p-0 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Views</TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="font-medium line-clamp-1">{post.title}</div>
                      <div className="text-xs text-muted-foreground">{post.author}</div>
                    </TableCell>
                    <TableCell>
                      <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        post.status === "published"
                          ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                          : "bg-yellow-50 text-yellow-700 dark:bg-yellow-900/20 dark:text-yellow-400"
                      }`}>
                        {post.status === "published" ? "Published" : "Draft"}
                      </div>
                    </TableCell>
                    <TableCell>{post.category}</TableCell>
                    <TableCell>{post.date}</TableCell>
                    <TableCell className="text-right">{post.views.toLocaleString()}</TableCell>
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
                            <Link to={`/admin/blog/edit/${post.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/blog/${post.slug}`} target="_blank">
                              <Eye className="mr-2 h-4 w-4" />
                              View
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => togglePostStatus(post.id, post.status)}
                          >
                            <FileText className="mr-2 h-4 w-4" />
                            {post.status === "published" ? "Unpublish" : "Publish"}
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-destructive focus:text-destructive"
                            onClick={() => openDeleteDialog(post.id)}
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
                  <TableCell colSpan={6} className="h-24 text-center">
                    No posts found.
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
            <DialogTitle>Delete Post</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this post? This action cannot be undone.
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
              onClick={handleDeletePost}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
