'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';

const monthlyData = [
  { name: 'Ene', ingresos: 4000, gastos: 2400, ganancias: 1600 },
  { name: 'Feb', ingresos: 3000, gastos: 1398, ganancias: 1602 },
  { name: 'Mar', ingresos: 2000, gastos: 1800, ganancias: 200 },
  { name: 'Abr', ingresos: 2780, gastos: 2108, ganancias: 672 },
  { name: 'May', ingresos: 1890, gastos: 1800, ganancias: 90 },
  { name: 'Jun', ingresos: 2390, gastos: 1800, ganancias: 590 },
  { name: 'Jul', ingresos: 3490, gastos: 2300, ganancias: 1190 },
  { name: 'Ago', ingresos: 3490, gastos: 2300, ganancias: 1190 },
  { name: 'Sep', ingresos: 3490, gastos: 2300, ganancias: 1190 },
  { name: 'Oct', ingresos: 3490, gastos: 2300, ganancias: 1190 },
  { name: 'Nov', ingresos: 3490, gastos: 2300, ganancias: 1190 },
  { name: 'Dic', ingresos: 3490, gastos: 2300, ganancias: 1190 },
];

const expenseCategories = [
  { name: 'Ingredientes', value: 35 },
  { name: 'Personal', value: 25 },
  { name: 'Alquiler', value: 15 },
  { name: 'Servicios', value: 10 },
  { name: 'Marketing', value: 8 },
  { name: 'Otros', value: 7 },
];

export default function FinancesPage() {
  return (
    <div>
      {/* Financial Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Ingresos Mensuales</h3>
          <p className="text-2xl font-bold text-gray-800">$24,560</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-500 mr-1">↑ 12%</span>
            <span className="text-gray-500">vs mes anterior</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Gastos Mensuales</h3>
          <p className="text-2xl font-bold text-gray-800">$18,230</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-red-500 mr-1">↑ 8%</span>
            <span className="text-gray-500">vs mes anterior</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Ganancias Netas</h3>
          <p className="text-2xl font-bold text-gray-800">$6,330</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-500 mr-1">↑ 18%</span>
            <span className="text-gray-500">vs mes anterior</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 mb-1">Margen de Ganancia</h3>
          <p className="text-2xl font-bold text-gray-800">25.8%</p>
          <div className="mt-2 flex items-center text-sm">
            <span className="text-green-500 mr-1">↑ 3%</span>
            <span className="text-gray-500">vs mes anterior</span>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Monthly Income vs Expenses Chart */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-md font-semibold mb-4">Ingresos vs Gastos</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ingresos" stroke="#10B981" strokeWidth={2} />
                <Line type="monotone" dataKey="gastos" stroke="#EF4444" strokeWidth={2} />
                <Line type="monotone" dataKey="ganancias" stroke="#6366F1" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Expense Categories */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-md font-semibold mb-4">Categorías de Gastos</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={expenseCategories}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="value" fill="#EC4899" barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      {/* Recent Transactions */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-md font-semibold">Transacciones Recientes</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Fecha
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Descripción
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Monto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  12 Mar 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Compra de ingredientes
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Ingredientes
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                  -$1,240.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completado
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  11 Mar 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Ventas diarias
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Ventas
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  +$3,580.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completado
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  10 Mar 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Pago de salarios
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Personal
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                  -$4,500.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completado
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  09 Mar 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Pago de servicios
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Servicios
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600">
                  -$780.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completado
                  </span>
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  08 Mar 2025
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Ventas diarias
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Ventas
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600">
                  +$3,210.00
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                    Completado
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button className="text-sm text-pink-600 hover:text-pink-800">
            Ver todas las transacciones
          </button>
        </div>
      </div>
    </div>
  );
}