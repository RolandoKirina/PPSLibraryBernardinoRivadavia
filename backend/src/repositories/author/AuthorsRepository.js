import Authors from '../../models/author/Authors.js';
import { Op } from 'sequelize';
import BookAuthor from '../../models/author/BookAuthor.js';
import Book from '../../models/book/Book.js';
import Loan from '../../models/loan/Loan.js';
import LoanBook from '../../models/loan/LoanBook.js';
import sequelize from '../../configs/database.js';
import * as BookAuthorRepository from '../author/BookAuthorRepository.js';
import { ValidationError } from '../../utils/errors/ValidationError.js';

export const getAll = async (filters) => {
    const {
        whereAuthor,
        limit,
        offset,
        order,
    } = filters;


    const authors = await Authors.findAll({
        attributes: ['id', 'name', 'nationality'],

        where: Object.keys(whereAuthor).length ? whereAuthor : undefined,
        required: false,
        subQuery: false,

        include: [
            {
                model: BookAuthor,
                as: 'BookAuthors',
                attributes: ['position'],

                include: [
                    {
                        model: Book,
                        as: 'Book',
                        attributes: [
                            'codeInventory',
                            'title',
                            'codeClasification',
                            'codeCDU',
                            'codeLing'
                        ],
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
        ],

        limit,
        offset,
        order
    });

    // Convertir a objetos planos
    const authorsPlain = authors.map(a => a.get({ plain: true }));

    // Calcular isBorrowed
    for (const author of authorsPlain) {
        for (const bookAuthor of author.BookAuthors) {
            const book = bookAuthor.Book;

            const isBorrowed =
                book.BookLoans?.some(lb => lb.returnedDate === null) || false;

            book.isBorrowed = isBorrowed;
        }
    }

    return authorsPlain;
};



export const getOne = async (id) => {
    return await Authors.findByPk(id);
};

// export const create = async (author) => {
//     if (!author.name.trim() || !author.nationality.trim()) {
//     throw new Error("Los campos Nombre y Nacionalidad no pueden estar vacíos");
//     }
//     return await Authors.create(author);
// };

export const create = async (author) => {
    if (!author.name.trim() || !author.nationality.trim()) {
    throw new ValidationError("Los campos Nombre y Nacionalidad no pueden estar vacíos");
    }

    const transaction = await sequelize.transaction();

    try {
        const authorData = {
            name: author.name,
            nationality: author.nationality
        }

        const newAuthor = await Authors.create(authorData, { transaction });

        const newAuthorId = newAuthor.dataValues.id;

        const authorBooks = author.books.map(book => ({
            BookId: book.BookId,
            bookCode: book.codeInventory,
            authorCode: newAuthorId,
            authorName: author.name,
            position: book.position
        }));

        await Promise.all(
            authorBooks.map(authorBook => BookAuthorRepository.create(authorBook, transaction))
        );

        await transaction.commit();

        return {
        msg: "Author creado correctamente",
        authorId: newAuthorId,
        };

    }
    catch(err) {
        await transaction.rollback();
        throw err;
    }


};

export const update = async (id, updates) => {
    if (!updates.name.trim() || !updates.nationality.trim()) {
    throw new ValidationError("Los campos Nombre y Nacionalidad no pueden estar vacíos");
    }

    const transaction = await sequelize.transaction();

    try {
        await Authors.update(updates, {
            where: { id: id }, transaction
        });

        await BookAuthor.destroy({
            where: { authorCode: id },
            transaction
        });

        const newAssociations = updates.books.map(book => ({
            BookId: book.BookId,
            bookCode: book.codeInventory,
            authorCode: id,
            position: book.position
        }));

        await Promise.all(
            newAssociations.map(assoc =>
                BookAuthorRepository.create(assoc, transaction)
            )
        );

        await transaction.commit();

        return {
            msg: "Autor actualizado correctamente",
            updatedId: id
        };

    } catch (err) {
        await transaction.rollback();
        throw err;
    }


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
