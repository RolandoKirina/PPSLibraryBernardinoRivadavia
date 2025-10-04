import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const MaritalStatus = sequelize.define("MaritalStatus", 
{
    id: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        field: "Id"
    },
    statusName: {
        type: DataTypes.STRING(50),
        field: "EstadoCivil"
    }
},
{
    underscored: true,
    tableName: "EstadoCivil",
    timestamps: false,
    logging: true
});

export default MaritalStatus;
