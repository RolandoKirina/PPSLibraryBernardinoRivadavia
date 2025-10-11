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