import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const Key = sequelize.define("Key", 
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "Id"
    },
    value: {
        type: DataTypes.STRING(255),
        field: "Clave"
    }
},
{
    underscored: true,
    tableName: "Claves",
    timestamps: false,
    logging: true
});

export default Key;
