import { useState, useEffect } from "react";

export const useEntityManagerAPI = (entityName, baseUrl = "http://localhost:4000/api/v1") => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  
  
  const getItems = async (filters = {}) => {
    setLoading(true);
    setError(null);

    const query = Object.keys(filters).length
      ? `?${new URLSearchParams(filters).toString()}`
      : "";
    
    try {
      const res = await fetch(`${baseUrl}/${entityName}${query}`);
      if (!res.ok) {
        console.log(res);
        throw new Error("Error al obtener datos");
      }
            

      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };
  


  const createItem = async (newItem) => {

    const res = await fetch(`${baseUrl}/${entityName}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newItem)
    });
    if (!res.ok) throw new Error("Error al crear");
    const created = await res.json();
    setItems((prev) => [...prev, created]);
    return created;
  };

  const updateItem = async (id, updatedData) => {
    const res = await fetch(`${baseUrl}/${entityName}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });
    if (!res.ok) throw new Error("Error al actualizar");
    const updated = await res.json();
    setItems((prev) => prev.map((item) => (item.id === id ? updated : item)));
    return updated;
  };

  const deleteItem = async (id) => {
    const res = await fetch(`${baseUrl}/${entityName}/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Error al eliminar");
    setItems((prev) => prev.filter((item) => item.id !== id));
    return res;
  };

  return {
    items,
    loading,
    error,
    getItems,
    createItem,
    updateItem,
    deleteItem
  };
};
