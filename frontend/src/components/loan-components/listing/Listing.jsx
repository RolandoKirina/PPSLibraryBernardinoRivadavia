import './Listing.css';
import { titlesByType, columnsByType } from '../../../data/generatedlist/generatedList';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../../auth/AuthContext';
import { generateUniversalPDF } from '../../../utils/pdfGenerator';

export default function Listing({ type }) {
  const BASE_URL = "http://localhost:4000/api/v1";
  const chunkSize = 10000;
  const rowsPerPage = 30;

  const { auth } = useAuth();

  // Estados de datos
  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);
  
  // Estado para el filtro en tiempo real
  const [searchTerm, setSearchTerm] = useState("");

  // Estados de paginación/control
  const [resetPageTrigger, setResetPageTrigger] = useState(0);

  /**
   * Obtiene los items de la API.
   * @param {Object} params - limit, offset y search.
   * @param {boolean} append - Si es true, añade los datos a la lista existente (para scroll/paginación).
   */
  const getItems = async ({ limit, offset, search = "" }, append = false) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${BASE_URL}/loans/print-list/${type}?limit=${limit}&offset=${offset}&search=${search}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${auth.token}`
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}`);
      }

      const data = await response.json();

      setItems(prev =>
        append ? [...prev, ...data.rows] : data.rows
      );

      setTotalItems(data.count);
    } catch (error) {
      console.error('Error en getItems:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Efecto que maneja el cambio de TIPO y el FILTRO con Debounce.
   * Se ejecuta al montar (carga inicial) y cada vez que cambia 'type' o 'searchTerm'.
   */
  useEffect(() => {
    // Si el usuario escribe rápido, cancelamos la ejecución anterior para no saturar la API
    const delayDebounceFn = setTimeout(() => {
      // Al cambiar filtro o tipo, reseteamos la vista a la página 1
      setResetPageTrigger(prev => prev + 1);
      
      // Pedimos los datos desde el inicio (offset 0)
      getItems({ limit: chunkSize, offset: 0, search: searchTerm }, false);
    }, 400); // Espera 400ms tras la última pulsación de tecla

    return () => clearTimeout(delayDebounceFn);
  }, [type, searchTerm]);

  /**
   * Maneja la carga de más datos cuando el usuario cambia de página en el popup.
   */
  async function handleChangePage(page) {
    const numberPage = Number(page);
    const lastItemIndex = numberPage * rowsPerPage;

    // Si necesitamos más datos de los que ya tenemos cargados en 'items'
    if (items.length < totalItems && lastItemIndex > items.length) {
      const newOffset = items.length;

      await getItems(
        { limit: chunkSize, offset: newOffset, search: searchTerm },
        true // Append: true para no borrar lo anterior
      );
    }
  }

  const handlePrint = () => {
    if (items.length === 0) return;

    const title = titlesByType[type];
    const config = columnsByType[type];

    // Extraer Headers
    const headers = config.map(col => col.label || col.text || col.header || "Column");

    // Extraer Datos dinámicamente según la config
    const data = items.map(item => {
      return config.map(col => {
        const key = col.key || col.dataKey || col.field || col.accessor;
        return item[key] ?? '';
      });
    });

    generateUniversalPDF(title, headers, data, `report_${type}`);
  };

  return (
    <div className='preview-list-container'>
      <GenerateListPopup
        dataByType={items}
        totalItems={totalItems}
        columnsByType={columnsByType[type]}
        typeList={type}
        title={titlesByType[type]}
        handleChangePage={handleChangePage}
        loading={loading}
        resetPageTrigger={resetPageTrigger}
        rowsPerPage={rowsPerPage}
        onPrint={handlePrint}
        // Props para que el componente hijo controle el input
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    </div>
  );
}