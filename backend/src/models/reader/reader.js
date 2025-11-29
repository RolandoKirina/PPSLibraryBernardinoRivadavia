import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const Reader = sequelize.define("Reader", 
{
    dni: {
        type: DataTypes.STRING(12),
        primaryKey: true,
        field: "DNI"
    },
    name: {
        type: DataTypes.STRING(100),
        field: "Nombre",
        allowNull: false
    }
},
{
    underscored: true,
    tableName: "Lectores",
    timestamps: false,
    logging: true
});

export default Reader;
