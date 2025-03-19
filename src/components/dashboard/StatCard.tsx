import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  color: string;
}

export default function StatCard({ title, value, change, isPositive, color }: StatCardProps) {
  return (
    <div className={`${color} p-6 rounded-lg shadow-sm text-white`}>
      <h3 className="text-sm font-medium mb-2">{title}</h3>
      <div className="flex justify-between items-end">
        <div className="space-y-4">
          <p className="text-2xl font-bold">{value}</p>
        </div>
        <div className="flex items-center text-xs">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 mr-1" />
          ) : (
            <TrendingDown className="h-4 w-4 mr-1" />
          )}
          {change}
        </div>
      </div>
    </div>
  );
}