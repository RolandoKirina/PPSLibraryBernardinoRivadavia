import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const BookReservation = sequelize.define("BookReservation", 
{
    bookCode: {
        type: DataTypes.STRING(10),
        field: "CodLibro"
    },
    reservationId: {
        type: DataTypes.INTEGER,
        field: "IdReserva"
    },
    bookTitle: {
        type: DataTypes.STRING(100),
        field: "TituloLibro"
    }
},
{
    underscored: true,
    tableName: "ReservaLibro",
    timestamps: false,
    logging: true
});

export default BookReservation;
