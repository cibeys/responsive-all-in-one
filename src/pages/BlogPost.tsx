
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  Copy,
  ArrowLeft,
  Tag,
  Share2
} from "lucide-react";
import { toast } from "sonner";

// Mock blog post data - in a real app, you would fetch this from an API
const blogPost = {
  id: "1",
  title: "Getting Started with AllInOne Platform",
  content: `
## Introduction

The AllInOne platform is a comprehensive solution for businesses and developers looking to create, manage, and scale their online presence. In this guide, we'll walk you through the initial setup and configuration process.

### Prerequisites

Before you begin, make sure you have the following:

- An active AllInOne account
- Basic familiarity with web technologies
- A clear idea of your project requirements

## Setting Up Your Account

Creating your account is the first step toward building your online presence with AllInOne. During registration, you'll be asked to provide some basic information to help us tailor the experience to your needs.

### Step 1: Register

Visit the AllInOne registration page and enter your email address. You'll receive a verification link to complete the registration process.

### Step 2: Profile Setup

Once verified, you'll need to set up your profile:

- Add your organization's details
- Select your industry
- Configure your preferred settings

## Installing the Platform

After setting up your account, you'll need to install the platform. Here's how:

\`\`\`bash
# Create a new project
npm create allinone@latest my-project

# Navigate to the project directory
cd my-project

# Install dependencies
npm install
\`\`\`

### Configuration

Next, you'll need to update the configuration file:

\`\`\`javascript
// config.js
module.exports = {
  site: {
    title: 'My AllInOne Site',
    description: 'A comprehensive web solution built with AllInOne',
    theme: 'default'
  },
  api: {
    endpoint: process.env.API_ENDPOINT || 'https://api.allinone.example',
    key: process.env.API_KEY
  }
}
\`\`\`

## Creating Your First Blog Post

Now let's create your first blog post using the AllInOne platform:

1. Navigate to the Admin Dashboard
2. Click on "Blog" in the sidebar
3. Click "New Post"
4. Fill in the title, content, and metadata
5. Add images and format your content
6. Click "Publish" or save as draft

## Working with Templates

Templates are an essential part of the AllInOne platform. They allow you to quickly create beautiful pages without starting from scratch.

Here's an example of using a template:

\`\`\`jsx
import { LandingTemplate } from '@allinone/templates';

function MyLandingPage() {
  return (
    <LandingTemplate
      hero={{
        title: "Welcome to My Site",
        description: "Built with the powerful AllInOne platform."
      }}
      features={[
        { title: "Feature 1", description: "Amazing feature" },
        { title: "Feature 2", description: "Another great feature" }
      ]}
    />
  );
}
\`\`\`

## Conclusion

You've now learned the basics of setting up and using the AllInOne platform. As you continue to explore, you'll discover more powerful features to help you build and grow your online presence.

For more detailed information, check out our comprehensive documentation or reach out to our support team if you have any questions.
  `,
  author: "Admin Team",
  date: "May 1, 2024",
  readTime: "5 min read",
  category: "Tutorials",
  tags: ["Getting Started", "Tutorial", "Configuration"],
  image: "/placeholder.svg",
  relatedPosts: [
    {
      id: "2",
      title: "10 Tips for Creating Engaging Blog Content",
      excerpt: "Discover strategies to create blog content that resonates with your audience and drives engagement.",
      category: "Content Marketing",
      slug: "content-tips",
      image: "/placeholder.svg",
    },
    {
      id: "3",
      title: "Optimizing Your Website for Mobile Devices",
      excerpt: "Mobile optimization strategies to ensure your website provides an excellent experience on all devices.",
      category: "Web Development",
      slug: "mobile-optimization",
      image: "/placeholder.svg",
    },
  ],
};

export default function BlogPostPage() {
  const { slug } = useParams();
  
  // In a real app, you would fetch the blog post data based on the slug
  // For now, we'll just use our mock data
  
  const copyCodeToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    toast.success("Code copied to clipboard");
  };

  // Function to render markdown-like content with code blocks
  const renderContent = (content: string) => {
    // Split the content by code blocks
    const parts = content.split("```");
    
    return (
      <>
        {parts.map((part, index) => {
          // Even indices are regular text
          if (index % 2 === 0) {
            return (
              <div key={index} className="prose prose-slate dark:prose-invert max-w-none">
                {/* Replace markdown headings */}
                {part
                  .replace(/## (.*)/g, (_, heading) => `<h2 class="text-2xl font-bold mt-8 mb-4">${heading}</h2>`)
                  .replace(/### (.*)/g, (_, heading) => `<h3 class="text-xl font-bold mt-6 mb-3">${heading}</h3>`)
                  .replace(/\*\*(.*)\*\*/g, (_, text) => `<strong>${text}</strong>`)
                  .replace(/\n/g, '<br />')
                  .split('<br />').map((line, i) => <p key={i} dangerouslySetInnerHTML={{ __html: line }} />)
                }
              </div>
            );
          }
          
          // Odd indices are code blocks
          const [language, ...codeLines] = part.split("\n");
          const code = codeLines.join("\n");
          
          return (
            <div key={index} className="my-6">
              <div className="code-header">
                <span>{language}</span>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => copyCodeToClipboard(code)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
              <pre>
                <code>{code}</code>
              </pre>
            </div>
          );
        })}
      </>
    );
  };

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" size="sm" asChild className="mb-4">
          <Link to="/blog">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
        </Button>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full">
            {blogPost.category}
          </span>
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{blogPost.title}</h1>
        
        <div className="flex flex-col sm:flex-row sm:items-center gap-y-2 gap-x-6 text-muted-foreground mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-2">
              <span className="text-xs">A</span>
            </div>
            <span>{blogPost.author}</span>
          </div>
          
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2" />
            <span>{blogPost.date}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-2" />
            <span>{blogPost.readTime}</span>
          </div>
        </div>
        
        <div className="h-[240px] md:h-[400px] bg-muted rounded-lg overflow-hidden mb-8">
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      
      {/* Blog content */}
      <div className="mb-8">
        {renderContent(blogPost.content)}
      </div>
      
      {/* Tags and sharing */}
      <div className="border-t border-b py-4 my-8 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex items-center gap-2 flex-wrap">
          <Tag className="h-4 w-4 text-muted-foreground" />
          {blogPost.tags.map((tag) => (
            <span 
              key={tag} 
              className="text-sm bg-muted px-2 py-1 rounded-full hover:bg-muted/70 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>
        
        <Button variant="outline" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Share this post
        </Button>
      </div>
      
      {/* Related posts */}
      {blogPost.relatedPosts && blogPost.relatedPosts.length > 0 && (
        <div className="my-12">
          <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPost.relatedPosts.map((post) => (
              <Link to={`/blog/${post.slug}`} key={post.id}>
                <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                  <div className="h-48 bg-muted">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs bg-muted px-2 py-1 rounded-full">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                    <p className="text-muted-foreground line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
