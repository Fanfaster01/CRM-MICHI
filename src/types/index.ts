// Tipos para la autenticación y usuarios
export interface User {
    id: string;
    email: string;
    fullName: string;
    role: string;
    phone?: string;
    createdAt: string;
    lastLogin?: string;
  }
  
  export interface Restaurant {
    id: string;
    name: string;
    address: string;
    phone?: string;
    taxId?: string;
    managerId: string;
  }
  
  // Tipos para finanzas
  export interface Expense {
    id: string;
    restaurantId: string;
    category: string;
    amount: number;
    description: string;
    date: string;
    paymentMethod: string;
    status: 'Pagado' | 'Pendiente';
    notes?: string;
    createdBy: string;
  }
  
  export interface ExpenseCategory {
    id: string;
    name: string;
    description?: string;
  }
  
  export interface AccountsReceivable {
    id: string;
    restaurantId: string;
    customerId: string;
    amount: number;
    description?: string;
    dueDate: string;
    status: 'Pagado' | 'Pendiente' | 'Atrasado';
  }
  
  export interface AccountsPayable {
    id: string;
    restaurantId: string;
    supplierId: string;
    amount: number;
    description?: string;
    dueDate: string;
    status: 'Pagado' | 'Pendiente' | 'Atrasado';
  }
  
  // Tipos para inventario
  export interface Product {
    id: string;
    name: string;
    category: string;
    unit: string;
    costPrice: number;
    sellingPrice: number;
    isRawMaterial: boolean;
    sku?: string;
  }
  
  export interface InventoryItem {
    id: string;
    restaurantId: string;
    productId: string;
    quantity: number;
    minStockLevel: number;
    lastUpdated: string;
  }
  
  export interface Supplier {
    id: string;
    name: string;
    contactPerson?: string;
    email?: string;
    phone?: string;
    address?: string;
  }
  
  export interface Purchase {
    id: string;
    restaurantId: string;
    supplierId: string;
    totalAmount: number;
    status: 'Pendiente' | 'Confirmado' | 'Recibido' | 'Cancelado';
    date: string;
    createdBy: string;
  }
  
  export interface PurchaseItem {
    id: string;
    purchaseId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }
  
  // Tipos para ventas
  export interface Sale {
    id: string;
    restaurantId: string;
    totalAmount: number;
    taxAmount: number;
    discountAmount: number;
    paymentMethod: string;
    date: string;
    cashierId: string;
  }
  
  export interface SaleItem {
    id: string;
    saleId: string;
    productId: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
  }
  
  // Tipos para clientes
  export interface Customer {
    id: string;
    name: string;
    email?: string;
    phone?: string;
    createdAt: string;
    loyaltyPoints: number;
  }
  
  // Tipos para personal
  export interface Staff {
    id: string;
    userId: string;
    restaurantId: string;
    position: string;
    salary: number;
    hireDate: string;
  }
  
  export interface StaffSchedule {
    id: string;
    staffId: string;
    startTime: string;
    endTime: string;
    shiftType: string;
  }
  
  // Tipos para componentes UI
  export interface TableColumn<T> {
    key: keyof T | string;
    header: string;
    render?: (row: T) => React.ReactNode;
    width?: string;
    sortable?: boolean;
  }
  
  export interface SortConfig {
    key: string;
    direction: 'asc' | 'desc';
  }
  
  // Tipos para respuestas de API
  export interface ApiResponse<T> {
    data?: T;
    error?: {
      message: string;
      code?: string;
    };
    status: 'success' | 'error';
  }