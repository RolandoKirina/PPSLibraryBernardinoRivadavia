import * as FeeService from "../../services/fee/FeeService.js";
import { HTTP_STATUS } from "../../https/httpsStatus.js";
import { buildFeeFilters } from "../../utils/buildFeeFilters.js";


export const getUnpaidFeesByPartner = async (req, res) => {
  try {
    const { partnerId } = req.params;
    const fees = await FeeService.getUnpaidFeesByPartner(partnerId);

    res.status(HTTP_STATUS.OK.code).json(fees);
  } catch (e) {
    console.error(e);
    res
      .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
      .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
  }
};


export const getAllFees = async (req, res) => {
    try {
        const queryOptions = buildFeeFilters(req.query);
        const fees = await FeeService.getAllFees(queryOptions);
        res.status(HTTP_STATUS.OK.code).json(fees);  
    } catch (e) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const generateUnpaidFees = async (req, res) => {
    try {
        console.log(req.body)
        const fees = await FeeService.generateUnpaidFees(req.body);
        res.status(HTTP_STATUS.OK.code).json(fees);  
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.BAD_REQUEST.code).json({ message: e.message });
    }
};

export const getPaidFeeCountByPartner = async (req, res) => {

    const { partnerNumber } = req.query;
    if (!partnerNumber) {
        return res.status(BAD_REQUEST).json({ error: "Falta el número de socio" });
    }

    try {
        const count = await FeeService.getQuantityPaidFees(partnerNumber);
        return res.json({ count });
    } 
    catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json({ error: "Error al contar cuotas pagas" });
    }
    
};


export const getFee = async (req, res) => {
    try {
        const fee = await FeeService.getFee(req.params.id);

        if (!fee) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: HTTP_STATUS.NOT_FOUND.msg });
        }

        res.status(HTTP_STATUS.OK.code).json(fee);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createFee = async (req, res) => {
    try {
        const fee = req.body;
        if (!fee) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newFee = await FeeService.createFee(fee);
        res.status(HTTP_STATUS.CREATED.code).json(newFee);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateFee = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newFee = await FeeService.updateFee(id, updates);
        res.status(HTTP_STATUS.OK.code).json(newFee);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const deleteFee = async (req, res) => {
    try {
        const { id } = req.params;

        const deleted = await FeeService.deleteFee(id);
        if (!deleted) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: "Fee not found" });
        }

        return res.status(HTTP_STATUS.OK.code).json(deleted);
    } catch (e) {
        console.error(e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
