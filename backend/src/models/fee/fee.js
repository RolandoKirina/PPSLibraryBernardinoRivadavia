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
        field: "Mes",
        allowNull: false
    
    },
    year: {
        type: DataTypes.INTEGER,
        field: "Anio",
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        field: "Monto",
        allowNull: false
    },
    idPartner: {
        type: DataTypes.INTEGER,
        field: "IdSocio",        
        allowNull: false

    },
    paid: {
        type: DataTypes.BOOLEAN,
        field: "Paga",
        allowNull: false
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
