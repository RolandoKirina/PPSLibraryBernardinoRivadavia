import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

const Reservations = sequelize.define("Reservations",
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            field: "Id"
        },
        bookTitle: {
            type: DataTypes.STRING(100),
            field: 'TituloLibro'
        },
        reservationDate: {
            type: DataTypes.DATEONLY,
            field: 'FechaReserva'
        },
        expectedDate: {
            type: DataTypes.DATEONLY,
            field: 'FechaPrometida'
        },
        partnerNumber: {
            type: DataTypes.INTEGER,
            field: 'NumSocio'
        },
        partnerId: {
            type: DataTypes.INTEGER,
            field: "partnerId",
            allowNull: false
        },
        comments: {
            type: DataTypes.STRING(255),
            field: 'Comentarios'
        }
    },
    {
        underscored: true,
        tableName: "Reservas",
        timestamps: false,
        logging: true
    }
);

export default Reservations;