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
   if (paymentdate && !unpaid) {
      const start = new Date(paymentdate);
      const end = new Date(paymentdate);

      end.setDate(end.getDate() + 1);

      whereFees.date_of_paid = {
        [Op.between]: [start, end]
      };
    }


  return {
    wherePartner,
    whereFees,
  };
}

