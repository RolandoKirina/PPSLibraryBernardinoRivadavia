import * as LoanService from '../../services/loan/LoanService.js';

export const getAllLoans = async (req, res) => {
    try {
        const loans = await LoanService.getAllLoans();
        res.send(loans);
    }
    catch (error) {
        console.error(e);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export const getLoan = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid loan id" });
        }

        const loan = await LoanService.getLoan(id);

        if(!loan) {
            return res.status(404).json({ msg: "Loan with id: "+id+" not found" });
            
        }
        res.send(loan);
    }
    catch (error) {
        console.error(e);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export const createLoan = async (req, res) => {
    try {
        const loan = req.body;

        if(!loan) {
            return res.status(400).json({ msg: "Invalid loan body" });
        }

        const newLoan = await LoanService.createLoan(loan);
        res.status(201).send(newLoan);
    }
    catch (error) {
        console.error(e);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export const updateLoan = async (req, res) => {
    try {
        const { id } = req.params;
        const updates  = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid loan id" });
        }

        if(!updates) {
            return res.status(400).json({ msg: "Invalid loan body" });
        }

        const newLoan = await LoanService.updateLoan(id, updates);
        res.status(201).send(newLoan);
    }
    catch (error) {
        console.error(e);
        res.status(500).json({ msg: "Internal server error" });
    }
}

export const removeLoan = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid loan id" });
        }

        await LoanService.removeLoan(id);
        res.status(200).json({ msg: "Successfuly deleted loan with id: "+id});
    }
    catch (error) {
        console.error(e);
        res.status(500).json({ msg: "Internal server error" });
    }
}