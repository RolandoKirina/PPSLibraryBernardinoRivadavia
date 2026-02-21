import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const LastGeneration = sequelize.define("LastGeneration",
    {
        month: {
            type: DataTypes.SMALLINT,
            field: "Mes"
        },
        year: {
            type: DataTypes.SMALLINT,
            field: "Anio"
        },
        date: {
            type: DataTypes.DATEONLY,
            field: "Fecha"
        },
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            field: "id"
        },
    },
    {
        underscored: true,
        tableName: "UltimaGeneracion",
        timestamps: false,
        logging: true
    });

export default LastGeneration;