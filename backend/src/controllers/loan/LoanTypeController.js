import * as LoanTypeService from '../../services/loan/LoanTypeService.js';

export const getAllLoanTypes = async (req, res) => {
    try {
        const loantypes = await LoanTypeService.getAllLoanTypes();
        res.send(loantypes);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getLoanType = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid loantype id" });
        }

        const loantype = await LoanTypeService.getLoanType(id);

        if (!loantype) {
            return res.status(404).json({ msg: `LoanType with id: ${id} not found` });
        }

        res.send(loantype);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const createLoanType = async (req, res) => {
    try {
        const loantype = req.body;

        if (!loantype) {
            return res.status(400).json({ msg: "Invalid loantype body" });
        }

        const newLoanType = await LoanTypeService.createLoanType(loantype);
        res.status(201).send(newLoanType);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateLoanType = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid loantype id" });
        }

        if (!updates) {
            return res.status(400).json({ msg: "Invalid loantype body" });
        }

        const updatedLoanType = await LoanTypeService.updateLoanType(id, updates);
        res.status(200).send(updatedLoanType);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const removeLoanType = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid loantype id" });
        }

        await LoanTypeService.removeLoanType(id);
        res.status(200).json({ msg: `Successfully deleted loantype with id: ${id}` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
