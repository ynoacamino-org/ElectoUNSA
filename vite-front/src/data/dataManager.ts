// src/data/dataManager.ts
import initialData from './lists.json';
import type { ElectoralList } from '../types';

const STORAGE_KEY = 'electo_listas_db';

// OBTENER TODAS LAS LISTAS
export const getAllLists = (): ElectoralList[] => {
  // 1. Revisar si hay cambios guardados en el navegador
  const localData = localStorage.getItem(STORAGE_KEY);
  
  if (localData) {
    return JSON.parse(localData);
  }

  // 2. Si no hay nada en el navegador, devolver el JSON original
  // (Aseguramos que el JSON se trate como ElectoralList[])
  return initialData as unknown as ElectoralList[];
};

// OBTENER UNA LISTA POR ID
export const getListById = (id: string): ElectoralList | undefined => {
  const lists = getAllLists();
  return lists.find(list => list.id === id);
};

// GUARDAR UNA NUEVA LISTA (O EDITAR)
export const saveList = (newList: ElectoralList) => {
  const currentLists = getAllLists();
  
  // Verificamos si ya existe para actualizar o agregar
  const index = currentLists.findIndex(l => l.id === newList.id);
  
  let updatedLists;
  if (index >= 0) {
    // Editar existente
    updatedLists = [...currentLists];
    updatedLists[index] = newList;
  } else {
    // Agregar nueva
    updatedLists = [...currentLists, newList];
  }

  // Guardar en el navegador
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLists));
};