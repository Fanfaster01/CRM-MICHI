'use client';

import { useState } from 'react';
import { Plus, Filter, Search, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

// Datos de ejemplo
const inventoryItems = [
  {
    id: 1,
    name: 'Arroz',
    category: 'Granos',
    currentStock: 25,
    unit: 'kg',
    minStock: 10,
    costPrice: 2.5,
    lastUpdated: '2025-03-15',
    status: 'Normal'
  },
  {
    id: 2,
    name: 'Tomates',
    category: 'Verduras',
    currentStock: 8,
    unit: 'kg',
    minStock: 15,
    costPrice: 3.2,
    lastUpdated: '2025-03-16',
    status: 'Bajo'
  },
  {
    id: 3,
    name: 'Pollo',
    category: 'Carnes',
    currentStock: 30,
    unit: 'kg',
    minStock: 20,
    costPrice: 6.75,
    lastUpdated: '2025-03-14',
    status: 'Normal'
  },
  {
    id: 4,
    name: 'Aceite de oliva',
    category: 'Aceites',
    currentStock: 12,
    unit: 'l',
    minStock: 8,
    costPrice: 7.5,
    lastUpdated: '2025-03-12',
    status: 'Normal'
  },
  {
    id: 5,
    name: 'Leche',
    category: 'Lácteos',
    currentStock: 5,
    unit: 'l',
    minStock: 12,
    costPrice: 1.8,
    lastUpdated: '2025-03-16',
    status: 'Crítico'
  },
  {
    id: 6,
    name: 'Cebolla',
    category: 'Verduras',
    currentStock: 7,
    unit: 'kg',
    minStock: 10,
    costPrice: 1.5,
    lastUpdated: '2025-03-15',
    status: 'Bajo'
  },
  {
    id: 7,
    name: 'Ajo',
    category: 'Verduras',
    currentStock: 2,
    unit: 'kg',
    minStock: 3,
    costPrice: 4.0,
    lastUpdated: '2025-03-16',
    status: 'Bajo'
  },
  {
    id: 8,
    name: 'Queso',
    category: 'Lácteos',
    currentStock: 8,
    unit: 'kg',
    minStock: 5,
    costPrice: 9.2,
    lastUpdated: '2025-03-13',
    status: 'Normal'
  },
];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Obtener categorías únicas para el filtro
  const categories = Array.from(new Set(inventoryItems.map(item => item.category)));
  
  // Aplicar filtros
  const filteredItems = inventoryItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? item.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });
  
  // Contar productos con stock bajo
  const lowStockCount = inventoryItems.filter(item => 
    item.status === 'Bajo' || item.status === 'Crítico'
  ).length;

  return (
    <div>
      {/* Header con acciones */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
          Inventario de Productos
        </h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <Link
            href="/inventory/purchases"
            className="flex items-center justify-center px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Ver Compras
          </Link>
          <button
            className="flex items-center justify-center px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
          >
            <Plus className="h-5 w-5 mr-1" />
            Añadir Producto
          </button>
        </div>
      </div>

      {/* Alertas de stock bajo */}
      {lowStockCount > 0 && (
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
          <div className="flex items-start">
            <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
            <div>
              <h3 className="text-sm font-medium text-amber-800">¡Alerta de Inventario!</h3>
              <p className="text-sm text-amber-700 mt-1">
                Tienes {lowStockCount} {lowStockCount === 1 ? 'producto' : 'productos'} con stock bajo. 
                <Link href="/inventory/stock-alerts" className="ml-1 underline font-medium">
                  Ver alertas
                </Link>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Filtros y búsqueda */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar productos..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de inventario */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Producto
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Categoría
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Actual
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock Mínimo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Precio Costo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Última Actualización
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {item.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.category}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {item.currentStock} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {item.minStock} {item.unit}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${item.costPrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(item.lastUpdated).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${item.status === 'Normal' ? 'bg-green-100 text-green-800' : 
                          item.status === 'Bajo' ? 'bg-amber-100 text-amber-800' : 
                          'bg-red-100 text-red-800'}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredItems.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        )}
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Mostrando <span className="font-medium">{filteredItems.length}</span> de <span className="font-medium">{inventoryItems.length}</span> productos
          </div>
        </div>
      </div>
    </div>
  );
}