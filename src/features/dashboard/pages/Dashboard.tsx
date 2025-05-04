
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
import { useIsMobile } from "@/hooks/use-mobile";

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
  const isMobile = useIsMobile();
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground text-sm sm:text-base">
          Overview of your website statistics and performance.
        </p>
      </div>

      {/* Stats Cards - Optimized for mobile */}
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Eye className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium leading-none">Kunjungan</p>
                  <p className="text-lg sm:text-2xl font-bold">24,563</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-green-500 text-xs sm:text-sm">
                <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>+12.5%</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium leading-none">Artikel</p>
                  <p className="text-lg sm:text-2xl font-bold">18</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm">
                <span className="text-muted-foreground">2 jam lalu</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Layers className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium leading-none">Template</p>
                  <p className="text-lg sm:text-2xl font-bold">12</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm">
                <span className="text-muted-foreground">4 premium</span>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-full">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-medium leading-none">Pengguna</p>
                  <p className="text-lg sm:text-2xl font-bold">1,254</p>
                </div>
              </div>
              <div className="flex items-center space-x-1 text-green-500 text-xs sm:text-sm">
                <UserPlus className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>+3.2%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts - Responsive for mobile */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-1 pt-4">
            <CardTitle className="text-sm sm:text-base font-medium">
              Lalu Lintas Pengunjung
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[180px] sm:h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 5, right: 5, left: -15, bottom: 5 }}>
                  <XAxis dataKey="name" tick={{ fontSize: isMobile ? 10 : 12 }} />
                  <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} width={isMobile ? 25 : 35} />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip contentStyle={{ fontSize: isMobile ? '12px' : '14px' }} />
                  <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-0 pt-4">
            <CardTitle className="text-sm sm:text-base font-medium">
              Aktivitas Terbaru
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mt-2">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="flex items-start gap-3 pb-3 last:pb-0 last:mb-0 border-b last:border-0">
                  <div className="p-1.5 bg-muted rounded-full">
                    <Activity className="h-3 w-3 sm:h-4 sm:w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-xs sm:text-sm font-medium leading-none">
                      {item === 1 && "Artikel baru dipublikasikan"}
                      {item === 2 && "Download template mencapai 500"}
                      {item === 3 && "Pendaftaran pengguna baru"}
                      {item === 4 && "Update sistem selesai"}
                    </p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground">
                      {item === 1 && "2 menit yang lalu"}
                      {item === 2 && "3 jam yang lalu"}
                      {item === 3 && "Kemarin"}
                      {item === 4 && "2 hari yang lalu"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Quick Actions - Mobile Optimized */}
      <Card>
        <CardHeader className="pb-2 pt-4">
          <CardTitle className="text-sm sm:text-base font-medium">
            Aksi Cepat
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <Card className="border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-3 text-center flex flex-col items-center justify-center space-y-1">
              <FileText className="h-6 w-6 text-muted-foreground" />
              <p className="text-xs sm:text-sm font-medium">Artikel Baru</p>
            </CardContent>
          </Card>
          
          <Card className="border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-3 text-center flex flex-col items-center justify-center space-y-1">
              <Layers className="h-6 w-6 text-muted-foreground" />
              <p className="text-xs sm:text-sm font-medium">Tambah Template</p>
            </CardContent>
          </Card>
          
          <Card className="border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-3 text-center flex flex-col items-center justify-center space-y-1">
              <Users className="h-6 w-6 text-muted-foreground" />
              <p className="text-xs sm:text-sm font-medium">Kelola User</p>
            </CardContent>
          </Card>
          
          <Card className="border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
            <CardContent className="p-3 text-center flex flex-col items-center justify-center space-y-1">
              <Activity className="h-6 w-6 text-muted-foreground" />
              <p className="text-xs sm:text-sm font-medium">Lihat Analitik</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>

      {/* Supabase Integration Guide */}
      <Card className="border-primary/20 bg-primary/5">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm sm:text-base font-medium flex items-center gap-2">
            <div className="p-1 bg-primary/20 rounded-full">
              <Activity className="h-4 w-4 text-primary" />
            </div>
            Panduan Integrasi Supabase
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs sm:text-sm space-y-2">
          <p>
            Klien Supabase sudah terkonfigurasi di project ini. Anda dapat mulai menggunakannya dengan mengimpor:
          </p>
          <pre className="p-2 bg-muted rounded-md text-[10px] sm:text-xs overflow-x-auto whitespace-pre-wrap">
            import {"{ supabase }"} from "@/integrations/supabase/client";
          </pre>
          <p className="font-medium pt-1">Contoh penggunaan dasar:</p>
          <pre className="p-2 bg-muted rounded-md text-[10px] sm:text-xs overflow-x-auto whitespace-pre-wrap">
{`// Mengambil data
const { data, error } = await supabase
  .from('table_name')
  .select('*');

// Menambah data
const { data, error } = await supabase
  .from('table_name')
  .insert([{ column: 'value' }]);

// Autentikasi
const { data, error } = await supabase.auth
  .signInWithPassword({
    email: 'email@example.com',
    password: 'password'
  });`}
          </pre>
          <p className="text-muted-foreground pt-1">
            Lihat dokumentasi lengkap di <a href="https://supabase.com/docs" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">supabase.com/docs</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
