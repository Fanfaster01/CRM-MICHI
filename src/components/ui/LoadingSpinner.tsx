import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: 'primary' | 'secondary' | 'white';
  text?: string;
  fullScreen?: boolean;
}

export default function LoadingSpinner({
  size = 'md',
  color = 'primary',
  text,
  fullScreen = false,
}: LoadingSpinnerProps) {
  // Mapeo de tamaños
  const sizeMap = {
    sm: 'h-6 w-6',
    md: 'h-10 w-10',
    lg: 'h-16 w-16',
  };

  // Mapeo de colores
  const colorMap = {
    primary: 'border-pink-500',
    secondary: 'border-indigo-500',
    white: 'border-white',
  };

  // Clases del spinner
  const spinnerClasses = `animate-spin rounded-full border-t-2 border-b-2 ${colorMap[color]} ${sizeMap[size]}`;

  // Si es pantalla completa, centra en toda la pantalla
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg shadow-lg">
          <div className={spinnerClasses}></div>
          {text && <p className="text-gray-700 font-medium">{text}</p>}
        </div>
      </div>
    );
  }

  // Versión normal (no pantalla completa)
  return (
    <div className="flex flex-col items-center justify-center space-y-2">
      <div className={spinnerClasses}></div>
      {text && <p className="text-sm text-gray-600">{text}</p>}
    </div>
  );
}