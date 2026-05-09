import * as FeeService from "../../services/fee/FeeService.js";
import { HTTP_STATUS } from "../../https/httpsStatus.js";
import { buildFeeFilters } from "../../utils/buildFeeFilters.js";
import { ValidationError } from "../../utils/errors/ValidationError.js";

export const getYearlyReport = async (req, res) => {
    try {
        const { partnerNumber, year, semester } = req.query;

        if (!partnerNumber || !year || !semester) {
            return res.status(400).json({ msg: "Faltan parámetros (partnerNumber, year o semester)" });
        }

        const result = await FeeService.getYearlyReport(partnerNumber, year, semester);

        // Si result es null, significa que el SOCIO no existe en la DB
        if (!result) {
            return res.status(404).json({ msg: "Socio no encontrado" });
        }

        // Si result tiene datos pero Fees está vacío, devolvemos 200 igual
        // Esto permite que el front vea el nombre del socio y la planilla vacía
        res.status(200).json(result);

    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};

export const getUnpaidFeesByPartner = async (req, res) => {
    try {
        const { partnerId } = req.params;
        const { limit, offset, status, year, month, date_of_paid } = req.query; 

        const filters = {
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            status: status,
            year: year,
            month: month,
            date_of_paid: date_of_paid 
        };

        const result = await FeeService.getUnpaidFeesByPartner(partnerId, filters);

        res.status(HTTP_STATUS.OK.code).json(result);
    } catch (e) {
        console.error("Error en getUnpaidFeesByPartner Controller:", e);
        res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const searchGlobalUnpaidFees = async (req, res) => {
    try {
        const {
            limit,
            offset,
            status,
            year,
            month,
            partnerNumber,
            name,
            surname,
            date_of_paid
        } = req.query;

        const filters = {
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            status: status || 'unpaid',
            year: year,
            month: month,
            partnerNumber: partnerNumber,
            name: name,
            surname: surname,
            date_of_paid: date_of_paid // <-- Añadido
        };

        const result = await FeeService.searchGlobalUnpaidFees(filters);

        res.status(HTTP_STATUS.OK.code).json(result);
    } catch (e) {
        console.error("Error en searchGlobalUnpaidFees Controller:", e);
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

export const getFeesTypeOne = async (req, res) => {
    try {
        const { beforeDate, afterDate, limit, offset } = req.query;

        const result = await FeeService.getFeesTypeOne({
            beforeDate,
            afterDate,
            limit: Number(limit),
            offset: Number(offset)
        });

        res.status(HTTP_STATUS.OK.code).json(result);
    } catch (e) {
        console.error("Error getFeesTypeOne:", e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
            msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg
        });
    }
};

export const getFeesTypeTwo = async (req, res) => {
    try {
        const { beforeDate, afterDate, limit, offset } = req.query;

        const result = await FeeService.getFeesTypeTwo({
            beforeDate,
            afterDate,
            limit: Number(limit),
            offset: Number(offset)
        });

        res.status(HTTP_STATUS.OK.code).json(result);
    } catch (e) {
        console.error("Error getFeesTypeTwo:", e);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
            msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg
        });
    }
};

export const generateUnpaidFees = async (req, res) => {
    try {
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
    }

    catch (error) {

        if (error instanceof ValidationError) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST.code)
                .json({ msg: error.message });
        }

        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }

};

export const updateFee = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;

        const newFee = await FeeService.updateFee(id, data);
        res.status(HTTP_STATUS.OK.code).json(newFee);
    }
    catch (error) {

        if (error instanceof ValidationError) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST.code)
                .json({ msg: error.message });
        }

        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};


export const changeState = async (req, res) => {
    try {
        const { id } = req.params;
        const update = req.body;
        if (!update) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: HTTP_STATUS.BAD_REQUEST.msg });
        }
        const newFee = await FeeService.changeState(id, update);
        res.status(HTTP_STATUS.OK.code).json(newFee);
    }
    catch (error) {

        if (error instanceof ValidationError) {
            return res
                .status(HTTP_STATUS.BAD_REQUEST.code)
                .json({ msg: error.message });
        }

        return res
            .status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
            .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};