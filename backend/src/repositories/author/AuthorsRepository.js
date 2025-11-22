import Authors from '../../models/author/Authors.js';
import { Op } from 'sequelize';
import BookAuthor from '../../models/author/BookAuthor.js';
import Book from '../../models/book/Book.js';
import Loan from '../../models/loan/Loan.js';
import LoanBook from '../../models/loan/LoanBook.js';

export const getAll = async (filters) => {
    const {
        whereAuthor,
        limit,
        offset,
        sortBy,
        direction,
    } = filters;

    const authors = await Authors.findAll({
        attributes: ['id', 'name', 'nationality'],
        where: Object.keys(whereAuthor).length ? whereAuthor : undefined,
        required: Object.keys(whereAuthor).length > 0,
        include: [
            {
                model: BookAuthor,
                as: 'BookAuthors',
                attributes: ['position'],
                include: [
                    {
                        model: Book,
                        as: 'Book',
                        attributes: ['codeInventory', 'title', 'codeClasification', 'codeCDU', 'codeLing'],
                        include: [
                            {
                                model: LoanBook,
                                as: 'BookLoans',
                                attributes: [],
                                required: false,
                                include: [
                                    {
                                        model: Loan,
                                        as: 'Loan',
                                        attributes: [],
                                        required: false,
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]

    });

    const authorsPlain = authors.map(a => a.get({ plain: true }));

    for (const author of authorsPlain) {
        for (const bookAuthor of author.BookAuthors) {
            const book = bookAuthor.Book;

            const isBorrowed = book.LoanBooks?.some(lb => lb.returnedDate === null) || false;

            book.isBorrowed = isBorrowed;
        }
    }

    return authorsPlain;
};

export const getAllByName = async (name) => {
    return await Authors.findAll({
        attributes: ['id', 'name', 'nationality'],
        include: [
            {
                model: BookAuthor,
                as: 'BookAuthors',
                attributes: ['position'],
                include: [
                    {
                        model: Book,
                        as: 'Book',
                        attributes: ['codeInventory', 'title', 'codeClasification', 'codeCDU', 'codeLing']
                    }
                ]
            }
        ],
        where: {
            name: {
                [Op.iLike]: `%${name}%`
            }
        }
    });
};

export const getOne = async (id) => {
    return await Authors.findByPk(id);
};

export const create = async (author) => {
    return await Authors.create(author);
};

// A diferencia de patch, los updates deben tener todos los campos de la entidad
export const update = async (id, updates) => {

    await Authors.update(updates, {
        where: { id: id }
    });

    return await Authors.findByPk(id);
};

export const remove = async (id) => {
    const author = await Authors.findByPk(id);

    if (!author) {
        return null;
    }
    await author.destroy();

    return {
        msg: "Author deleted successfully",
        data: author
    }
}
