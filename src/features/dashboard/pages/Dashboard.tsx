
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Activity,
  Eye,
  FileText,
  Layers,
  TrendingUp,
  UserPlus,
  Users
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
  { name: "Apr", value: 700 },
  { name: "May", value: 600 },
  { name: "Jun", value: 800 },
  { name: "Jul", value: 900 },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your website statistics and performance.
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Total Visits</p>
                  <p className="text-2xl font-bold">24,563</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-green-500 text-sm">
                <TrendingUp className="h-4 w-4" />
                <span>+12.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <FileText className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Blog Posts</p>
                  <p className="text-2xl font-bold">18</p>
                </div>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Last added 2h ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Layers className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Templates</p>
                  <p className="text-2xl font-bold">12</p>
                </div>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">4 premium</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between space-x-4">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">Users</p>
                  <p className="text-2xl font-bold">1,254</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-green-500 text-sm">
                <UserPlus className="h-4 w-4" />
                <span>+3.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-medium">
              Visitor Traffic
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] sm:h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-0">
            <CardTitle className="text-base font-medium">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 mt-4">
              {[1, 2, 3, 4, 5].map((item) => (
                <div key={item} className="flex items-start gap-4 pb-4 last:pb-0 last:mb-0 border-b last:border-0">
                  <div className="p-2 bg-muted rounded-full">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {item === 1 && "New blog post published"}
                      {item === 2 && "Template downloads reached 500"}
                      {item === 3 && "New user registration"}
                      {item === 4 && "System update completed"}
                      {item === 5 && "Database backup successful"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {item === 1 && "2 minutes ago"}
                      {item === 2 && "3 hours ago"}
                      {item === 3 && "Yesterday"}
                      {item === 4 && "2 days ago"}
                      {item === 5 && "1 week ago"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card className="border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 text-center flex flex-col items-center justify-center space-y-2">
              <FileText className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">New Blog Post</p>
            </CardContent>
          </Card>
          
          <Card className="border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 text-center flex flex-col items-center justify-center space-y-2">
              <Layers className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">Add Template</p>
            </CardContent>
          </Card>
          
          <Card className="border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 text-center flex flex-col items-center justify-center space-y-2">
              <Users className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">Manage Users</p>
            </CardContent>
          </Card>
          
          <Card className="border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-4 text-center flex flex-col items-center justify-center space-y-2">
              <Activity className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm font-medium">View Analytics</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
}
