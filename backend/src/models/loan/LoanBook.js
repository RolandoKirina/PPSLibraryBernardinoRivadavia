import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";
import Book from "../book/Book.js";

const LoanBook = sequelize.define("LoanBook",
    {
        LoanBookId: {
            type: DataTypes.INTEGER,
            field: 'LoanBookId',
            autoIncrement: true,
            primaryKey: true,
        },
        BookId: {
            type: DataTypes.INTEGER,
            field: 'BookId',
        },
        loanId: {
            type: DataTypes.INTEGER,
            field: "IdPrestamo",
        },
        bookCode: {
            type: DataTypes.STRING(50),
            field: 'CodLibro',
        },

        expectedDate: {
            type: DataTypes.DATEONLY,
            field: 'FechaPrevista'
        },
        returnedDate: {
            type: DataTypes.DATEONLY,
            field: 'FechaDevolucion'
        },
        reneweAmount: {
            type: DataTypes.INTEGER,
            field: 'CantRenovacion'
        },
        returned: {
            type: DataTypes.BOOLEAN,
            field: 'Devuelto'
        },
        copy: {
            type: DataTypes.INTEGER,
            field: 'Ejemplar'
        }
    },
    {
        underscored: true,
        tableName: "PrestamoLibro",
        timestamps: false,
        logging: true
    }
);

export default LoanBook;

