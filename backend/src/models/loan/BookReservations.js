import sequelize from "../configs/database.js";
import { DataTypes } from "sequelize";

const BookReservations = sequelize.define("BookReservations", 
    {
        bookCode: { 
            type: DataTypes.STRING(10),
            field:"CodLibro",
            primaryKey: true
        },
        reservationId: {
            autoIncrement:true,
            primaryKey:true,
            type: DataTypes.INTEGER,
            field:"IdReserva"
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