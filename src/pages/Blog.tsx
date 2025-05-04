
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

// Mock blog posts data
const blogPosts = [
  {
    id: "1",
    title: "Getting Started with AllInOne Platform",
    excerpt: "Learn how to set up and configure the AllInOne platform for your business needs.",
    category: "Tutorials",
    author: "Admin Team",
    date: "May 1, 2024",
    readTime: "5 min read",
    slug: "getting-started",
    image: "/placeholder.svg",
    featured: true,
  },
  {
    id: "2",
    title: "10 Tips for Creating Engaging Blog Content",
    excerpt: "Discover strategies to create blog content that resonates with your audience and drives engagement.",
    category: "Content Marketing",
    author: "Jane Smith",
    date: "April 28, 2024",
    readTime: "8 min read",
    slug: "content-tips",
    image: "/placeholder.svg",
  },
  {
    id: "3",
    title: "Optimizing Your Website for Mobile Devices",
    excerpt: "Mobile optimization strategies to ensure your website provides an excellent experience on all devices.",
    category: "Web Development",
    author: "John Developer",
    date: "April 25, 2024",
    readTime: "6 min read",
    slug: "mobile-optimization",
    image: "/placeholder.svg",
  },
  {
    id: "4",
    title: "The Power of Template-Based Design",
    excerpt: "How using templates can streamline your design workflow and improve consistency across projects.",
    category: "Design",
    author: "Sarah Designer",
    date: "April 22, 2024",
    readTime: "7 min read",
    slug: "template-design",
    image: "/placeholder.svg",
  },
  {
    id: "5",
    title: "SEO Best Practices for 2024",
    excerpt: "Stay ahead of the curve with these essential SEO techniques and strategies for the coming year.",
    category: "SEO",
    author: "Mark Optimizer",
    date: "April 19, 2024",
    readTime: "10 min read",
    slug: "seo-practices",
    image: "/placeholder.svg",
  },
  {
    id: "6",
    title: "Integrating Third-Party APIs with AllInOne",
    excerpt: "A step-by-step guide to connect external services and APIs to enhance your AllInOne platform.",
    category: "Development",
    author: "Tech Team",
    date: "April 16, 2024",
    readTime: "12 min read",
    slug: "api-integration",
    image: "/placeholder.svg",
  },
];

// All categories from blog posts
const categories = ["All", ...Array.from(new Set(blogPosts.map((post) => post.category)))];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter posts based on search query and category
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get featured post
  const featuredPost = blogPosts.find((post) => post.featured);

  return (
    <div className="container py-8 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Our Blog</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Insights, tutorials, and updates from our team to help you get the most out of our platform.
        </p>
      </div>

      {/* Featured post */}
      {featuredPost && (
        <div className="mb-12">
          <Link to={`/blog/${featuredPost.slug}`}>
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="h-60 md:h-auto bg-muted">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      Featured
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">{featuredPost.title}</h2>
                  <p className="text-muted-foreground mb-6">{featuredPost.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <span className="text-xs">A</span>
                      </div>
                      <span className="text-sm">{featuredPost.author}</span>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {featuredPost.date} · {featuredPost.readTime}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        </div>
      )}

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between mb-8">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input 
            placeholder="Search blog posts..." 
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="w-full sm:w-auto">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Blog posts grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post) => (
            <Link to={`/blog/${post.slug}`} key={post.id}>
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                <div className="h-48 bg-muted">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs bg-muted px-2 py-1 rounded-full">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.date}
                    </span>
                  </div>
                  <CardTitle className="text-xl">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <span className="text-sm text-muted-foreground">{post.readTime}</span>
                  <span className="text-sm font-medium">Read More</span>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No posts found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
          <Button variant="outline" onClick={() => {
            setSearchQuery("");
            setSelectedCategory("All");
          }}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
