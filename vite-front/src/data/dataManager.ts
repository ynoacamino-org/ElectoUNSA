import initialData from './lists.json';
import type { ElectoralList } from '../types';

const STORAGE_KEY = 'electo_listas_db';

export const getAllLists = (): ElectoralList[] => {
  try {
    const local = localStorage.getItem(STORAGE_KEY);
    let localListas: ElectoralList[] = [];
    if (local) {
      localListas = JSON.parse(local);
    }
    return [...localListas, ...(initialData as unknown as ElectoralList[])];
  } catch (error) {
    console.error("Error leyendo localStorage", error);
    return initialData as unknown as ElectoralList[];
  }
};

export const getListById = (id: string): ElectoralList | undefined => {
  const lists = getAllLists();
  return lists.find(l => l.id === id);
};

export const saveList = (newList: ElectoralList) => {
  try {
    // 1. Obtener datos actuales
    const local = localStorage.getItem(STORAGE_KEY);
    let localListas: ElectoralList[] = [];
    if (local) {
      localListas = JSON.parse(local);
    }
    
    // 2. Agregar nuevo
    const updatedLists = [newList, ...localListas];
    
    // 3. Intentar guardar (Aquí es donde falla si es muy grande)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLists));
    return true; // Éxito

  } catch (error: any) {
    // Si el error es por espacio lleno
    if (error.name === 'QuotaExceededError') {
      alert("⚠️ ¡Memoria llena!\n\nEl navegador solo permite guardar 5MB de datos. Tu PDF o Logo es muy pesado.\n\nIntenta con archivos más pequeños (menos de 200KB) para esta demo.");
    } else {
      console.error("Error guardando lista:", error);
    }
    return false; // Falló
  }
};