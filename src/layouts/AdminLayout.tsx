
import { useState, useEffect } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/features/auth/providers/AuthProvider";
import { useTheme } from "@/features/theme/providers/ThemeProvider";
import { Button } from "@/components/ui/button";
import { 
  SidebarProvider, 
  Sidebar, 
  SidebarContent, 
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup
} from "@/components/ui/sidebar";
import { toast } from "sonner";
import {
  LayoutDashboard,
  FileText,
  Layers,
  Settings,
  LogOut,
  Sun,
  Moon,
  Menu,
  User,
  Bell,
  ChevronRight
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);
  const [notifications, setNotifications] = useState<{ id: string; title: string; message: string }[]>([]);

  useEffect(() => {
    setIsMounted(true);
    // Mock notifications for demo purposes
    setNotifications([
      { id: '1', title: 'New user registered', message: 'A new user has registered on your platform' },
      { id: '2', title: 'System update', message: 'System will be updated tonight at 2 AM' }
    ]);
  }, []);

  useEffect(() => {
    if (isMounted && !user) {
      navigate("/auth/login", { replace: true });
    }
  }, [isMounted, user, navigate]);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/auth/login");
  };

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Blog", href: "/admin/blog", icon: FileText },
    { name: "Templates", href: "/admin/templates", icon: Layers },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  const isLinkActive = (path: string) => {
    if (path === "/admin" && location.pathname === "/admin") {
      return true;
    }
    return path !== "/admin" && location.pathname.startsWith(path);
  };

  // Get current page title for breadcrumb
  const getCurrentPageInfo = () => {
    const currentPath = location.pathname;
    
    const segments = currentPath.split('/').filter(Boolean);
    const breadcrumbs = [];
    
    // Add Admin root
    breadcrumbs.push({
      name: "Admin",
      href: "/admin",
      current: segments.length === 1
    });
    
    // Get active section
    const activeItem = navigation.find(item => 
      item.href !== "/admin" && currentPath.startsWith(item.href)
    );

    if (activeItem) {
      breadcrumbs.push({
        name: activeItem.name,
        href: activeItem.href,
        current: segments.length === 2
      });
      
      // Add sub-section if any
      if (segments.length > 2) {
        const lastSegment = segments[segments.length - 1];
        const isNew = lastSegment === "new";
        const isEdit = lastSegment !== "new" && segments[segments.length - 2] === "edit";
        
        if (isNew) {
          breadcrumbs.push({
            name: `New ${activeItem.name.slice(0, -1)}`,
            href: `${activeItem.href}/new`,
            current: true
          });
        } else if (isEdit) {
          breadcrumbs.push({
            name: `Edit ${activeItem.name.slice(0, -1)}`,
            href: currentPath,
            current: true
          });
        }
      }
    }
    
    return { 
      breadcrumbs, 
      pageTitle: breadcrumbs[breadcrumbs.length - 1]?.name || "Admin"
    };
  };
  
  const { breadcrumbs, pageTitle } = getCurrentPageInfo();

  if (!isMounted || !user) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <Sidebar className="border-r">
          <SidebarHeader>
            <Link to="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center">
                <span className="text-white font-bold">A1</span>
              </div>
              <span className="font-bold text-xl">Admin</span>
            </Link>
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup>
              <SidebarMenu>
                {navigation.map((item) => (
                  <SidebarMenuItem key={item.name}>
                    <SidebarMenuButton asChild>
                      <Link to={item.href} className={`flex items-center gap-3 ${isLinkActive(item.href) ? 'font-medium text-primary' : ''}`}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton onClick={handleLogout} className="flex items-center gap-3 text-destructive hover:text-destructive">
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarFooter>
        </Sidebar>

        <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
          {/* Header */}
          <header className="h-16 border-b bg-background flex items-center px-4">
            <div className="flex-1 flex items-center">
              <SidebarTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SidebarTrigger>
              
              <nav className="ml-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    {breadcrumbs.map((crumb, index) => (
                      <BreadcrumbItem key={crumb.href}>
                        <BreadcrumbLink 
                          href={crumb.href} 
                          className={crumb.current ? "font-semibold" : ""}
                        >
                          {crumb.name}
                        </BreadcrumbLink>
                        {index < breadcrumbs.length - 1 && (
                          <BreadcrumbSeparator>
                            <ChevronRight className="h-4 w-4" />
                          </BreadcrumbSeparator>
                        )}
                      </BreadcrumbItem>
                    ))}
                  </BreadcrumbList>
                </Breadcrumb>
              </nav>
            </div>
            
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative">
                    <Bell className="h-5 w-5" />
                    {notifications.length > 0 && (
                      <span className="absolute top-1 right-1 flex h-3 w-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {notifications.length > 0 ? (
                    notifications.map(notification => (
                      <DropdownMenuItem key={notification.id} className="cursor-pointer">
                        <div className="flex flex-col">
                          <span className="font-medium">{notification.title}</span>
                          <span className="text-sm text-muted-foreground">{notification.message}</span>
                        </div>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="text-center py-4">
                      <p className="text-sm text-muted-foreground">No new notifications</p>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg" alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/admin/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="flex cursor-pointer items-center text-destructive focus:text-destructive"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          {/* Main content */}
          <main className="flex-1 overflow-auto">
            <div className="container py-6">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
