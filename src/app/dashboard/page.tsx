'use client';

import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { supabase } from '@/lib/supabase/client';
import StatCard from '@/components/dashboard/StatCard';
import RecentActivityCard from '@/components/dashboard/RecentActivityCard';
import OrderStatusCard from '@/components/dashboard/OrderStatusCard';

// Datos de ejemplo
const salesData = [
  { name: 'Lun', value: 2400 },
  { name: 'Mar', value: 1398 },
  { name: 'Mié', value: 9800 },
  { name: 'Jue', value: 3908 },
  { name: 'Vie', value: 4800 },
  { name: 'Sáb', value: 3800 },
  { name: 'Dom', value: 4300 },
];

const pieData = [
  { name: 'Comidas', value: 33 },
  { name: 'Bebidas', value: 55 },
  { name: 'Postres', value: 12 },
];

const COLORS = ['#6366F1', '#EC4899', '#F59E0B', '#10B981'];

export default function DashboardPage() {
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUserData() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        
        if (user) {
          const { data, error } = await supabase
            .from('users')
            .select('full_name')
            .eq('id', user.id)
            .single();
          
          if (data && !error) {
            setUserName(data.full_name);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setIsLoading(false);
      }
    }
    
    getUserData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Bienvenido, {userName || 'Usuario'}
        </h1>
        <p className="text-gray-600">Aquí tienes un resumen de tu negocio</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Main Stats */}
        <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-3">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800">$3468.96</h2>
              <p className="text-sm text-gray-500">Ingresos este mes</p>
            </div>
            <div className="space-x-2">
              <button className="px-3 py-1 bg-gray-100 rounded-md text-sm">Diario</button>
              <button className="px-3 py-1 bg-gray-100 rounded-md text-sm">Semanal</button>
              <button className="px-3 py-1 bg-pink-500 text-white rounded-md text-sm">Mensual</button>
              <button className="px-3 py-1 bg-gray-100 rounded-md text-sm">Anual</button>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#EC4899" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4">
            <button className="px-4 py-2 bg-pink-500 text-white rounded-md text-sm">Ver detalles</button>
          </div>
        </div>

        {/* Traffic Distribution */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-md font-semibold mb-6">Distribución de Ventas</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-6">
            <div className="text-center">
              <p className="text-xl font-bold text-indigo-600">33<span className="text-sm">%</span></p>
              <p className="text-xs text-gray-500">Comidas</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-pink-500">55<span className="text-sm">%</span></p>
              <p className="text-xs text-gray-500">Bebidas</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-amber-500">12<span className="text-sm">%</span></p>
              <p className="text-xs text-gray-500">Postres</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <StatCard 
          title="Ingresos Totales" 
          value="$3,468" 
          change="+2.5%" 
          isPositive={true} 
          color="bg-pink-500" 
        />
        <StatCard 
          title="Órdenes" 
          value="82" 
          change="+1.2%" 
          isPositive={true} 
          color="bg-indigo-500" 
        />
        <StatCard 
          title="Ticket Promedio" 
          value="$42.3" 
          change="+3.1%" 
          isPositive={true} 
          color="bg-blue-400" 
        />
        <StatCard 
          title="Nuevos Clientes" 
          value="12" 
          change="-0.5%" 
          isPositive={false} 
          color="bg-amber-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivityCard />
        <OrderStatusCard />
      </div>
    </div>
  );
}