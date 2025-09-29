import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const reasonForWithDrawal = sequelize.define("reasonForWithDrawal", 
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "Id"
    },
    reason: {
        type: DataTypes.STRING(50),
        field: "Motivo"
    }
},
{
    underscored: true,
    tableName: "MotivoBaja",
    timestamps: false,
    logging: true
});

export default reasonForWithDrawal;
