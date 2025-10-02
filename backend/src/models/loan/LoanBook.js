import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";
import Book from "../book/Book.js";

const LoanBook = sequelize.define("LoanBook", 
    {   
        bookId: {
            type: DataTypes.INTEGER,
            field: 'IdBook', 
            references: {
                model: Book,
                key: 'id'
            },
            primaryKey:true,
        },
        bookCode: {
            type: DataTypes.STRING(50), 
            field: 'CodLibro',
        },
        loanId: {
            primaryKey: true,
            type: DataTypes.INTEGER,
            field:"IdPrestamo",
            references: {
                model: 'Prestamo',
                key: 'Id'
            }
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
        timestamps:false,
        logging:true
    }
);

export default LoanBook;

