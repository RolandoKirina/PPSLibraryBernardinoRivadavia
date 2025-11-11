import { useState, useEffect } from "react";

export function useEntityLookup(fieldValue, url, delayMs = 600) {
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const value = fieldValue?.toString().trim();
    if (!value) {
      setData(null);
      setError('');
      setLoading(false);
      return;
    }

    const delay = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`${url}${value}`);
        if (!res.ok) throw new Error("No encontrado");
        const json = await res.json();
        const entity = Array.isArray(json) ? json[0] : json;

        if (entity && Object.keys(entity).length) {
          setData(entity);
          setError('');
        } else {
          setData(null);
          setError('No encontrado');
        }
      } catch {
        setData(null);
        setError('No encontrado');
      } finally {
        setLoading(false);
      }
    }, delayMs);

    return () => clearTimeout(delay);
  }, [fieldValue, url, delayMs]);

  return { data, error, loading };
}
