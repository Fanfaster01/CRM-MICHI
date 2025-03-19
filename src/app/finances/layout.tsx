'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Resumen', href: '/finances' },
  { name: 'Gastos', href: '/finances/expenses' },
  { name: 'Compras', href: '/finances/purchases' },
  { name: 'Cuentas por Cobrar', href: '/finances/accounts-receivable' },
  { name: 'Cuentas por Pagar', href: '/finances/accounts-payable' },
];

export default function FinancesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Gestión Financiera</h1>
        <p className="text-gray-600">Administra tus finanzas, gastos e ingresos</p>
      </div>
      
      <div className="bg-white shadow-sm rounded-lg overflow-hidden mb-6">
        <nav className="flex overflow-x-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-3 text-sm font-medium whitespace-nowrap ${
                  isActive
                    ? 'text-pink-600 border-b-2 border-pink-500'
                    : 'text-gray-500 hover:text-gray-700 hover:border-b-2 hover:border-gray-300'
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>
      
      {children}
    </div>
  );
}