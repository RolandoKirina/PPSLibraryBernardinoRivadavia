import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const Fees = sequelize.define("Fees", 
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
    idPartner: {
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

export default Fees;
