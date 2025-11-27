import * as ReaderBookService from '../../services/reader/ReaderBookService.js';
import { HTTP_STATUS } from '../../https/httpsStatus.js';

export const getAllReaderBooks = async (req, res) => {
    try {
        const result = await ReaderBookService.getAllReaderBooks();
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
           .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const getReaderBook = async (req, res) => {
    try {
        const { id } = req.params;

        const result = await ReaderBookService.getReaderBook(id);
        if (!result) {
            return res.status(HTTP_STATUS.NOT_FOUND.code)
                      .json({ msg: `ReaderBook with id: ${id} not found` });
        }

        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
           .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const verifyIfBookIsNotRepeated = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ReaderBookService.verifyIfBookIsNotRepeated(id);

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

export const createReaderBook = async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code)
                      .json({ msg: "Invalid ReaderBook body" });
        }

        const result = await ReaderBookService.createReaderBook(data);
        res.status(HTTP_STATUS.CREATED.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
           .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const updateReaderBook = async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        if (!updates) {
            return res.status(HTTP_STATUS.BAD_REQUEST.code)
                      .json({ msg: "Invalid ReaderBook body" });
        }

        const result = await ReaderBookService.updateReaderBook(id, updates);
        res.status(HTTP_STATUS.OK.code).send(result);
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
           .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};

export const deleteReaderBook = async (req, res) => {
    try {
        const { id } = req.params;

        await ReaderBookService.removeReaderBook(id);
        res.status(HTTP_STATUS.OK.code)
           .json({ msg: `Successfully deleted ReaderBook with id: ${id}` });
    } catch (error) {
        console.error(error);
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR.code)
           .json({ msg: HTTP_STATUS.INTERNAL_SERVER_ERROR.msg });
    }
};
