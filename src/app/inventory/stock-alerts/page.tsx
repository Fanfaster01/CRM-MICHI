'use client';

import { useState } from 'react';
import { ShoppingCart, ArrowLeft, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

// Datos de ejemplo - filtrando solo los productos con stock bajo
const lowStockItems = [
  {
    id: 2,
    name: 'Tomates',
    category: 'Verduras',
    currentStock: 8,
    unit: 'kg',
    minStock: 15,
    costPrice: 3.2,
    lastUpdated: '2025-03-16',
    status: 'Bajo',
    supplier: 'Frutas y Verduras Express'
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
    status: 'Crítico',
    supplier: 'Lácteos del Valle'
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
    status: 'Bajo',
    supplier: 'Frutas y Verduras Express'
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
    status: 'Bajo',
    supplier: 'Frutas y Verduras Express'
  }
];

export default function StockAlertsPage() {
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  
  const toggleSelectItem = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };
  
  const selectAll = () => {
    if (selectedItems.length === lowStockItems.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(lowStockItems.map(item => item.id));
    }
  };

  const createPurchaseOrder = () => {
    // Aquí iría la lógica para crear órdenes de compra
    alert(`Creando orden de compra para ${selectedItems.length} productos`);
  };

  return (
    <div>
      {/* Header con acciones */}
      <div className="mb-6">
        <Link href="/inventory" className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-4">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Volver al Inventario
        </Link>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
            Alertas de Stock Bajo
          </h2>
          <button
            onClick={createPurchaseOrder}
            disabled={selectedItems.length === 0}
            className={`flex items-center justify-center px-4 py-2 rounded-md transition-colors ${
              selectedItems.length > 0 
                ? 'bg-pink-500 text-white hover:bg-pink-600'
                : 'bg-gray-200 text-gray-500 cursor-not-allowed'
            }`}
          >
            <ShoppingCart className="h-5 w-5 mr-1" />
            Crear Orden de Compra
          </button>
        </div>
      </div>

      {/* Panel de alerta */}
      <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
        <div className="flex items-start">
          <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2" />
          <div>
            <h3 className="text-sm font-medium text-amber-800">Productos con stock bajo</h3>
            <p className="text-sm text-amber-700 mt-1">
              Estos productos han caído por debajo de su nivel mínimo de stock. 
              Se recomienda realizar un pedido para reabastecerlos.
            </p>
          </div>
        </div>
      </div>

      {/* Tabla de productos con stock bajo */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                      checked={selectedItems.length === lowStockItems.length && lowStockItems.length > 0}
                      onChange={selectAll}
                    />
                  </div>
                </th>
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
                  Proveedor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {lowStockItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => toggleSelectItem(item.id)}
                      />
                    </div>
                  </td>
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
                    {item.supplier}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${item.status === 'Bajo' ? 'bg-amber-100 text-amber-800' : 'bg-red-100 text-red-800'}`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {lowStockItems.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-gray-500">No hay productos con stock bajo actualmente.</p>
          </div>
        )}
      </div>
      
      {/* Acciones masivas en parte inferior */}
      {selectedItems.length > 0 && (
        <div className="mt-6 flex justify-between items-center bg-gray-50 p-4 rounded-lg border border-gray-200">
          <span className="text-sm text-gray-700">
            {selectedItems.length} {selectedItems.length === 1 ? 'producto seleccionado' : 'productos seleccionados'}
          </span>
          <div className="flex space-x-3">
            <button
              onClick={() => setSelectedItems([])}
              className="px-3 py-1 border border-gray-300 rounded-md text-sm text-gray-700 hover:bg-gray-100"
            >
              Deseleccionar
            </button>
            <button
              onClick={createPurchaseOrder}
              className="px-3 py-1 bg-pink-500 text-white rounded-md text-sm hover:bg-pink-600"
            >
              Crear Orden
            </button>
          </div>
        </div>
      )}
    </div>
  );
}