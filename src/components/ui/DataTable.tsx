'use client';

import { useState, useMemo } from 'react';
import { Search, ChevronUp, ChevronDown } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';
import { TableColumn, SortConfig } from '@/types';

interface DataTableProps<T> {
  data: T[] | null;
  columns: TableColumn<T>[];
  loading?: boolean;
  error?: Error | null;
  searchField?: keyof T;
  searchPlaceholder?: string;
  emptyMessage?: string;
  rowKeyField?: keyof T;
  onRowClick?: (row: T) => void;
  actions?: React.ReactNode;
  pagination?: boolean;
  itemsPerPage?: number;
}

export default function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  error = null,
  searchField,
  searchPlaceholder = 'Buscar...',
  emptyMessage = 'No hay datos para mostrar',
  rowKeyField = 'id' as keyof T,
  onRowClick,
  actions,
  pagination = true,
  itemsPerPage = 10
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  
  // Filtrar los datos por término de búsqueda si es necesario
  const filteredData = useMemo(() => {
    if (!data) return [];
    if (!searchTerm || !searchField) return data;
    
    return data.filter(item => {
      const value = item[searchField];
      if (value === null || value === undefined) return false;
      return value.toString().toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [data, searchTerm, searchField]);
  
  // Ordenar los datos si es necesario
  const sortedData = useMemo(() => {
    if (!sortConfig) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      const valueA = a[sortConfig.key];
      const valueB = b[sortConfig.key];
      
      if (valueA === valueB) return 0;
      
      const compareResult = valueA < valueB ? -1 : 1;
      return sortConfig.direction === 'asc' ? compareResult : -compareResult;
    });
  }, [filteredData, sortConfig]);
  
  // Paginación
  const paginatedData = useMemo(() => {
    if (!pagination) return sortedData;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, pagination, currentPage, itemsPerPage]);
  
  // Total de páginas
  const totalPages = useMemo(() => {
    if (!pagination) return 1;
    return Math.ceil(sortedData.length / itemsPerPage);
  }, [sortedData, pagination, itemsPerPage]);
  
  // Función para cambiar la ordenación
  const handleSort = (key: string) => {
    setSortConfig(prevConfig => {
      if (!prevConfig || prevConfig.key !== key) {
        return { key, direction: 'asc' };
      }
      
      if (prevConfig.direction === 'asc') {
        return { key, direction: 'desc' };
      }
      
      return null;
    });
  };
  
  // Funciones para la paginación
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };
  
  const goToPreviousPage = () => {
    goToPage(currentPage - 1);
  };
  
  const goToNextPage = () => {
    goToPage(currentPage + 1);
  };
  
  // Renderizar icono de ordenación
  const renderSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return null;
    }
    
    return sortConfig.direction === 'asc' ? 
      <ChevronUp className="h-4 w-4 ml-1" /> : 
      <ChevronDown className="h-4 w-4 ml-1" />;
  };
  
  // Renderizar mensaje de error
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 mt-4">
        <p className="text-red-700">Error: {error.message}</p>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      {/* Header con búsqueda y acciones */}
      {(searchField || actions) && (
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          {searchField && (
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
          )}
          
          {actions && (
            <div className="flex space-x-2">
              {actions}
            </div>
          )}
        </div>
      )}
      
      {/* Tabla */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key.toString()}
                    className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.width || ''}`}
                    onClick={() => column.sortable && handleSort(column.key.toString())}
                    style={{ cursor: column.sortable ? 'pointer' : 'default' }}
                  >
                    <div className="flex items-center">
                      {column.header}
                      {column.sortable && renderSortIcon(column.key.toString())}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-16 text-center">
                    <LoadingSpinner size="lg" text="Cargando datos..." />
                  </td>
                </tr>
              ) : paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="px-6 py-16 text-center text-gray-500">
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                paginatedData.map((row) => (
                  <tr
                    key={row[rowKeyField]?.toString() || Math.random().toString()}
                    className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {columns.map((column) => (
                      <td
                        key={`${row[rowKeyField]}-${column.key.toString()}`}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
                      >
                        {column.render
                          ? column.render(row)
                          : row[column.key as keyof typeof row]?.toString() || ''}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Paginación */}
        {pagination && totalPages > 1 && (
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Mostrando <span className="font-medium">{paginatedData.length}</span> de{' '}
              <span className="font-medium">{sortedData.length}</span> resultados
            </div>
            <div className="flex space-x-2 text-sm">
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className={`px-3 py-1 rounded-md ${
                  currentPage === 1
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Anterior
              </button>
              <span className="px-3 py-1 bg-white">
                {currentPage} de {totalPages}
              </span>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-3 py-1 rounded-md ${
                  currentPage === totalPages
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                Siguiente
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}