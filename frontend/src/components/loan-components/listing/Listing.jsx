import './Listing.css';
import PrintIcon from '../../../assets/img/print-icon.svg';
import { titlesByType, columnsByType } from '../../../data/generatedlist/generatedList';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
import { useEffect, useState } from 'react';

export default function Listing({ type }) {
  const BASE_URL = "http://localhost:4000/api/v1";

  const chunkSize = 100;
  const rowsPerPage = 30;

  const [items, setItems] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const [offsetActual, setOffsetActual] = useState(0);
  const [resetPageTrigger, setResetPageTrigger] = useState(0);

  const getItems = async ({ limit, offset }, append = false) => {
    try {
      setLoading(true);

      const response = await fetch(
        `${BASE_URL}/loans/print-list/${type}?limit=${limit}&offset=${offset}`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' }
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

  useEffect(() => {
    setOffsetActual(0);
    setResetPageTrigger(prev => prev + 1);
    setItems([]);

    getItems({ limit: chunkSize, offset: 0 });
  }, [type]);

  async function handleChangePage(page) {
    const numberPage = Number(page);
    const lastItemIndex = numberPage * rowsPerPage;

    if (items.length < totalItems && lastItemIndex > items.length) {
      const newOffset = items.length;

      await getItems(
        { limit: chunkSize, offset: newOffset },
        true
      );

      setOffsetActual(newOffset);
    }
  }

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
      />
    </div>
  );
}
