import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const statePartner = sequelize.define("statePartner", 
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "Id"
    },
    status: {
        type: DataTypes.STRING(50),
        field: "Estado"
    }
},
{
    underscored: true,
    tableName: "EstadoSocio",
    timestamps: false,
    logging: true
});

export default statePartner;
