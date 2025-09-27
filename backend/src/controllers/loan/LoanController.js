import * as LoanService from '../../services/loan/LoanService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';

export const getAllLoans = async (req, res) => {
    try {
        const loans = await LoanService.getAllLoans();
        res.status(HTTP_STATUS.OK.code).send(loans);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getLoan = async (req, res) => {
    try {
        const { id } = req.params;

        const loan = await LoanService.getLoan(id);

        if (!loan) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `Loan with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(loan);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createLoan = async (req, res) => {
    try {
        const loan = req.body;

        if (!loan) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid loan body" });
        }

        const newLoan = await LoanService.createLoan(loan);
        res.status(HTTP_STATUS.CREATED.code).send(newLoan);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid loan body" });
        }

        const newLoan = await LoanService.updateLoan(id, updates);
        res.status(HTTP_STATUS.OK.code).send(newLoan);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const removeLoan = async (req, res) => {
    try {
        const { id } = req.params;

        await LoanService.removeLoan(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted loan with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
