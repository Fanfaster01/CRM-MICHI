'use client';

import { useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import TopBar from '@/components/layout/TopBar';
import { useAppStore } from '@/store';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { sidebarOpen, user, setUser } = useAppStore();
  const router = useRouter();

  // Verificar la sesión del usuario al cargar
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        router.push('/auth/login');
      } else if (!user) {
        // Si hay sesión pero no hay usuario en el estado, cargar el usuario
        const { data, error } = await supabase
          .from('users')
          .select('id, email, full_name, role')
          .eq('id', session.user.id)
          .single();
        
        if (data && !error) {
          setUser({
            id: data.id,
            email: data.email,
            fullName: data.full_name,
            role: data.role
          });
        }
      }
    };
    
    checkSession();
  }, [user, setUser, router]);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div 
        className={`flex-1 flex flex-col overflow-hidden transition-all duration-300 ease-in-out 
          ${sidebarOpen ? 'md:ml-64' : ''}`}
      >
        <TopBar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}