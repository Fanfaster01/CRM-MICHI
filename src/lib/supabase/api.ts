import { createClient } from './client';
import { 
  User, Restaurant, Expense, Product, Supplier, Purchase, PurchaseItem,
  Sale, SaleItem, Customer, Staff, StaffSchedule, InventoryItem,
  AccountsReceivable, AccountsPayable
} from '@/types';

// Cliente de Supabase
const supabase = createClient();

// =============== USERS ===============

export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return null;
  }
  
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();
    
  return data as User | null;
}

export async function updateUserProfile(userId: string, userData: Partial<User>): Promise<User> {
  const { data, error } = await supabase
    .from('users')
    .update(userData)
    .eq('id', userId)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al actualizar el perfil: ${error.message}`);
  }
  
  return data as User;
}

export async function getUsers(): Promise<User[]> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .order('full_name', { ascending: true });
    
  if (error) {
    throw new Error(`Error al obtener usuarios: ${error.message}`);
  }
  
  return data as User[];
}

// =============== RESTAURANTS ===============

export async function getRestaurants(): Promise<Restaurant[]> {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*, manager:users(full_name)')
    .order('name', { ascending: true });
    
  if (error) {
    throw new Error(`Error al obtener restaurantes: ${error.message}`);
  }
  
  return data as Restaurant[];
}

export async function getRestaurant(id: string): Promise<Restaurant> {
  const { data, error } = await supabase
    .from('restaurants')
    .select('*, manager:users(full_name)')
    .eq('id', id)
    .single();
    
  if (error) {
    throw new Error(`Error al obtener el restaurante: ${error.message}`);
  }
  
  return data as Restaurant;
}

export async function createRestaurant(restaurantData: Omit<Restaurant, 'id' | 'createdAt'>): Promise<Restaurant> {
  const { data, error } = await supabase
    .from('restaurants')
    .insert(restaurantData)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al crear el restaurante: ${error.message}`);
  }
  
  return data as Restaurant;
}

export async function updateRestaurant(id: string, restaurantData: Partial<Restaurant>): Promise<Restaurant> {
  const { data, error } = await supabase
    .from('restaurants')
    .update(restaurantData)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al actualizar el restaurante: ${error.message}`);
  }
  
  return data as Restaurant;
}

export async function deleteRestaurant(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('restaurants')
    .delete()
    .eq('id', id);
    
  if (error) {
    throw new Error(`Error al eliminar el restaurante: ${error.message}`);
  }
  
  return true;
}

// =============== EXPENSES ===============

export async function getExpenses(restaurantId?: string): Promise<Expense[]> {
  let query = supabase
    .from('expenses')
    .select('*, restaurant:restaurants(name), created_by:users(full_name)')
    .order('date', { ascending: false });
    
  if (restaurantId) {
    query = query.eq('restaurant_id', restaurantId);
  }
  
  const { data, error } = await query;
    
  if (error) {
    throw new Error(`Error al obtener gastos: ${error.message}`);
  }
  
  return data as Expense[];
}

export async function getExpense(id: string): Promise<Expense> {
  const { data, error } = await supabase
    .from('expenses')
    .select('*, restaurant:restaurants(name), created_by:users(full_name)')
    .eq('id', id)
    .single();
    
  if (error) {
    throw new Error(`Error al obtener el gasto: ${error.message}`);
  }
  
  return data as Expense;
}

export async function createExpense(expenseData: Omit<Expense, 'id' | 'createdAt'>): Promise<Expense> {
  const { data, error } = await supabase
    .from('expenses')
    .insert(expenseData)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al crear el gasto: ${error.message}`);
  }
  
  return data as Expense;
}

export async function updateExpense(id: string, expenseData: Partial<Expense>): Promise<Expense> {
  const { data, error } = await supabase
    .from('expenses')
    .update(expenseData)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al actualizar el gasto: ${error.message}`);
  }
  
  return data as Expense;
}

export async function deleteExpense(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('expenses')
    .delete()
    .eq('id', id);
    
  if (error) {
    throw new Error(`Error al eliminar el gasto: ${error.message}`);
  }
  
  return true;
}

export async function getExpenseCategories(): Promise<{ name: string; description: string }[]> {
  const { data, error } = await supabase
    .from('expense_categories')
    .select('*')
    .order('name', { ascending: true });
    
  if (error) {
    throw new Error(`Error al obtener categorías de gastos: ${error.message}`);
  }
  
  return data;
}

// =============== PRODUCTS ===============

export async function getProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('name', { ascending: true });
    
  if (error) {
    throw new Error(`Error al obtener productos: ${error.message}`);
  }
  
  return data as Product[];
}

export async function getProduct(id: string): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    throw new Error(`Error al obtener el producto: ${error.message}`);
  }
  
  return data as Product;
}

export async function createProduct(productData: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .insert(productData)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al crear el producto: ${error.message}`);
  }
  
  return data as Product;
}

export async function updateProduct(id: string, productData: Partial<Product>): Promise<Product> {
  const { data, error } = await supabase
    .from('products')
    .update(productData)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al actualizar el producto: ${error.message}`);
  }
  
  return data as Product;
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('products')
    .delete()
    .eq('id', id);
    
  if (error) {
    throw new Error(`Error al eliminar el producto: ${error.message}`);
  }
  
  return true;
}

// =============== INVENTORY ===============

export async function getInventory(restaurantId: string): Promise<InventoryItem[]> {
  const { data, error } = await supabase
    .from('inventory')
    .select('*, product:products(*), restaurant:restaurants(name)')
    .eq('restaurant_id', restaurantId)
    .order('last_updated', { ascending: false });
    
  if (error) {
    throw new Error(`Error al obtener inventario: ${error.message}`);
  }
  
  return data as InventoryItem[];
}

export async function getLowStockItems(restaurantId: string): Promise<InventoryItem[]> {
  const { data, error } = await supabase
    .from('inventory')
    .select('*, product:products(*), restaurant:restaurants(name)')
    .eq('restaurant_id', restaurantId)
    .lt('quantity', { raw: 'min_stock_level' })
    .order('quantity', { ascending: true });
    
  if (error) {
    throw new Error(`Error al obtener ítems con stock bajo: ${error.message}`);
  }
  
  return data as InventoryItem[];
}

export async function updateInventoryItem(
  restaurantId: string, 
  productId: string, 
  data: Partial<InventoryItem>
): Promise<InventoryItem> {
  const { data: updatedData, error } = await supabase
    .from('inventory')
    .update(data)
    .eq('restaurant_id', restaurantId)
    .eq('product_id', productId)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al actualizar inventario: ${error.message}`);
  }
  
  return updatedData as InventoryItem;
}

// =============== SUPPLIERS ===============

export async function getSuppliers(): Promise<Supplier[]> {
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .order('name', { ascending: true });
    
  if (error) {
    throw new Error(`Error al obtener proveedores: ${error.message}`);
  }
  
  return data as Supplier[];
}

export async function getSupplier(id: string): Promise<Supplier> {
  const { data, error } = await supabase
    .from('suppliers')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    throw new Error(`Error al obtener el proveedor: ${error.message}`);
  }
  
  return data as Supplier;
}

export async function createSupplier(supplierData: Omit<Supplier, 'id' | 'createdAt'>): Promise<Supplier> {
  const { data, error } = await supabase
    .from('suppliers')
    .insert(supplierData)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al crear el proveedor: ${error.message}`);
  }
  
  return data as Supplier;
}

export async function updateSupplier(id: string, supplierData: Partial<Supplier>): Promise<Supplier> {
  const { data, error } = await supabase
    .from('suppliers')
    .update(supplierData)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al actualizar el proveedor: ${error.message}`);
  }
  
  return data as Supplier;
}

export async function deleteSupplier(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('suppliers')
    .delete()
    .eq('id', id);
    
  if (error) {
    throw new Error(`Error al eliminar el proveedor: ${error.message}`);
  }
  
  return true;
}

// =============== PURCHASES ===============

export async function getPurchases(restaurantId?: string): Promise<Purchase[]> {
  let query = supabase
    .from('purchases')
    .select(`
      *,
      restaurant:restaurants(name),
      supplier:suppliers(name),
      created_by:users(full_name),
      items:purchase_items(
        id,
        product_id,
        quantity,
        unit_price,
        total_price,
        product:products(name, unit)
      )
    `)
    .order('date', { ascending: false });
    
  if (restaurantId) {
    query = query.eq('restaurant_id', restaurantId);
  }
  
  const { data, error } = await query;
    
  if (error) {
    throw new Error(`Error al obtener compras: ${error.message}`);
  }
  
  return data as Purchase[];
}

export async function getPurchase(id: string): Promise<Purchase> {
  const { data, error } = await supabase
    .from('purchases')
    .select(`
      *,
      restaurant:restaurants(name),
      supplier:suppliers(name),
      created_by:users(full_name),
      items:purchase_items(
        id,
        product_id,
        quantity,
        unit_price,
        total_price,
        product:products(name, unit)
      )
    `)
    .eq('id', id)
    .single();
    
  if (error) {
    throw new Error(`Error al obtener la compra: ${error.message}`);
  }
  
  return data as Purchase;
}

export async function createPurchase(
  purchaseData: Omit<Purchase, 'id' | 'createdAt'>,
  items: Omit<PurchaseItem, 'id' | 'purchaseId' | 'createdAt'>[]
): Promise<Purchase> {
  // Iniciar una transacción
  const { data, error } = await supabase.rpc('create_purchase', {
    purchase_data: purchaseData,
    purchase_items: items
  });
  
  if (error) {
    throw new Error(`Error al crear la compra: ${error.message}`);
  }
  
  return data as Purchase;
}

export async function updatePurchaseStatus(id: string, status: string): Promise<Purchase> {
  const { data, error } = await supabase
    .from('purchases')
    .update({ status })
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al actualizar el estado de la compra: ${error.message}`);
  }
  
  return data as Purchase;
}

// =============== SALES ===============

export async function getSales(restaurantId?: string): Promise<Sale[]> {
  let query = supabase
    .from('sales')
    .select(`
      *,
      restaurant:restaurants(name),
      cashier:users(full_name),
      items:sales_items(
        id,
        product_id,
        quantity,
        unit_price,
        total_price,
        product:products(name, unit)
      )
    `)
    .order('date', { ascending: false });
    
  if (restaurantId) {
    query = query.eq('restaurant_id', restaurantId);
  }
  
  const { data, error } = await query;
    
  if (error) {
    throw new Error(`Error al obtener ventas: ${error.message}`);
  }
  
  return data as Sale[];
}

export async function getSale(id: string): Promise<Sale> {
  const { data, error } = await supabase
    .from('sales')
    .select(`
      *,
      restaurant:restaurants(name),
      cashier:users(full_name),
      items:sales_items(
        id,
        product_id,
        quantity,
        unit_price,
        total_price,
        product:products(name, unit)
      )
    `)
    .eq('id', id)
    .single();
    
  if (error) {
    throw new Error(`Error al obtener la venta: ${error.message}`);
  }
  
  return data as Sale;
}

export async function createSale(
  saleData: Omit<Sale, 'id' | 'createdAt'>,
  items: Omit<SaleItem, 'id' | 'saleId' | 'createdAt'>[]
): Promise<Sale> {
  // Iniciar una transacción
  const { data, error } = await supabase.rpc('create_sale', {
    sale_data: saleData,
    sale_items: items
  });
  
  if (error) {
    throw new Error(`Error al crear la venta: ${error.message}`);
  }
  
  return data as Sale;
}

// =============== CUSTOMERS ===============

export async function getCustomers(): Promise<Customer[]> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .order('name', { ascending: true });
    
  if (error) {
    throw new Error(`Error al obtener clientes: ${error.message}`);
  }
  
  return data as Customer[];
}

export async function getCustomer(id: string): Promise<Customer> {
  const { data, error } = await supabase
    .from('customers')
    .select('*')
    .eq('id', id)
    .single();
    
  if (error) {
    throw new Error(`Error al obtener el cliente: ${error.message}`);
  }
  
  return data as Customer;
}

export async function createCustomer(customerData: Omit<Customer, 'id' | 'createdAt'>): Promise<Customer> {
  const { data, error } = await supabase
    .from('customers')
    .insert(customerData)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al crear el cliente: ${error.message}`);
  }
  
  return data as Customer;
}

export async function updateCustomer(id: string, customerData: Partial<Customer>): Promise<Customer> {
  const { data, error } = await supabase
    .from('customers')
    .update(customerData)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al actualizar el cliente: ${error.message}`);
  }
  
  return data as Customer;
}

export async function deleteCustomer(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('customers')
    .delete()
    .eq('id', id);
    
  if (error) {
    throw new Error(`Error al eliminar el cliente: ${error.message}`);
  }
  
  return true;
}

// =============== STAFF ===============

export async function getStaff(restaurantId?: string): Promise<Staff[]> {
  let query = supabase
    .from('staff')
    .select('*, user:users(*), restaurant:restaurants(name)')
    .order('position', { ascending: true });
    
  if (restaurantId) {
    query = query.eq('restaurant_id', restaurantId);
  }
  
  const { data, error } = await query;
    
  if (error) {
    throw new Error(`Error al obtener personal: ${error.message}`);
  }
  
  return data as Staff[];
}

export async function getStaffMember(id: string): Promise<Staff> {
  const { data, error } = await supabase
    .from('staff')
    .select('*, user:users(*), restaurant:restaurants(name)')
    .eq('id', id)
    .single();
    
  if (error) {
    throw new Error(`Error al obtener miembro del personal: ${error.message}`);
  }
  
  return data as Staff;
}

export async function createStaffMember(staffData: Omit<Staff, 'id' | 'createdAt'>): Promise<Staff> {
  const { data, error } = await supabase
    .from('staff')
    .insert(staffData)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al crear miembro del personal: ${error.message}`);
  }
  
  return data as Staff;
}

export async function updateStaffMember(id: string, staffData: Partial<Staff>): Promise<Staff> {
  const { data, error } = await supabase
    .from('staff')
    .update(staffData)
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al actualizar miembro del personal: ${error.message}`);
  }
  
  return data as Staff;
}

export async function deleteStaffMember(id: string): Promise<boolean> {
  const { error } = await supabase
    .from('staff')
    .delete()
    .eq('id', id);
    
  if (error) {
    throw new Error(`Error al eliminar miembro del personal: ${error.message}`);
  }
  
  return true;
}

// =============== FINANCIAL ACCOUNTS ===============

export async function getAccountsReceivable(restaurantId?: string): Promise<AccountsReceivable[]> {
  let query = supabase
    .from('accounts_receivable')
    .select('*, restaurant:restaurants(name), customer:customers(name)')
    .order('due_date', { ascending: true });
    
  if (restaurantId) {
    query = query.eq('restaurant_id', restaurantId);
  }
  
  const { data, error } = await query;
    
  if (error) {
    throw new Error(`Error al obtener cuentas por cobrar: ${error.message}`);
  }
  
  return data as AccountsReceivable[];
}

export async function getAccountsPayable(restaurantId?: string): Promise<AccountsPayable[]> {
  let query = supabase
    .from('accounts_payable')
    .select('*, restaurant:restaurants(name), supplier:suppliers(name)')
    .order('due_date', { ascending: true });
    
  if (restaurantId) {
    query = query.eq('restaurant_id', restaurantId);
  }
  
  const { data, error } = await query;
    
  if (error) {
    throw new Error(`Error al obtener cuentas por pagar: ${error.message}`);
  }
  
  return data as AccountsPayable[];
}

export async function updateAccountStatus(
  table: 'accounts_receivable' | 'accounts_payable',
  id: string,
  status: string
): Promise<AccountsReceivable | AccountsPayable> {
  const { data, error } = await supabase
    .from(table)
    .update({ status })
    .eq('id', id)
    .select()
    .single();
    
  if (error) {
    throw new Error(`Error al actualizar estado de la cuenta: ${error.message}`);
  }
  
  return data as AccountsReceivable | AccountsPayable;
}

// =============== DASHBOARD DATA ===============

export interface DashboardData {
  financial: {
    totalSales: number;
    totalExpenses: number;
    profit: number;
    profitMargin: number;
  };
  charts: {
    salesByDate: Array<{ date: string; value: number }>;
    expensesByCategory: Array<{ category: string; value: number }>;
  };
  alerts: {
    lowStock: InventoryItem[];
    accountsReceivable: AccountsReceivable[];
    accountsPayable: AccountsPayable[];
  };
}

export async function getDashboardData(restaurantId: string): Promise<DashboardData> {
  // Implementar llamadas paralelas a diferentes endpoints
  const [
    salesData,
    expensesData,
    inventoryData,
    accountsReceivableData,
    accountsPayableData
  ] = await Promise.all([
    // Ventas del último mes
    supabase
      .from('sales')
      .select('id, date, total_amount')
      .eq('restaurant_id', restaurantId)
      .gte('date', new Date(new Date().setDate(new Date().getDate() - 30)).toISOString())
      .order('date', { ascending: true }),
      
    // Gastos del último mes
    supabase
      .from('expenses')
      .select('id, date, amount, category')
      .eq('restaurant_id', restaurantId)
      .gte('date', new Date(new Date().setDate(new Date().getDate() - 30)).toISOString())
      .order('date', { ascending: true }),
      
    // Inventario con stock bajo
    supabase
      .from('inventory')
      .select('*, product:products(name)')
      .eq('restaurant_id', restaurantId)
      .lt('quantity', { raw: 'min_stock_level' })
      .limit(5),
      
    // Cuentas por cobrar pendientes
    supabase
      .from('accounts_receivable')
      .select('*, customer:customers(name)')
      .eq('restaurant_id', restaurantId)
      .eq('status', 'Pendiente')
      .order('due_date', { ascending: true })
      .limit(5),
      
    // Cuentas por pagar pendientes
    supabase
      .from('accounts_payable')
      .select('*, supplier:suppliers(name)')
      .eq('restaurant_id', restaurantId)
      .eq('status', 'Pendiente')
      .order('due_date', { ascending: true })
      .limit(5)
  ]);
  
  // Calcular totales y estadísticas
  const totalSales = salesData.data?.reduce((sum, sale) => sum + Number(sale.total_amount), 0) || 0;
  const totalExpenses = expensesData.data?.reduce((sum, expense) => sum + Number(expense.amount), 0) || 0;
  const profit = totalSales - totalExpenses;
  const profitMargin = totalSales > 0 ? (profit / totalSales) * 100 : 0;
  
  // Agrupar gastos por categoría
  const expensesByCategory: Record<string, number> = {};
  expensesData.data?.forEach(expense => {
    const category = expense.category;
    expensesByCategory[category] = (expensesByCategory[category] || 0) + Number(expense.amount);
  });
  
  // Formatear datos para gráficos
  const salesByDate: Record<string, number> = {};
  salesData.data?.forEach(sale => {
    const date = new Date(sale.date).toLocaleDateString();
    salesByDate[date] = (salesByDate[date] || 0) + Number(sale.total_amount);
  });
  
  const expensesByDate: Record<string, number> = {};
  expensesData.data?.forEach(expense => {
    const date = new Date(expense.date).toLocaleDateString();
    expensesByDate[date] = (expensesByDate[date] || 0) + Number(expense.amount);
  });
  
  return {
    financial: {
      totalSales,
      totalExpenses,
      profit,
      profitMargin
    },
    charts: {
      salesByDate: Object.entries(salesByDate).map(([date, value]) => ({ date, value })),
      expensesByCategory: Object.entries(expensesByCategory).map(([category, value]) => ({ category, value }))
    },
    alerts: {
      lowStock: inventoryData.data as InventoryItem[] || [],
      accountsReceivable: accountsReceivableData.data as AccountsReceivable[] || [],
      accountsPayable: accountsPayableData.data as AccountsPayable[] || []
    }
  };
}

// =============== REPORTS ===============

export interface SalesReport {
  raw: Sale[];
  summary: {
    totalSales: number;
    totalItems: number;
    averageSale: number;
  };
  byDate: Array<{ date: string; value: number }>;
  byProduct: Array<{ name: string; value: number }>;
  byCategory: Array<{ category: string; value: number }>;
}

export async function getSalesReport(
  restaurantId: string,
  startDate: string,
  endDate: string
): Promise<SalesReport> {
  const { data, error } = await supabase
    .from('sales')
    .select(`
      *,
      items:sales_items(
        product_id,
        quantity,
        unit_price,
        total_price,
        product:products(name, category)
      )
    `)
    .eq('restaurant_id', restaurantId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true });
    
  if (error) {
    throw new Error(`Error al obtener reporte de ventas: ${error.message}`);
  }
  
  // Procesar los datos para el reporte
  const salesByDate: Record<string, number> = {};
  const salesByProduct: Record<string, number> = {};
  const salesByCategory: Record<string, number> = {};
  
  data?.forEach(sale => {
    const date = new Date(sale.date).toLocaleDateString();
    salesByDate[date] = (salesByDate[date] || 0) + Number(sale.total_amount);
    
    sale.items?.forEach((item: any) => {
      const productName = item.product.name;
      const category = item.product.category;
      
      salesByProduct[productName] = (salesByProduct[productName] || 0) + Number(item.total_price);
      salesByCategory[category] = (salesByCategory[category] || 0) + Number(item.total_price);
    });
  });
  
  return {
    raw: data as Sale[],
    summary: {
      totalSales: data?.reduce((sum, sale) => sum + Number(sale.total_amount), 0) || 0,
      totalItems: data?.reduce((sum, sale) => sum + (sale.items?.length || 0), 0) || 0,
      averageSale: data && data.length > 0 
        ? (data.reduce((sum, sale) => sum + Number(sale.total_amount), 0) / data.length) 
        : 0
    },
    byDate: Object.entries(salesByDate).map(([date, value]) => ({ date, value })),
    byProduct: Object.entries(salesByProduct)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value),
    byCategory: Object.entries(salesByCategory)
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value)
  };
}

export interface ExpensesReport {
  raw: Expense[];
  summary: {
    totalExpenses: number;
    totalEntries: number;
    averageExpense: number;
  };
  byDate: Array<{ date: string; value: number }>;
  byCategory: Array<{ category: string; value: number }>;
}

export async function getExpensesReport(
  restaurantId: string,
  startDate: string,
  endDate: string
): Promise<ExpensesReport> {
  const { data, error } = await supabase
    .from('expenses')
    .select('*')
    .eq('restaurant_id', restaurantId)
    .gte('date', startDate)
    .lte('date', endDate)
    .order('date', { ascending: true });
    
  if (error) {
    throw new Error(`Error al obtener reporte de gastos: ${error.message}`);
  }
  
  // Procesar los datos para el reporte
  const expensesByDate: Record<string, number> = {};
  const expensesByCategory: Record<string, number> = {};
  
  data?.forEach(expense => {
    const date = new Date(expense.date).toLocaleDateString();
    expensesByDate[date] = (expensesByDate[date] || 0) + Number(expense.amount);
    
    const category = expense.category;
    expensesByCategory[category] = (expensesByCategory[category] || 0) + Number(expense.amount);
  });
  
  return {
    raw: data as Expense[],
    summary: {
      totalExpenses: data?.reduce((sum, expense) => sum + Number(expense.amount), 0) || 0,
      totalEntries: data?.length || 0,
      averageExpense: data && data.length > 0 
        ? (data.reduce((sum, expense) => sum + Number(expense.amount), 0) / data.length) 
        : 0
    },
    byDate: Object.entries(expensesByDate).map(([date, value]) => ({ date, value })),
    byCategory: Object.entries(expensesByCategory)
      .map(([category, value]) => ({ category, value }))
      .sort((a, b) => b.value - a.value)
  };
}

export interface ProfitReport {
  summary: {
    totalSales: number;
    totalExpenses: number;
    totalProfit: number;
    profitMargin: number;
  };
  byDate: Array<{ 
    date: string; 
    sales: number; 
    expenses: number; 
    profit: number 
  }>;
  salesByCategory: Array<{ category: string; value: number }>;
  expensesByCategory: Array<{ category: string; value: number }>;
}

export async function getProfitReport(
  restaurantId: string,
  startDate: string,
  endDate: string
): Promise<ProfitReport> {
  const [salesReport, expensesReport] = await Promise.all([
    getSalesReport(restaurantId, startDate, endDate),
    getExpensesReport(restaurantId, startDate, endDate)
  ]);
  
  // Combinar datos para reporte de ganancias
  const allDates = new Set([
    ...salesReport.byDate.map(item => item.date),
    ...expensesReport.byDate.map(item => item.date)
  ]);
  
  const profitByDate = Array.from(allDates).map(date => {
    const salesValue = salesReport.byDate.find(item => item.date === date)?.value || 0;
    const expensesValue = expensesReport.byDate.find(item => item.date === date)?.value || 0;
    const profit = salesValue - expensesValue;
    
    return { date, sales: salesValue, expenses: expensesValue, profit };
  }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  const totalSales = salesReport.summary.totalSales;
  const totalExpenses = expensesReport.summary.totalExpenses;
  const totalProfit = totalSales - totalExpenses;
  const profitMargin = totalSales > 0 ? (totalProfit / totalSales) * 100 : 0;
  
  return {
    summary: {
      totalSales,
      totalExpenses,
      totalProfit,
      profitMargin
    },
    byDate: profitByDate,
    salesByCategory: salesReport.byCategory,
    expensesByCategory: expensesReport.byCategory
  };
}