import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

const LoanBook = sequelize.define("LoanBook", 
    {   
        bookCode: {
            type: DataTypes.STRING(50), 
            field: 'CodLibro',
            primaryKey:true,
            // references: {
            //     model: 'Libros',
            //     key: 'Codigo' 
            // }
        },
        loanId: {
            autoIncrement:true,
            primaryKey:true,
            type: DataTypes.INTEGER,
            field:"IdPrestamo",
            references: {
                model: 'Prestamo',
                key: 'Id'
            }
        },
        expectedDate: {
            type: DataTypes.DATE,
            field: 'FechaPrevista'
        },
        returnedDate: {
            type: DataTypes.DATE,
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

