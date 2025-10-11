import {Op} from "sequelize";


export const buildBookFilters = (query) => {
    const{
        author,
        codeInventory,
        codeCDU,
        codeSignature, 
        yearEdition,
        numberEdition,
        limit, 
        offset
    } = query;

    const whereAuthor ={};
    const whereCodeInventory = {};
    const whereCodeCDU ={};
    const whereCodeSignature = {};
    const whereYearEdition = {};
    const whereNumberEdition = {};


   
  if (author && author.trim() !== '') {
    whereAuthor.name = { [Op.iLike]: `%${author.trim()}%`
  }}

  if (codeInventory && codeInventory.trim() !== '') {
    whereCodeInventory.codeInventory = codeInventory.trim();
  }
  
  if (codeCDU && codeCDU.trim() !== '') {
    whereCodeCDU.codeCDU = codeCDU.trim();
  }

  if (codeSignature && codeSignature.trim() !== '') {
    whereCodeSignature.codeSignature = codeSignature.trim();
  }

    if (yearEdition) {
    whereYearEdition.yearEdition = parseInt(yearEdition);
    }


  if (numberEdition) {
    whereNumberEdition.numberEdition = numberEdition;
  }
  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

     return {
    whereAuthor,
    whereCodeInventory,
    whereCodeCDU,
    whereCodeSignature,
    yearEdition,
    numberEdition,
    limit: isNaN(parsedLimit) ? 20 : parsedLimit,
    offset: isNaN(parsedOffset) ? 0 : parsedOffset
  };
}



export const buildRankingBookFilters = (query) => {
  const {
    retiredDate,
    cduBooksRetiredPartner,
    bookCodeRetiredBooks,
    orderByStatus,
    orderBy,
    limit,
    offset
  } = query;

  const whereRetiredDate = {};
  const whereCDURetiredPartner = {};
  const whereBookCodeRetiredBooks = {};
  const whereOrderByStatus = {};
  const whereOrderBy = {};

  if (retiredDate && retiredDate.trim() !== '') {
    whereRetiredDate.retiredDate = retiredDate.trim(); // Se puede adaptar a Date.parse si el formato lo requiere
  }

  if (cduBooksRetiredPartner && cduBooksRetiredPartner.trim() !== '') {
    whereCDURetiredPartner.codeCDU = cduBooksRetiredPartner.trim();
  }

  if (bookCodeRetiredBooks && bookCodeRetiredBooks.trim() !== '') {
    whereBookCodeRetiredBooks.codeInventory = bookCodeRetiredBooks.trim();
  }



if (orderByStatus && orderByStatus.trim() !== '') {
  order.push(['status', orderByStatus.trim().toUpperCase() === 'ASC' ? 'ASC' : 'DESC']);
}
 let order = undefined;

  if (orderBy && orderBy.trim() !== '') {
    order = sortBy
      ? [[sortBy.trim(), direction === 'asc' ? 'ASC' : 'DESC']]
      : undefined;
  }

  const parsedLimit = parseInt(limit);
  const parsedOffset = parseInt(offset);

  return {
    whereRetiredDate,
    whereCDURetiredPartner,
    whereBookCodeRetiredBooks,
    whereOrderByStatus,
    whereOrderBy,
    limit: isNaN(parsedLimit) ? 20 : parsedLimit,
    offset: isNaN(parsedOffset) ? 0 : parsedOffset
  };
};
