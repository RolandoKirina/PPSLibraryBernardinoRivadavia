import * as StateBookRepository from "../../repositories/book/StatsBookRepository.js";
import { Op } from "sequelize";

export const getQuantityBooksAndPartners = async (params) => {
    const where = {};
    const {withdrawStartDate,withdrawEndDate}=params;
    if(withdrawStartDate){
        where.retiredDate= {[Op.gte]: new Date(withdrawStartDate)};
    }
    if(withdrawEndDate){
        where.retiredDate={
            ...(where.retiredDate || {}),
            [Op.lte]: new Date(withdrawEndDate)
        }
    }
    const response = await StateBookRepository.getQuantityBooksAndPartners(where);
    return response;
};
