import './PartnerMemo.css';
import { useEffect, useState } from 'react';
import { useAuth } from '../../../auth/AuthContext'; 

// Definimos la URL base fuera del componente para que sea más fácil de mantener
const API_URL = "http://localhost:4000/api/v1/partners/partner-number/";

export default function PartnerMemo({ partnerNumber }) {
  const [observation, setObservation] = useState("Cargando...");
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchPartnerData = async () => {
      
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}${partnerNumber}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${auth.token}` 
          }
        });

        if (!response.ok) {
          throw new Error('Error en la respuesta del servidor');
        }

        const data = await response.json();

        const result = Array.isArray(data) ? data[0] : data;
        setObservation(result?.observations || "No se encontraron observaciones");
        
      } catch (error) {
        console.error("Error al obtener datos del socio:", error);
        setObservation("Error al cargar la información");
      } finally {
        setLoading(false);
      }
    };

    if (partnerNumber) {
      fetchPartnerData();
    }
  }, [partnerNumber]);

  return (
    <div className="partner-memo">
      <p>
        <strong>Información Nota/Observación del Socio:</strong><br />
        {loading ? "Cargando..." : observation}
      </p>
    </div>
  );
}