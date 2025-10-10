import *  as StateBookService from "../../services/book/StatsBookService.js";
import { HTTP_STATUS } from "../../https/httpsStatus.js";




export const getQuantityBooksAndPartners = async (req, res) => {
    try {
         const queryOptions = req.query;

        const response = await StateBookService.getQuantityBooksAndPartners(queryOptions);
       
        res.status(HTTP_STATUS.OK.code).send(response);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
