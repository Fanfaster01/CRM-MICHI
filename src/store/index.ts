import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// Definir el tipo para el usuario
interface User {
  id: string;
  email: string;
  fullName: string;
  role: string;
}

// Definir el tipo para el estado global
interface AppState {
  // Usuario actual
  user: User | null;
  setUser: (user: User | null) => void;
  
  // Estado de la UI
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  
  // Restaurante seleccionado (si el usuario gestiona múltiples)
  selectedRestaurantId: string | null;
  setSelectedRestaurantId: (id: string | null) => void;
  
  // Tema de la aplicación
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  
  // Notificaciones
  notifications: number;
  setNotifications: (count: number) => void;
  clearNotifications: () => void;
  
  // Modo de demo (para mostrar datos de ejemplo)
  isDemoMode: boolean;
  toggleDemoMode: () => void;
}

// Crear el store
export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Usuario
      user: null,
      setUser: (user) => set({ user }),
      
      // UI
      sidebarOpen: true,
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      
      // Restaurante
      selectedRestaurantId: null,
      setSelectedRestaurantId: (id) => set({ selectedRestaurantId: id }),
      
      // Tema
      theme: 'light',
      setTheme: (theme) => set({ theme }),
      
      // Notificaciones
      notifications: 0,
      setNotifications: (count) => set({ notifications: count }),
      clearNotifications: () => set({ notifications: 0 }),
      
      // Modo demo
      isDemoMode: true, // Iniciamos en modo demo para facilitar el desarrollo
      toggleDemoMode: () => set((state) => ({ isDemoMode: !state.isDemoMode })),
    }),
    {
      name: 'crm-michi-storage',
      partialize: (state) => ({
        user: state.user,
        theme: state.theme,
        selectedRestaurantId: state.selectedRestaurantId,
        isDemoMode: state.isDemoMode,
      }),
    }
  )
);

// Hook para acceder al usuario actual
export function useCurrentUser() {
  return useAppStore((state) => state.user);
}

// Hook para acceder al restaurante seleccionado
export function useSelectedRestaurant() {
  return useAppStore((state) => state.selectedRestaurantId);
}

// Hook para acceder al tema
export function useAppTheme() {
  return useAppStore((state) => state.theme);
}

// Hook para acceder al modo demo
export function useDemoMode() {
  return useAppStore((state) => state.isDemoMode);
}