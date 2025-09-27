import * as LoanTypeService from '../../services/loan/LoanTypeService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';

export const getAllLoanTypes = async (req, res) => {
    try {
        const loantypes = await LoanTypeService.getAllLoanTypes();
        res.status(HTTP_STATUS.OK.code).send(loantypes);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getLoanType = async (req, res) => {
    try {
        const { id } = req.params;

        const loantype = await LoanTypeService.getLoanType(id);

        if (!loantype) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `LoanType with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(loantype);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createLoanType = async (req, res) => {
    try {
        const loantype = req.body;

        if (!loantype) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid loantype body" });
        }

        const newLoanType = await LoanTypeService.createLoanType(loantype);
        res.status(HTTP_STATUS.CREATED.code).send(newLoanType);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateLoanType = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid loantype body" });
        }

        const updatedLoanType = await LoanTypeService.updateLoanType(id, updates);
        res.status(HTTP_STATUS.OK.code).send(updatedLoanType);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const removeLoanType = async (req, res) => {
    try {
        const { id } = req.params;

        await LoanTypeService.removeLoanType(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted loantype with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
