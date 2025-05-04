
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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Search, Star, Download } from "lucide-react";

// Mock templates data
const templates = [
  {
    id: "1",
    title: "Business Landing",
    description: "Professional landing page for businesses with hero section, features, pricing, and contact form.",
    category: "Landing Page",
    rating: 4.9,
    reviews: 124,
    price: "Free",
    image: "/placeholder.svg",
    downloads: 2500,
    tags: ["Business", "Marketing", "Landing"],
  },
  {
    id: "2",
    title: "Portfolio Pro",
    description: "Showcase your work with this elegant portfolio template, perfect for creatives and freelancers.",
    category: "Portfolio",
    rating: 4.7,
    reviews: 96,
    price: "$19",
    image: "/placeholder.svg",
    downloads: 1845,
    tags: ["Portfolio", "Creative", "Personal"],
  },
  {
    id: "3",
    title: "E-commerce Starter",
    description: "Complete e-commerce template with product listings, cart, and checkout functionality.",
    category: "E-commerce",
    rating: 4.8,
    reviews: 215,
    price: "$29",
    image: "/placeholder.svg",
    downloads: 3200,
    tags: ["Shop", "E-commerce", "Business"],
  },
  {
    id: "4",
    title: "Blog Standard",
    description: "Clean and modern blog template with multiple layouts and comprehensive post templates.",
    category: "Blog",
    rating: 4.6,
    reviews: 78,
    price: "Free",
    image: "/placeholder.svg",
    downloads: 1560,
    tags: ["Blog", "Content", "Publishing"],
  },
  {
    id: "5",
    title: "Admin Dashboard",
    description: "Comprehensive admin dashboard with analytics, user management, and settings panels.",
    category: "Dashboard",
    rating: 4.9,
    reviews: 189,
    price: "$39",
    image: "/placeholder.svg",
    downloads: 2100,
    tags: ["Admin", "Dashboard", "Management"],
  },
  {
    id: "6",
    title: "SaaS Homepage",
    description: "Modern SaaS homepage template with features showcase, pricing tables, and testimonials.",
    category: "Landing Page",
    rating: 4.8,
    reviews: 134,
    price: "$24",
    image: "/placeholder.svg",
    downloads: 1950,
    tags: ["SaaS", "Software", "Landing"],
  },
];

// All categories from templates
const categories = ["All", ...Array.from(new Set(templates.map((template) => template.category)))];

// All price options
const priceOptions = ["All", "Free", "Premium"];

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPrice, setSelectedPrice] = useState("All");

  // Filter templates based on search query, category, and price
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch = template.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === "All" || template.category === selectedCategory;
    
    const matchesPrice = selectedPrice === "All" || 
      (selectedPrice === "Free" && template.price === "Free") || 
      (selectedPrice === "Premium" && template.price !== "Free");
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="container py-8 max-w-7xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Template Marketplace</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Browse our collection of professionally designed templates to kickstart your next project.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4 items-center justify-between mb-8">
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
          
          <Select value={selectedPrice} onValueChange={setSelectedPrice}>
            <SelectTrigger className="w-full sm:w-[120px]">
              <SelectValue placeholder="Price" />
            </SelectTrigger>
            <SelectContent>
              {priceOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Templates tabs */}
      <div className="mb-6">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="all">All Templates</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="newest">Newest</TabsTrigger>
            <TabsTrigger value="free">Free</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Templates grid */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <Link to={`/templates/${template.id}`} key={template.id}>
              <Card className="h-full overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-48 bg-muted overflow-hidden group">
                  <img
                    src={template.image}
                    alt={template.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105 duration-300"
                  />
                  <div className="absolute top-2 right-2">
                    <Badge variant={template.price === "Free" ? "secondary" : "default"}>
                      {template.price}
                    </Badge>
                  </div>
                </div>
                <CardHeader className="p-4">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{template.title}</CardTitle>
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-500 text-yellow-500 mr-1" />
                      <span className="text-sm font-medium">{template.rating}</span>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {template.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <div className="flex flex-wrap gap-1">
                    {template.tags.map((tag) => (
                      <span key={tag} className="text-xs bg-muted px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex justify-between">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Download className="h-4 w-4 mr-1" />
                    {template.downloads.toLocaleString()}
                  </div>
                  <Button size="sm" variant="secondary">View Details</Button>
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No templates found</h3>
          <p className="text-muted-foreground mb-6">Try adjusting your search or filter criteria</p>
          <Button variant="outline" onClick={() => {
            setSearchQuery("");
            setSelectedCategory("All");
            setSelectedPrice("All");
          }}>
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
