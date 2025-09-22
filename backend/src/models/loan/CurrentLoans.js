//es una vista

/*
import sequelize from "../configs/database.js";
import { DataTypes } from "sequelize";

const CurrentLoans = sequelize.define("CurrentLoans", 
    {
        id: {
            autoIncrement:true,
            primaryKey:true,
            type: DataTypes.INTEGER,
            field:"Id"
        },
        bookTitle: {
            type: DataTypes.STRING(100),
            field: 'TituloLibro'
        },
        reservationDate: {
            type: DataTypes.DATE,
            field: 'FechaReserva'
        },
        expectedDate: {
            type: DataTypes.DATE,
            field: 'FechaPrometida'
        },
        partnerNumber: {
            type: DataTypes.INTEGER,
            field: 'NumSocio'
        },
        comments: {
            type: DataTypes.STRING(255),
            field: 'Comentarios'
        }
    },
    {
        underscored: true,
        tableName: "PrestamosActuales", 
        timestamps:false,
        logging:true
    }
);

export default CurrentLoans;

*/