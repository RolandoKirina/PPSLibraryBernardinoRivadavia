import { Op } from "sequelize";

export const buildFeeFilters = (query) => {
  const {
    partnerNumber,
    name,
    surname,
    paymentdate,
    unpaidfees,
  } = query;

  const whereFees = {};
  const wherePartner ={};

  console.log(unpaidfees)
  const unpaid = String(unpaidfees) === "true";
  if (unpaidfees !== undefined) {
    whereFees.paid = unpaid ? false : true;
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
    
   if (paymentdate) {
     whereFees.date_of_paid = { [Op.eq]: new Date(paymentdate) };
   }
  return {
    wherePartner,
    whereFees,
  };
}
