import * as StateBookRepository from "../../repositories/book/StatsBookRepository.js";


export const getQuantityBooksAndPartners = async () => {
    const response = await StateBookRepository.getQuantityBooksAndPartners();
    return response;
};
