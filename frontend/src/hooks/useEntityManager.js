import { useState, useEffect } from "react";

export const useEntityManager = (initialItemsEntity, nameEntity) => {
  const getStoredItems = () => {
    const stored = localStorage.getItem(`${nameEntity}`);
    if (!stored || stored === '[]') {
      return initialItemsEntity;
    }
    try {
      return initialItemsEntity;

      // return JSON.parse(stored);
    } catch (error) {
      console.error("Error parsing:", error);
      return initialItemsEntity;
    }
  };

  const [items, setItems] = useState(getStoredItems());

  useEffect(() => {
    // persistencia automática
    localStorage.setItem(nameEntity, JSON.stringify(items));
  }, [items]);

  // 🔍 GET BY ID
  const getItem = (id) => {
    const found = items.find((item) => item.id === id);
    if (!found) console.warn(`Elemento con ID ${id} no encontrado`);
    return found;
  };

  // ➕ CREATE
  const createItem = (newItem) => {
    const itemWithId = {
      ...newItem,
      id: newItem.id ?? crypto.randomUUID()
    };
    setItems((prev) => [...prev, itemWithId]);
  };

  // 📝 UPDATE
  const updateItem = (id, updatedData) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      )
    );
  };

  // ❌ DELETE
  const deleteItem = (id) => {
    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
    console.log(items);
  };

  return {
    items,
    getItem,
    createItem,
    updateItem,
    deleteItem
  };
};
