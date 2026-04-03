import { useState, useEffect } from "react";
import { useAuth } from "../auth/AuthContext";

export const useEntityManagerAPI = (entityName, baseUrl = "http://localhost:4000/api/v1") => {
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [others, setOthers] = useState(null);
  const { auth } = useAuth();

  const getItems = async (filters = {}, append = false) => {
    setLoading(true);
    setError(null);

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
      const res = await fetch(`${baseUrl}/${entityName}${query}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`
        }
      });

      if (!res.ok) throw new Error("Error al obtener datos");

      const { rows, count, others } = await res.json();


      console.log(rows);
      setTotalItems(count ?? 0);

      setItems(prev =>
        append ? [...prev, ...(rows || [])] : (rows || [])
      );

      setOthers(others);

      return rows || [];
    } catch (err) {
      setError(err.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  const createItem = async (newItem) => {
    const res = await fetch(`${baseUrl}/${entityName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.token}`
      },

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
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.token}`
      },
      body: JSON.stringify(updatedData)
    });

    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (!res.ok) {
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
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${auth.token}`
      },
    });
    if (!res.ok) throw new Error("Error al eliminar");
    setItems((prev) => prev.filter((item) => item.id !== id));
    return res;
  };

  const getItem = async (id) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`${baseUrl}/${entityName}/${id}`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${auth.token}`
        }
      });
      if (!res.ok) throw new Error("Error al obtener el item");

      const data = await res.json();

      setItems(prev => {
        const exists = prev.find(item => item.id === id);
        if (exists) {
          return prev.map(item => (item.id === id ? data : item));
        }
        return [...prev, data];
      });

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
    totalItems,
    loading,
    error,
    others,
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem
  };


};
