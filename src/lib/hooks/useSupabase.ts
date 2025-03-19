import { useState, useEffect, useCallback } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useAppStore } from '@/store';

export function useSupabase<T>(
  tableName: string, 
  options?: {
    select?: string;
    eq?: [string, any][];
    order?: [string, { ascending: boolean }];
    limit?: number;
    withAuth?: boolean;
  }
) {
  const supabase = createClient();
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const user = useAppStore(state => state.user);
  
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Verificar autenticación si es necesario
      if (options?.withAuth && !user) {
        throw new Error('Usuario no autenticado');
      }
      
      // Construir la consulta
      let query = supabase
        .from(tableName)
        .select(options?.select || '*');
        
      // Aplicar filtros
      if (options?.eq) {
        options.eq.forEach(([column, value]) => {
          query = query.eq(column, value);
        });
      }
      
      // Aplicar ordenamiento
      if (options?.order) {
        query = query.order(options.order[0], { ascending: options.order[1].ascending });
      }
      
      // Aplicar límite
      if (options?.limit) {
        query = query.limit(options.limit);
      }
      
      // Ejecutar la consulta
      const { data, error } = await query;
      
      if (error) throw error;
      
      setData(data as T[]);
    } catch (err: any) {
      setError(err);
      console.error(`Error en useSupabase (${tableName}):`, err);
    } finally {
      setLoading(false);
    }
  }, [supabase, tableName, options, user]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  // Función para recargar los datos
  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);
  
  // Funciones para manipular los datos
  
  const insert = useCallback(async (newData: Partial<T>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(tableName)
        .insert(newData)
        .select();
        
      if (error) throw error;
      
      // Actualizar los datos en memoria
      setData(prevData => {
        if (!prevData) return data as T[];
        return [...prevData, ...(data as T[])];
      });
      
      return data?.[0] as T;
    } catch (err: any) {
      setError(err);
      console.error(`Error al insertar en ${tableName}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [supabase, tableName]);
  
  const update = useCallback(async (id: string, updates: Partial<T>) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq('id', id)
        .select();
        
      if (error) throw error;
      
      // Actualizar los datos en memoria
      setData(prevData => {
        if (!prevData) return prevData;
        return prevData.map(item => {
          if ((item as any).id === id) {
            return { ...item, ...updates };
          }
          return item;
        });
      });
      
      return data?.[0] as T;
    } catch (err: any) {
      setError(err);
      console.error(`Error al actualizar en ${tableName}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [supabase, tableName]);
  
  const remove = useCallback(async (id: string) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      // Actualizar los datos en memoria
      setData(prevData => {
        if (!prevData) return prevData;
        return prevData.filter(item => (item as any).id !== id);
      });
      
      return true;
    } catch (err: any) {
      setError(err);
      console.error(`Error al eliminar en ${tableName}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [supabase, tableName]);
  
  return {
    data,
    loading,
    error,
    refresh,
    insert,
    update,
    remove
  };
}

// Hook para obtener un solo elemento por ID
export function useSupabaseItem<T>(
  tableName: string,
  id: string | null,
  options?: {
    select?: string;
    dependencies?: any[];
  }
) {
  const supabase = createClient();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(id !== null);
  const [error, setError] = useState<Error | null>(null);
  
  const fetchData = useCallback(async () => {
    if (!id) {
      setData(null);
      setLoading(false);
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      
      // Construir la consulta
      const query = supabase
        .from(tableName)
        .select(options?.select || '*')
        .eq('id', id)
        .single();
        
      // Ejecutar la consulta
      const { data, error } = await query;
      
      if (error) throw error;
      
      setData(data as T);
    } catch (err: any) {
      setError(err);
      console.error(`Error en useSupabaseItem (${tableName}):`, err);
    } finally {
      setLoading(false);
    }
  }, [supabase, tableName, id, options?.select]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData, ...(options?.dependencies || [])]);
  
  // Función para recargar los datos
  const refresh = useCallback(() => {
    fetchData();
  }, [fetchData]);
  
  // Función para actualizar el elemento
  const update = useCallback(async (updates: Partial<T>) => {
    if (!id) {
      throw new Error('No se puede actualizar un elemento sin ID');
    }
    
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from(tableName)
        .update(updates)
        .eq('id', id)
        .select()
        .single();
        
      if (error) throw error;
      
      setData(data as T);
      return data as T;
    } catch (err: any) {
      setError(err);
      console.error(`Error al actualizar en ${tableName}:`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [supabase, tableName, id]);
  
  return {
    data,
    loading,
    error,
    refresh,
    update
  };
}

// Hook para ejecutar una consulta RPC
export function useSupabaseRPC<T, P = any>(
  functionName: string,
  defaultParams?: P
) {
  const supabase = createClient();
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const execute = useCallback(async (params?: P) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data, error } = await supabase.rpc(
        functionName,
        params || defaultParams || {}
      );
      
      if (error) throw error;
      
      setData(data as T);
      return data as T;
    } catch (err: any) {
      setError(err);
      console.error(`Error al ejecutar RPC (${functionName}):`, err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [supabase, functionName, defaultParams]);
  
  return {
    data,
    loading,
    error,
    execute
  };
}