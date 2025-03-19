'use client';

import { useState, useEffect } from 'react';
import { Bell, Menu, X, User, LogOut } from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useAppStore } from '@/store';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TopBar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, setUser, notifications, sidebarOpen, setSidebarOpen } = useAppStore();

  useEffect(() => {
    async function getUserProfile() {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      
      if (authUser) {
        const { data, error } = await supabase
          .from('users')
          .select('id, email, full_name, role')
          .eq('id', authUser.id)
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
    }
    
    if (!user) {
      getUserProfile();
    }
  }, [user, setUser]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/auth/login');
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center md:hidden">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
            <div className="hidden md:ml-6 md:flex md:items-center space-x-4">
              <button
                onClick={toggleSidebar}
                className="p-1 rounded-md text-gray-500 hover:text-gray-700 hover:bg-gray-100 focus:outline-none"
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
              <span className="text-lg font-medium text-gray-800">Dashboard</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button
                type="button"
                className="p-1 rounded-full text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <span className="sr-only">Ver notificaciones</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 h-4 w-4 rounded-full bg-pink-500 text-white text-xs flex items-center justify-center">
                    {notifications > 9 ? '9+' : notifications}
                  </span>
                )}
              </button>
            </div>

            {/* User dropdown */}
            <div className="relative group">
              <div className="flex items-center cursor-pointer space-x-2 rounded-md p-2 hover:bg-gray-100">
                <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="h-5 w-5 text-gray-500" />
                </div>
                <span className="text-sm font-medium text-gray-700">
                  {user?.fullName || 'Usuario'}
                </span>
              </div>
              
              {/* Dropdown menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                <Link href="/settings/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Mi Perfil
                </Link>
                <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Configuración
                </Link>
                <button 
                  onClick={handleSignOut}
                  className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Cerrar Sesión
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on mobile menu state */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link
              href="/dashboard"
              className="bg-pink-50 text-pink-600 block pl-3 pr-4 py-2 text-base font-medium border-l-4 border-pink-500"
            >
              Dashboard
            </Link>
            <Link
              href="/finances"
              className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 block pl-3 pr-4 py-2 text-base font-medium"
            >
              Finanzas
            </Link>
            <Link
              href="/inventory"
              className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 block pl-3 pr-4 py-2 text-base font-medium"
            >
              Inventario
            </Link>
            <Link
              href="/sales"
              className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 block pl-3 pr-4 py-2 text-base font-medium"
            >
              Ventas
            </Link>
            <Link
              href="/reports"
              className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 block pl-3 pr-4 py-2 text-base font-medium"
            >
              Reportes
            </Link>
            <button
              onClick={handleSignOut}
              className="text-gray-600 hover:bg-gray-50 hover:text-gray-900 w-full text-left pl-3 pr-4 py-2 text-base font-medium flex items-center"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Cerrar Sesión
            </button>
          </div>
        </div>
      )}
    </header>
  );
}