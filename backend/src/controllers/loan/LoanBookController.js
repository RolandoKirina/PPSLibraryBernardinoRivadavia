import * as LoanBookService from '../../services/loan/LoanBookService.js';

export const getAllLoanBooks = async (req, res) => {
    try {
        const loanbooks = await LoanBookService.getAllLoanBooks();
        res.send(loanbooks);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const getLoanBook = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid loanbook id" });
        }

        const loanbook = await LoanBookService.getLoanBook(id);

        if (!loanbook) {
            return res.status(404).json({ msg: `LoanBook with id: ${id} not found` });
        }

        res.send(loanbook);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const createLoanBook = async (req, res) => {
    try {
        const loanbook = req.body;

        if (!loanbook) {
            return res.status(400).json({ msg: "Invalid loanbook body" });
        }

        const newLoanBook = await LoanBookService.createLoanBook(loanbook);
        res.status(201).send(newLoanBook);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const updateLoanBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid loanbook id" });
        }

        if (!updates) {
            return res.status(400).json({ msg: "Invalid loanbook body" });
        }

        const updatedLoanBook = await LoanBookService.updateLoanBook(id, updates);
        res.status(200).send(updatedLoanBook);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};

export const removeLoanBook = async (req, res) => {
    try {
        const { id } = req.params;

        if (!id || isNaN(Number(id))) {
            return res.status(400).json({ msg: "Invalid loanbook id" });
        }

        await LoanBookService.removeLoanBook(id);
        res.status(200).json({ msg: `Successfully deleted loanbook with id: ${id}` });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Internal server error" });
    }
};
