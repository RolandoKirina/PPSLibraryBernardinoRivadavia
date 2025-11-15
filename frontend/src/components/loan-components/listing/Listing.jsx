import './Listing.css';
import PrintIcon from '../../../assets/img/print-icon.svg';
import { phoneListing, returnDateListing, quantityParnerListing } from '../../../data/generatedlist/loanListings';
import GenerateListPopup from '../../common/generatelistpopup/GenerateListPopup';
import { titlesByType, columnsByType, dataByType } from '../../../data/generatedlist/generatedList';

export default function Listing({ type }) {
  
  return (
    <>
      <div className='preview-list-container'>
        <GenerateListPopup
          dataByType={dataByType}
          columnsByType={columnsByType}
          typeList={type}
          title={titlesByType[type]}
        />
      </div>
    </>
  )
}