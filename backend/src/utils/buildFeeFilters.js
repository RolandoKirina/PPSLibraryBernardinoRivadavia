import { Op } from "sequelize";
import Sequelize from "sequelize";

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

        if (unpaidfees === "true") {
          whereFees.paid = false;
        }
        else if (unpaidfees === "false") {
          whereFees.paid = true;
        } 

    if (unpaidfees !== "true") {
      if (paymentdate) {
        const start = new Date(`${paymentdate}T00:00:00Z`);
        const end   = new Date(`${paymentdate}T23:59:59Z`);

        whereFees.date_of_paid = {
          [Op.gte]: start,
          [Op.lte]: end
        };
      }
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

