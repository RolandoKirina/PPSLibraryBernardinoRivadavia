import * as LoanBookService from '../../services/loan/LoanBookService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';

export const getAllLoanBooks = async (req, res) => {
    try {
        const loanbooks = await LoanBookService.getAllLoanBooks();
        res.status(HTTP_STATUS.OK.code).send(loanbooks);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
export const verifyIfBookIsNotRepeated = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await LoanBookService.verifyIfBookIsNotRepeated(id);

    return res.status(HTTP_STATUS.OK.code).json({
      success: result.available,
      ...result
    });
  } catch (error) {
    console.error(error);
    res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({
      success: false,
      message: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg
    });
  }
};



export const getLoanBook = async (req, res) => {
    try {
        const { id } = req.params;

        const loanbook = await LoanBookService.getLoanBook(id);

        if (!loanbook) {
            return res.status(HTTP_STATUS.NOT_FOUND.code).json({ msg: `LoanBook with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(loanbook);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const createLoanBook = async (req, res) => {
    try {
        const loanbook = req.body;

        if (!loanbook) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid loanbook body" });
        }

        const newLoanBook = await LoanBookService.createLoanBook(loanbook);
        res.status(HTTP_STATUS.CREATED.code).send(newLoanBook);
    } catch (error) {
        console.error(error);

        if (error.original && error.original.message) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: error.original.message });
        }

        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateLoanBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code).json({ msg: "Invalid loanbook body" });
        }

        const updatedLoanBook = await LoanBookService.updateLoanBook(id, updates);
        res.status(HTTP_STATUS.OK.code).send(updatedLoanBook);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const removeBooksOfLoan = async (req, res) => {
    try {
        const { id } = req.params;

        await BookAuthorService.removeBooksOfLoan(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted bookAuthors with authorCode: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const removeLoanBook = async (req, res) => {
    try {
        const { id } = req.params;

        await LoanBookService.removeLoanBook(id);
        res.status(HTTP_STATUS.OK.code).json({ msg: `Successfully deleted loanbook with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code).json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
