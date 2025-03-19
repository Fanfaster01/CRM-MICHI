import React from 'react';

const orderStatus = [
  { id: '123456', customer: 'Lucas', date: 'Hoy', status: 'Completo', total: '$64.50', color: 'bg-green-500' },
  { id: '123457', customer: 'Paula', date: 'Hoy', status: 'Pendiente', total: '$32.00', color: 'bg-pink-500' },
  { id: '123458', customer: 'Miguel Herrera', date: 'Ayer', status: 'Enviado', total: '$29.99', color: 'bg-blue-500' },
  { id: '123459', customer: 'Jorge González', date: 'Ayer', status: 'Procesando', total: '$47.87', color: 'bg-amber-500' },
  { id: '123460', customer: 'Carla Medina', date: 'Ayer', status: 'Completo', total: '$53.99', color: 'bg-green-500' }
];

export default function OrderStatusCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-semibold">Órdenes Recientes</h3>
        <div className="flex space-x-1">
          <button className="h-8 w-8 bg-pink-500 rounded-full text-white flex items-center justify-center">
            <span>•••</span>
          </button>
          <button className="h-8 w-8 bg-gray-100 rounded-full text-gray-500 flex items-center justify-center">
            <span>•</span>
          </button>
          <button className="h-8 w-8 bg-gray-100 rounded-full text-gray-500 flex items-center justify-center">
            <span>••</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3 rounded-l-lg">ID</th>
              <th className="px-6 py-3">Cliente</th>
              <th className="px-6 py-3">Fecha</th>
              <th className="px-6 py-3">Total</th>
              <th className="px-6 py-3 rounded-r-lg">Estado</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orderStatus.map((order) => (
              <tr key={order.id}>
                <td className="px-6 py-4 whitespace-nowrap">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.customer}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.total}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`${order.color} text-white text-xs px-2 py-1 rounded-full`}>
                    {order.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}