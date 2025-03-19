/**
 * Formatea un número como moneda
 * @param amount - Monto a formatear
 * @param currency - Símbolo de moneda (por defecto '$')
 * @returns Cadena formateada como moneda
 */
export function formatCurrency(amount: number, currency: string = '$'): string {
    return `${currency}${amount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
  }
  
  /**
   * Formatea una fecha en formato legible
   * @param dateStr - Cadena de fecha o objeto Date
   * @param includeTime - Si se debe incluir la hora
   * @returns Fecha formateada
   */
  export function formatDate(dateStr: string | Date, includeTime: boolean = false): string {
    const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
    
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      ...(includeTime && { hour: '2-digit', minute: '2-digit' })
    };
    
    return date.toLocaleDateString('es-ES', options);
  }
  
  /**
   * Calcula el porcentaje de cambio entre dos valores
   * @param currentValue - Valor actual
   * @param previousValue - Valor anterior
   * @returns Porcentaje de cambio
   */
  export function calculatePercentageChange(
    currentValue: number,
    previousValue: number
  ): { value: number; isPositive: boolean } {
    if (previousValue === 0) return { value: 0, isPositive: false };
    
    const change = ((currentValue - previousValue) / Math.abs(previousValue)) * 100;
    
    return {
      value: Math.abs(Number(change.toFixed(1))),
      isPositive: change >= 0
    };
  }
  
  /**
   * Trunca un texto a una longitud máxima
   * @param text - Texto a truncar
   * @param maxLength - Longitud máxima
   * @returns Texto truncado
   */
  export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  }
  
  /**
   * Genera un ID único
   * @returns ID único
   */
  export function generateId(): string {
    return Math.random().toString(36).substring(2, 9);
  }
  
  /**
   * Filtra y ordena una lista de elementos
   * @param items - Lista de elementos
   * @param searchTerm - Término de búsqueda
   * @param sortField - Campo por el cual ordenar
   * @param sortOrder - Orden (asc o desc)
   * @param filterFn - Función de filtrado adicional
   * @returns Lista filtrada y ordenada
   */
  export function filterAndSortItems<T extends Record<string, any>>(
    items: T[],
    searchTerm: string = '',
    sortField: keyof T | null = null,
    sortOrder: 'asc' | 'desc' = 'asc',
    filterFn?: (item: T) => boolean
  ): T[] {
    // Primero aplicamos el filtrado por término de búsqueda
    let result = searchTerm
      ? items.filter(item => {
          return Object.values(item).some(
            value =>
              value &&
              value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      : [...items];
  
    // Luego aplicamos el filtro adicional si se proporcionó
    if (filterFn) {
      result = result.filter(filterFn);
    }
  
    // Finalmente ordenamos
    if (sortField) {
      result.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];
  
        if (aValue === bValue) return 0;
  
        const comparison = aValue < bValue ? -1 : 1;
        return sortOrder === 'asc' ? comparison : -comparison;
      });
    }
  
    return result;
  }