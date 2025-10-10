import sequelize  from "../../configs/database.js";
import Book from "../../models/book/Book.js";
import Partner from "../../models/partner/Partner.js";
import Loan from "../../models/loan/Loan.js";
import LoanBook from "../../models/loan/LoanBook.js";

export const getQuantityBooksAndPartners = async (where) => {
  
  const quantitypartners = await Partner.count({
    include: [
      {
        model: Loan,
        required: true,
        where, 
      },
    ],
    distinct: true, 
  });

  
  const quantitybooks = await Book.count({
    include: [
      {
        model: LoanBook,
        required: true,
        include: [
          {
            model: Loan,
            required: true,
            where, 
          },
        ],
      },
    ],
  });

  return { quantitypartners, quantitybooks };
};