import { useState, useEffect } from "react";

export const useEntityManagerAPI = (entityName, baseUrl = "http://localhost:4000/api/v1") => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);



  const getItems = async (filters = {}) => {
    setLoading(true);
    setError(null);

    console.log(filters);
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([key, value]) => {
        if (["type", "state"].includes(key)) return true;
        return (
          value !== "" &&
          value !== null &&
          value !== undefined &&
          value !== "all" &&
          value !== false
        );
      })
    );

    const query = Object.keys(cleanFilters).length
      ? `?${new URLSearchParams(cleanFilters).toString()}`
      : "";

    try {
      const res = await fetch(`${baseUrl}/${entityName}${query}`);
      if (!res.ok) throw new Error("Error al obtener datos");

      const data = await res.json();
      setItems(Array.isArray(data) ? data : [data]);

      return data;
    } catch (err) {
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

    const data = await res.json();

    if (!res.ok) {
      throw new Error(data.msg || "Error al crear");
    }

    setItems(prev => [...prev, data]);
    return data;
  };


  const updateItem = async (id, updatedData) => {
    const res = await fetch(`${baseUrl}/${entityName}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData)
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
      console.log(data.msg);
      console.log(data.msg);
      console.log(data.msg);
      console.log(data.msg);
      console.log(data.msg);
      console.log(data.msg);
      const errorMsg =
        data?.msg ||
        data?.message ||
        "Error al actualizar";

      throw new Error(errorMsg);
    }

    setItems(prev =>
      prev.map(item => (item.id === id ? data : item))
    );

    return data;
  };


  const deleteItem = async (id) => {
    const res = await fetch(`${baseUrl}/${entityName}/${id}`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error("Error al eliminar");
    setItems((prev) => prev.filter((item) => item.id !== id));
    return res;
  };

  const getItem = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${baseUrl}/${entityName}/${id}`);
      if (!res.ok) throw new Error("Error al obtener el item");

      const data = await res.json();

      // opcional: actualizar el estado si querés mantener items sincronizados
      setItems(prev => {
        const exists = prev.find(item => item.id === id);
        if (exists) {
          return prev.map(item => (item.id === id ? data : item));
        }
        return [...prev, data];
      });

      console.log(data);

      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };


  return {
    items,
    loading,
    error,
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
  };


};
