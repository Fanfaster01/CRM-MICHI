'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarDays,
  BarChart3,
  ShoppingBag,
  Users,
  Receipt,
  Settings,
  Home,
  DollarSign,
  LogOut,
  ChefHat,
  Package,
  LayoutDashboard,
} from 'lucide-react';
import { supabase } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store';

interface NavItem {
  name: string;
  href: string;
  icon: React.ElementType;
}

const mainNav: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Finanzas', href: '/finances', icon: DollarSign },
  { name: 'Inventario', href: '/inventory', icon: Package },
  { name: 'Ventas', href: '/sales', icon: Receipt },
  { name: 'Compras', href: '/purchases', icon: ShoppingBag },
  { name: 'Personal', href: '/staff', icon: ChefHat },
  { name: 'Clientes', href: '/customers', icon: Users },
  { name: 'Reportes', href: '/reports', icon: BarChart3 },
];

const secondaryNav: NavItem[] = [
  { name: 'Configuración', href: '/settings', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarOpen, setUser } = useAppStore();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push('/auth/login');
  };

  // Función para determinar si un enlace está activo
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  return (
    <>
      {/* Sidebar para escritorio - con estado que cambia según sidebarOpen */}
      <div className={`${sidebarOpen ? 'md:flex' : 'hidden'} md:w-64 md:flex-col md:fixed md:inset-y-0 transition-all duration-300 ease-in-out z-10`}>
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-gray-200">
            <div className="h-8 w-8 rounded-full bg-pink-500 flex items-center justify-center text-white font-bold">
              M
            </div>
            <span className="ml-2 text-xl font-medium text-gray-800">CRM Michi</span>
          </div>
          <div className="flex-1 flex flex-col overflow-y-auto pt-5 pb-4">
            <nav className="flex-1 px-2 space-y-1">
              {mainNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      active
                        ? 'bg-pink-50 text-pink-600'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    <item.icon
                      className={`mr-3 flex-shrink-0 h-5 w-5 ${
                        active ? 'text-pink-500' : 'text-gray-400 group-hover:text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
            <div className="border-t border-gray-200 pt-4">
              <nav className="px-2 space-y-1">
                {secondaryNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                        active
                          ? 'bg-pink-50 text-pink-600'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <item.icon
                        className={`mr-3 flex-shrink-0 h-5 w-5 ${
                          active ? 'text-pink-500' : 'text-gray-400 group-hover:text-gray-500'
                        }`}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  );
                })}
                <button
                  onClick={handleSignOut}
                  className="w-full group flex items-center px-2 py-2 text-sm font-medium rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                >
                  <LogOut className="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                  Cerrar Sesión
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}