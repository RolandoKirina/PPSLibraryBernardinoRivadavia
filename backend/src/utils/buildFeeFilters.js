import { Op } from "sequelize";

export const buildFeeFilters = (query) => {
  const {
    name,
    surname,
    paymentdate
  } = query;

  const whereName = {};
  const whereSurname = {};
  const wherepaymentdate = {};

  if (name && name.trim() !== '') {
    whereName.name = {
      [Op.iLike]: `%${name.trim()}%`
    }
  }

  if (surname && surname.trim() !== '') {
    whereSurname.surname = {
      [Op.iLike]: `%${surname.trim()}%`
    }
  }

   if (paymentdate) {
    wherepaymentdate.date_of_paid = { [Op.gte]: new Date(paymentdate) };
   }

  return {
    whereName,
    whereSurname,
    wherepaymentdate
  };
}
