import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const Fee = sequelize.define("Fee", 
{
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: "Id"
    },
    month: {
        type: DataTypes.INTEGER,
        field: "Mes"
    },
    year: {
        type: DataTypes.INTEGER,
        field: "Anio"
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        field: "Monto"
    },
    id_partner: {
        type: DataTypes.INTEGER,
        field: "IdSocio"
    },
    paid: {
        type: DataTypes.BOOLEAN,
        field: "Paga"
    },
    observation: {
        type: DataTypes.TEXT,
        field: "Observacion"
    },
    date_of_paid: {
        type: DataTypes.DATE,
        field: "FechaPago"
    }
},
{
    underscored: true,
    tableName: "Cuotas",
    timestamps: false,
    logging: true
});

export default Fee;
