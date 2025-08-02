
import GenericSection from '../../components/generic/GenericSection/GenericSection.jsx';


export default function PartnerSection(){

    const partners = [{id: 1, partnerName: "Maria", partnerSurname: "Rolando", 
        statePartner: false, DNI: "45324233", telephone: "2494354658", collectionadress:
         "Brown 103",pendingbooks:3,unpaidfees: 2, reasonwithdrawal,category: "regular"}];

        
     return (
        <>
        
          <GenericSection title="Listado socios" filters={<PartnerFilter/>} 
          columns={columns} data={partners} popups={partnersPopUp}
            // actions={
            //   <BookButtons  
            //     addBook={() => setPopupAddBook(true)} 
            //     duplicateBook={() => setPopUpDuplicateBook(true)}
            //   />
            // }
          
          ></GenericSection>
    
    
    
    
    
        
        </>
      );
}