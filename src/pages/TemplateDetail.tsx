
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Star,
  Download,
  Eye,
  Code,
  FileText,
  CheckCircle,
  XCircle,
  ExternalLink
} from "lucide-react";

// Mock template data
const template = {
  id: "1",
  title: "Business Landing",
  description: "Professional landing page for businesses with hero section, features, pricing, and contact form.",
  longDescription: "This comprehensive business landing page template includes everything you need to showcase your company or product. With a clean, modern design and fully responsive layout, it's perfect for businesses of all sizes looking to establish or improve their online presence. The template includes multiple sections that can be easily customized to highlight your specific offerings.",
  category: "Landing Page",
  rating: 4.9,
  reviews: 124,
  price: "Free",
  image: "/placeholder.svg",
  screenshots: [
    "/placeholder.svg",
    "/placeholder.svg",
    "/placeholder.svg",
  ],
  downloads: 2500,
  tags: ["Business", "Marketing", "Landing"],
  lastUpdated: "April 15, 2024",
  author: "AllInOne Team",
  features: [
    "Fully responsive design",
    "Clean and modern interface",
    "SEO optimized",
    "Cross-browser compatible",
    "Easy to customize",
    "Well-documented code",
    "Regular updates",
    "Premium support"
  ],
  compatibleWith: [
    "React 18+",
    "Next.js 13+",
    "Tailwind CSS 3",
    "TypeScript 5",
  ],
  notCompatibleWith: [
    "Vanilla JavaScript",
    "Older browsers (IE11 and below)",
  ],
  demoUrl: "https://example.com/demo",
  sourceCodeSize: "2.4 MB",
};

export default function TemplateDetailPage() {
  const { id } = useParams();
  
  // In a real app, you would fetch the template data based on the id
  // For now, we'll just use our mock data
  
  // Function to render star rating
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star key={`full-${i}`} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
      );
    }
    
    // Half star
    if (hasHalfStar) {
      stars.push(
        <Star key="half" className="h-4 w-4 fill-yellow-500 text-yellow-500" />
      );
    }
    
    // Empty stars
    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Star key={`empty-${i}`} className="h-4 w-4 text-gray-300" />
      );
    }
    
    return stars;
  };

  return (
    <div className="container py-8 max-w-7xl">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/templates">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Templates
          </Link>
        </Button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left side - Template info */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">{template.category}</Badge>
                  <Badge variant={template.price === "Free" ? "secondary" : "default"}>
                    {template.price}
                  </Badge>
                </div>
                <h1 className="text-3xl font-bold mb-2">{template.title}</h1>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>By {template.author}</span>
                  <span>•</span>
                  <span>Updated {template.lastUpdated}</span>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center justify-end mb-1">
                  {renderStars(template.rating)}
                  <span className="ml-2 font-medium">{template.rating}</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  {template.reviews} reviews
                </div>
              </div>
            </div>
            
            {/* Main image */}
            <div className="h-[300px] md:h-[400px] bg-muted rounded-lg overflow-hidden">
              <img
                src={template.image}
                alt={template.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Tabs */}
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="features">Features</TabsTrigger>
                <TabsTrigger value="compatibility">Compatibility</TabsTrigger>
              </TabsList>
              
              <TabsContent value="details" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Description</h2>
                  <p className="text-muted-foreground">{template.longDescription}</p>
                </div>
                
                {/* Screenshots */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">Screenshots</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {template.screenshots.map((screenshot, index) => (
                      <div key={index} className="h-40 bg-muted rounded overflow-hidden">
                        <img
                          src={screenshot}
                          alt={`Screenshot ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Tags */}
                <div>
                  <h2 className="text-xl font-semibold mb-3">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {template.tags.map((tag) => (
                      <Badge variant="outline" key={tag}>
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Features</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {template.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
              
              <TabsContent value="compatibility" className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Compatible With</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {template.compatibleWith.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Not Compatible With</h2>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {template.notCompatibleWith.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <XCircle className="h-5 w-5 text-red-500 mr-2" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Right side - Call to Action */}
        <div className="lg:col-span-1">
          <div className="sticky top-8 space-y-6">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Price</span>
                  <span className="text-xl font-bold">{template.price}</span>
                </div>
                
                <Button className="w-full" size="lg">
                  <Download className="mr-2 h-4 w-4" /> Download Template
                </Button>
                
                <Button variant="outline" className="w-full" asChild>
                  <a href={template.demoUrl} target="_blank" rel="noopener noreferrer">
                    <Eye className="mr-2 h-4 w-4" /> Live Preview
                  </a>
                </Button>
                
                <div className="pt-4 border-t">
                  <h3 className="font-medium mb-3">Template Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">File size</span>
                      <span>{template.sourceCodeSize}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Downloads</span>
                      <span>{template.downloads.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Last updated</span>
                      <span>{template.lastUpdated}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category</span>
                      <span>{template.category}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-medium mb-3">Additional Resources</h3>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="#">
                      <FileText className="mr-2 h-4 w-4" /> Documentation
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <Link to="#">
                      <Code className="mr-2 h-4 w-4" /> Source Files
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full justify-start" asChild>
                    <a href="#" target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Support
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
