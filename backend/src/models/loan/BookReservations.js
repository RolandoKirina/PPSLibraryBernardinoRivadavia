import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";
import Book from "../book/Book.js";

const BookReservations = sequelize.define("BookReservations", 
    {
        idBook: {
        type: DataTypes.INTEGER,
        field: 'IdBook', 
        references: {
            model: Book,
            key: 'id'
        },
        allowNull: false
        },
        bookCode: { 
            type: DataTypes.STRING(10),
            field:"CodLibro",
        },
        reservationId: {
            autoIncrement:true,
            primaryKey:true,
            type: DataTypes.INTEGER,
            field:"IdReserva",
            references: {
                model: 'Reservas',
                key: 'Id'
            }
        },
        bookTitle: {
            type: DataTypes.STRING(100),
            field: 'TituloLibro'
        }
    },
    {
        underscored: true,
        tableName: "ReservasLibro", 
        timestamps:false,
        logging:true
    }
);

export default BookReservations;