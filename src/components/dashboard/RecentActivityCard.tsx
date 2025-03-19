import React from 'react';

const recentActivities = [
  { id: 1, title: 'Menú Actualizado', user: 'Miguel', time: 'Hace 2 horas', color: 'bg-pink-500' },
  { id: 2, title: 'Chef Añadido', user: 'Carlos', time: 'Hace 3 horas', color: 'bg-indigo-500' },
  { id: 3, title: 'Publicada Oferta', user: 'Laura', time: 'Hace 5 horas', color: 'bg-blue-400' },
  { id: 4, title: 'Stock Actualizado', user: 'Roberto', time: 'Hace 7 horas', color: 'bg-amber-400' },
  { id: 5, title: 'Reseña del Cliente', user: 'Claudia', time: 'Hace 9 horas', color: 'bg-green-400' }
];

export default function RecentActivityCard() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h3 className="text-md font-semibold mb-4">Actividades Recientes</h3>
      <div className="space-y-4">
        {recentActivities.map((activity) => (
          <div key={activity.id} className="flex items-start">
            <div className={`${activity.color} h-8 w-8 rounded-full flex items-center justify-center text-white mt-1`}>
              {activity.id}
            </div>
            <div className="ml-4">
              <p className="font-medium">{activity.title}</p>
              <p className="text-sm text-gray-500">{activity.user} • {activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}