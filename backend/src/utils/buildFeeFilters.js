import { Op } from "sequelize";
import Date from 'date';


export const buildFeeFilters = (query) => {
  const {
    partnerNumber,
    name,
    surname,
    paymentdate,
    unpaidfees,
  } = query;

  console.log("Filtros enviados:", query);

  const whereFees = {};
  const wherePartner ={};

      if (unpaidfees === "true") {
        whereFees.paid = false;
      }
       else if (unpaidfees === "false") {
        whereFees.paid = true;
      } else {

  whereFees.paid = true;
}



      if (unpaidfees === "true") {
        delete whereFees.date_of_paid;  // Ignorar si llega
      }

     if (paymentdate && unpaidfees==="false") {
       
       const start = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
      const end = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate() + 1));
        end.setDate(end.getDate() + 1);

        whereFees.date_of_paid = { [Op.between]: [start, end] };

    }

      const parsedPartnerNumber = Number(partnerNumber);
      if (!isNaN(parsedPartnerNumber)) {
        wherePartner.partnerNumber = parsedPartnerNumber;
      }
    
      if (name && name.trim() !== '') {
      wherePartner.name = {
          [Op.iLike]: `%${name.trim()}%`
      };
      }

      if (surname && surname.trim() !== '') {
      wherePartner.surname = {
          [Op.iLike]: `%${surname.trim()}%`
      };
      
      }



  return {
    wherePartner,
    whereFees,
  };
}

