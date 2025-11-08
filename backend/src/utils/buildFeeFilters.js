import { Op } from "sequelize";

export const buildFeeFilters = (query) => {
  const {
    name,
    surname,
    paymentdate,
    unpaidfees,
  } = query;

  console.log(query)
  const whereFees = {};
  const wherePartner ={};

  const unpaid = unpaidfees === "true";
    if (name && name.trim() !== '') {
    wherePartner.name = {
        [Op.iLike]: `%${name.trim()}%`
    };
    }

    if (surname && surname.trim() !== '') {
    wherePartner.surname = {
        [Op.iLike]: `%${surname.trim()}%`
    };
    
    if (unpaid === true) {
            whereFees.paid = false;
    }   
    else{
        whereFees.paid = true;
    }
    }
   if (paymentdate) {
     whereFees.date_of_paid = { [Op.eq]: new Date(paymentdate) };
   }
  return {
    wherePartner,
    whereFees,
  };
}
