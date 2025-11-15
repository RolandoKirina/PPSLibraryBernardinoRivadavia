import './Listing.css';
import PrintIcon from '../../../assets/img/print-icon.svg';
import { phoneListing, returnDateListing, quantityParnerListing } from '../../../data/generatedlist/loanListings';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
//import { titlesByType, columnsByType } from '../../../data/generatedlist/generatedList';
import { titlesByType, columnsByType  } from '../../../data/generatedlist/generatedList';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Listing({ type }) {
  const [listData, setListData] = useState({});
  const BASE_URL = "http://localhost:4000/api/v1";


  useEffect(() => {

    const fetchItems = async () => {
      const items = await getItems(type);

      setListData(items);

    };

    fetchItems();
  }, [type]);




  const getItems = async (type) => {
    try {
      const response = await fetch(`${BASE_URL}/loans/print-list/${type}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error al obtener los datos: ${response.status}`);
      }

      const data = await response.json();

      return data;
    } catch (error) {
      console.error('Error en getItems:', error);
      return []; // devuelve array vacío si falla
    }
  };


  return (
    <>
      <div className='preview-list-container'>
        <GenerateListPopup
          dataByType={listData}
          columnsByType={columnsByType[type]}
          typeList={type}
          title={titlesByType[type]}
        />
      </div>
    </>
  )
}