'use client';

import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Modal from '@/components/ui/Modal';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { useSupabase } from '@/lib/hooks/useSupabase';
import { useAppStore } from '@/store';
import { Expense } from '@/types';

// Esquema de validación con Zod
const expenseSchema = z.object({
  restaurant_id: z.string().uuid('Seleccione un restaurante válido'),
  category: z.string().min(1, 'La categoría es requerida'),
  amount: z.number().positive('El monto debe ser mayor a 0'),
  description: z.string().min(1, 'La descripción es requerida'),
  date: z.string().min(1, 'La fecha es requerida'),
  payment_method: z.string().min(1, 'El método de pago es requerido'),
  status: z.string().min(1, 'El estado es requerido'),
  notes: z.string().optional()
});

type ExpenseFormData = z.infer<typeof expenseSchema>;

interface ExpenseFormProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<Expense>;
  onSave: () => void;
}

export default function ExpenseForm({
  isOpen,
  onClose,
  initialData,
  onSave
}: ExpenseFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useAppStore(state => state.user);
  const selectedRestaurant = useAppStore(state => state.selectedRestaurantId);
  
  // Obtener categorías de gastos
  const { data: categories } = useSupabase<{ name: string, description: string }>(
    'expense_categories',
    { order: ['name', { ascending: true }] }
  );
  
  // Obtener restaurantes
  const { data: restaurants } = useSupabase<{ id: string, name: string }>(
    'restaurants',
    { select: 'id, name', order: ['name', { ascending: true }] }
  );
  
  // Formulario con react-hook-form y validación Zod
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue
  } = useForm<ExpenseFormData>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      restaurant_id: selectedRestaurant || '',
      category: '',
      amount: 0,
      description: '',
      date: new Date().toISOString().split('T')[0],
      payment_method: 'Efectivo',
      status: 'Pagado',
      notes: ''
    }
  });
  
  // Métodos de pago disponibles
  const paymentMethods = [
    'Efectivo',
    'Tarjeta de crédito',
    'Tarjeta de débito',
    'Transferencia',
    'Cheque',
    'Otro'
  ];
  
  // Estados de gasto disponibles
  const expenseStatuses = [
    'Pagado',
    'Pendiente'
  ];
  
  // Cargar datos iniciales en el formulario
  useEffect(() => {
    if (initialData) {
      // Formatear fecha a formato YYYY-MM-DD
      const formattedDate = initialData.date 
        ? new Date(initialData.date).toISOString().split('T')[0]
        : new Date().toISOString().split('T')[0];
      
      // Resetear formulario con datos iniciales
      reset({
        ...initialData,
        date: formattedDate,
        amount: initialData.amount ? Number(initialData.amount) : 0
      } as ExpenseFormData);
    } else {
      // Resetear a valores por defecto
      reset({
        restaurant_id: selectedRestaurant || '',
        category: '',
        amount: 0,
        description: '',
        date: new Date().toISOString().split('T')[0],
        payment_method: 'Efectivo',
        status: 'Pagado',
        notes: ''
      });
    }
  }, [initialData, reset, selectedRestaurant]);
  
  // Guardar el gasto
  const onSubmit = async (data: ExpenseFormData) => {
    try {
      setIsSubmitting(true);
      
      const expense = {
        ...data,
        created_by: user?.id
      };
      
      // Usar la API de Supabase para crear o actualizar el gasto
      if (initialData?.id) {
        // Actualizar gasto existente
        await fetch(`/api/finances/expenses/${initialData.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(expense),
        });
      } else {
        // Crear nuevo gasto
        await fetch('/api/finances/expenses', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(expense),
        });
      }
      
      // Limpiar el formulario y cerrar el modal
      reset();
      onSave();
      onClose();
    } catch (error) {
      console.error('Error al guardar el gasto:', error);
      alert('Error al guardar el gasto. Inténtelo de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData?.id ? 'Editar Gasto' : 'Registrar Nuevo Gasto'}
      size="lg"
      footer={
        <>
          <button
            type="button"
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-pink-500 border border-transparent rounded-md text-sm font-medium text-white hover:bg-pink-600 disabled:opacity-70"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <LoadingSpinner size="sm" color="white" />
            ) : initialData?.id ? (
              'Actualizar'
            ) : (
              'Guardar'
            )}
          </button>
        </>
      }
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Restaurante */}
        <div>
          <label htmlFor="restaurant_id" className="block text-sm font-medium text-gray-700 mb-1">
            Restaurante
          </label>
          <select
            id="restaurant_id"
            {...register('restaurant_id')}
            className={`w-full px-3 py-2 border ${
              errors.restaurant_id ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
          >
            <option value="">Seleccionar restaurante</option>
            {restaurants?.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
          {errors.restaurant_id && (
            <p className="mt-1 text-sm text-red-600">{errors.restaurant_id.message}</p>
          )}
        </div>
        
        {/* Categoría */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Categoría
          </label>
          <select
            id="category"
            {...register('category')}
            className={`w-full px-3 py-2 border ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
          >
            <option value="">Seleccionar categoría</option>
            {categories?.map((category) => (
              <option key={category.name} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>
        
        {/* Descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Descripción
          </label>
          <input
            type="text"
            id="description"
            {...register('description')}
            placeholder="Describe el gasto"
            className={`w-full px-3 py-2 border ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>
        
        {/* Monto */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Monto ($)
          </label>
          <Controller
            name="amount"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                id="amount"
                step="0.01"
                min="0"
                placeholder="0.00"
                onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                value={field.value}
                className={`w-full px-3 py-2 border ${
                  errors.amount ? 'border-red-500' : 'border-gray-300'
                } rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
              />
            )}
          />
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600">{errors.amount.message}</p>
          )}
        </div>
        
        {/* Fecha */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Fecha
          </label>
          <input
            type="date"
            id="date"
            {...register('date')}
            className={`w-full px-3 py-2 border ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
          )}
        </div>
        
        {/* Método de pago */}
        <div>
          <label htmlFor="payment_method" className="block text-sm font-medium text-gray-700 mb-1">
            Método de Pago
          </label>
          <select
            id="payment_method"
            {...register('payment_method')}
            className={`w-full px-3 py-2 border ${
              errors.payment_method ? 'border-red-500' : 'border-gray-300'
            } rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500`}
          >
            <option value="">Seleccionar método de pago</option>
            {paymentMethods.map((method) => (
              <option key={method} value={method}>
                {method}
              </option>
            ))}
          </select>
          {errors.payment_method && (
            <p className="mt-1 text-sm text-red-600">{errors.payment_method.message}</p>
          )}
        </div>
        
        {/* Estado */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
            Estado
          </label>
          <div className="flex space-x-4">
            {expenseStatuses.map((status) => (
              <label key={status} className="flex items-center">
                <input
                  type="radio"
                  {...register('status')}
                  value={status}
                  className="h-4 w-4 text-pink-600 focus:ring-pink-500"
                />
                <span className="ml-2 text-sm text-gray-700">{status}</span>
              </label>
            ))}
          </div>
          {errors.status && (
            <p className="mt-1 text-sm text-red-600">{errors.status.message}</p>
          )}
        </div>
        
        {/* Notas adicionales */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Notas adicionales (opcional)
          </label>
          <textarea
            id="notes"
            {...register('notes')}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
            placeholder="Cualquier información adicional sobre este gasto..."
          ></textarea>
        </div>
      </form>
    </Modal>
  );
}