import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";
import Book from "../book/Book.js";
import Reservations from "./Reservations.js";

const BookReservations = sequelize.define("BookReservations", 
    {
        bookReservationId: {
            autoIncrement:true,
            primaryKey:true,
            type: DataTypes.INTEGER,
            field:"IdReservasLibro",
        },
        BookId: {
            type: DataTypes.INTEGER,
            field: 'IdBook', 
        },
        reservationId: {
            type: DataTypes.INTEGER,
            field: 'IdReserva',
        },

        bookCode: { 
            type: DataTypes.STRING(10),
            field:"CodLibro",
        },
       
        bookTitle: {
            type: DataTypes.STRING(100),
            field: 'TituloLibro'
        }
    },
    {
        tableName: "ReservasLibro", 
        timestamps:false,
        logging:true
    }
);

export default BookReservations;