import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const Locality = sequelize.define("Location", 
{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: "Id"
    },
    name: {
        type: DataTypes.STRING(50),
        field: "Localidad"
    },
    postalCode: {
        type: DataTypes.STRING(50),
        field: "CPostal"
    }
},
{
    underscored: true,
    tableName: "Localidades",
    timestamps: false,
    logging: true
});

export default Locality;
