
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

// Contoh tipe data profile
type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  avatar_url: string | null;
};

export function SupabaseExample() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Contoh fungsi untuk mengambil data dari Supabase
  async function fetchProfiles() {
    try {
      setLoading(true);
      
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(5);
        
      if (error) {
        throw error;
      }
      
      if (data) {
        setProfiles(data);
      }
    } catch (error) {
      console.error('Error mengambil profiles:', error);
      toast.error('Gagal mengambil data profil');
    } finally {
      setLoading(false);
    }
  }
  
  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm sm:text-base font-medium">
          Integrasi Supabase
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-xs sm:text-sm">
          {loading ? (
            <div className="flex items-center justify-center h-20">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : profiles.length > 0 ? (
            <div className="space-y-2">
              <p className="font-medium">Data Profil:</p>
              <div className="border rounded-md divide-y">
                {profiles.map((profile) => (
                  <div key={profile.id} className="p-2 text-[10px] sm:text-xs">
                    <p><span className="font-medium">ID:</span> {profile.id}</p>
                    <p><span className="font-medium">Nama:</span> {profile.first_name} {profile.last_name}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-muted-foreground">Tidak ada data profil ditemukan. Pastikan table 'profiles' ada di Supabase dan berisi data.</p>
          )}
        </div>
        
        <div className="flex flex-col space-y-2 text-xs sm:text-sm">
          <p className="font-medium">Contoh kode integrasi Supabase:</p>
          <pre className="p-2 bg-muted rounded-md text-[10px] sm:text-xs overflow-x-auto whitespace-pre-wrap">
{`// Impor client Supabase
import { supabase } from "@/integrations/supabase/client";

// Mengambil data
const { data, error } = await supabase
  .from('table_name')
  .select('*');

// Auth: Login
const { data, error } = await supabase.auth
  .signInWithPassword({
    email: 'user@example.com',
    password: 'password123'
  });

// Auth: Registrasi
const { data, error } = await supabase.auth
  .signUp({
    email: 'user@example.com',
    password: 'password123'
  });

// Auth: Logout
await supabase.auth.signOut();`}
          </pre>
        </div>
        
        <div className="flex justify-end">
          <Button 
            size="sm" 
            onClick={fetchProfiles}
            disabled={loading}
          >
            {loading ? 'Mengambil...' : 'Refresh Data'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
