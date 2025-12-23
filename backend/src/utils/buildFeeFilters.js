import { Op } from "sequelize";
import Sequelize from "sequelize";

export const buildFeeFilters = (query) => {
  const {
    partnerNumber,
    name,
    surname,
    paymentdate,
    status,
    beforeDate,
    afterDate
  } = query;

    const whereFees = {};
    const wherePartner ={};

     if (status === "unpaid") {
        whereFees.paid = false;
      } else if (status === "paid") {
        whereFees.paid = true;
      }

        if (paymentdate) {
          const start = new Date(`${paymentdate}T00:00:00Z`);
          const end   = new Date(`${paymentdate}T23:59:59Z`);
          whereFees.date_of_paid = {
            [Op.gte]: start,
            [Op.lte]: end
          };
        }
              

    if (partnerNumber !== undefined && partnerNumber !== null && partnerNumber !== "") {
      const parsedPartnerNumber = Number(partnerNumber);
      console.log(parsedPartnerNumber)
      if (!isNaN(parsedPartnerNumber)) {
        wherePartner.partnerNumber = parsedPartnerNumber;
      }
    }

    console.log("wherePartner:", wherePartner);
  console.log("whereFees:", whereFees);

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

const buildFeeListFilters = (query) => {


  const {
    beforeDate,
    afterDate,
    typeList,
  } = query;
  
  if (beforeDate && afterDate) {
      const start = new Date(`${beforeDate}T00:00:00Z`);
      const end = new Date(`${afterDate}T23:59:59Z`);
      whereFees.month_and_year = {
        [Op.gte]: start,
        [Op.lte]: end
      };
  }
}