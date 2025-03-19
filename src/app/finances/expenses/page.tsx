'use client';

import { useState, useEffect } from 'react';
import { Plus, Filter, Search, Edit, Trash2, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import DataTable from '@/components/ui/DataTable';
import ExpenseForm from '@/components/finances/ExpenseForm';
import Modal from '@/components/ui/Modal';
import { useSupabase } from '@/lib/hooks/useSupabase';
import { useAppStore } from '@/store';
import { formatCurrency, formatDate } from '@/lib/utils';
import { Expense, TableColumn } from '@/types';

export default function ExpensesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const selectedRestaurant = useAppStore(state => state.selectedRestaurantId);
  const router = useRouter();
  
  // Obtener gastos
  const { 
    data: expenses, 
    loading, 
    error, 
    refresh,
    remove 
  } = useSupabase<Expense>(
    'expenses',
    {
      select: `*, restaurant:restaurants(name), created_by:users(full_name)`,
      eq: selectedRestaurant ? [['restaurant_id', selectedRestaurant]] : undefined,
      order: ['date', { ascending: false }],
      withAuth: true
    }
  );
  
  // Obtener categorías de gastos para el filtro
  const { data: categories } = useSupabase<{ name: string }>(
    'expense_categories',
    { select: 'name', order: ['name', { ascending: true }] }
  );
  
  // Columnas para la tabla
  const columns: TableColumn<Expense>[] = [
    {
      key: 'date',
      header: 'Fecha',
      render: (expense) => formatDate(expense.date),
      sortable: true
    },
    {
      key: 'category',
      header: 'Categoría',
      render: (expense) => (
        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {expense.category}
        </span>
      ),
      sortable: true
    },
    {
      key: 'description',
      header: 'Descripción',
      sortable: true
    },
    {
      key: 'amount',
      header: 'Monto',
      render: (expense) => (
        <span className="font-medium text-red-600">
          {formatCurrency(Number(expense.amount))}
        </span>
      ),
      sortable: true
    },
    {
      key: 'payment_method',
      header: 'Método de Pago',
      sortable: true
    },
    {
      key: 'status',
      header: 'Estado',
      render: (expense) => (
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
          expense.status === 'Pagado' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {expense.status}
        </span>
      ),
      sortable: true
    },
    {
      key: 'actions',
      header: 'Acciones',
      render: (expense) => (
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleEdit(expense);
            }}
            className="text-indigo-600 hover:text-indigo-900"
            title="Editar"
          >
            <Edit className="h-5 w-5" />
          </button>
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleDelete(expense);
            }}
            className="text-red-600 hover:text-red-900"
            title="Eliminar"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        </div>
      )
    }
  ];
  
  // Filtrar gastos basados en el término de búsqueda y categoría
  const filteredExpenses = expenses
    ? expenses.filter(expense => {
        const matchesSearch = searchTerm
          ? expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (expense.notes && expense.notes.toLowerCase().includes(searchTerm.toLowerCase()))
          : true;
          
        const matchesCategory = selectedCategory
          ? expense.category === selectedCategory
          : true;
          
        return matchesSearch && matchesCategory;
      })
    : [];
  
  // Funciones para manejar el modal de creación/edición
  const openAddModal = () => {
    setCurrentExpense(null);
    setIsModalOpen(true);
  };
  
  const handleEdit = (expense: Expense) => {
    setCurrentExpense(expense);
    setIsModalOpen(true);
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentExpense(null);
  };
  
  // Funciones para manejar el modal de eliminación
  const handleDelete = (expense: Expense) => {
    setCurrentExpense(expense);
    setIsDeleteModalOpen(true);
  };
  
  const confirmDelete = async () => {
    if (!currentExpense) return;
    
    try {
      await remove(currentExpense.id);
      setIsDeleteModalOpen(false);
      setCurrentExpense(null);
    } catch (error) {
      console.error('Error al eliminar gasto:', error);
      alert('Error al eliminar el gasto. Inténtelo de nuevo.');
    }
  };
  
  // Función para manejar el clic en una fila
  const handleRowClick = (expense: Expense) => {
    // Navegar a la página de detalles del gasto
    router.push(`/finances/expenses/${expense.id}`);
  };
  
  return (
    <div>
      {/* Header con acciones */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">
          Registro de Gastos
        </h2>
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={openAddModal}
            className="flex items-center justify-center px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
          >
            <Plus className="h-5 w-5 mr-1" />
            Nuevo Gasto
          </button>
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar gastos..."
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 bg-white"
          >
            <option value="">Todas las categorías</option>
            {categories?.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabla de gastos */}
      <DataTable
        data={filteredExpenses}
        columns={columns}
        loading={loading}
        error={error}
        searchField="description"
        searchPlaceholder="Buscar por descripción..."
        emptyMessage="No se encontraron gastos que coincidan con tu búsqueda."
        onRowClick={handleRowClick}
        pagination={true}
        itemsPerPage={10}
      />

      {/* Modal de creación/edición de gastos */}
      <ExpenseForm
        isOpen={isModalOpen}
        onClose={closeModal}
        initialData={currentExpense || undefined}
        onSave={refresh}
      />

      {/* Modal de confirmación de eliminación */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Confirmar Eliminación"
        size="sm"
        footer={
          <>
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="px-4 py-2 bg-red-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-red-600"
              onClick={confirmDelete}
            >
              Eliminar
            </button>
          </>
        }
      >
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <p className="text-sm text-gray-800">
              ¿Estás seguro de que deseas eliminar este gasto?
            </p>
            {currentExpense && (
              <p className="mt-1 text-sm text-gray-500">
                Descripción: <strong>{currentExpense.description}</strong>
                <br />
                Monto: <strong>{formatCurrency(Number(currentExpense.amount))}</strong>
              </p>
            )}
            <p className="mt-2 text-sm text-red-600">
              Esta acción no se puede deshacer.
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}