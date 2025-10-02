import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const PartnerCategory = sequelize.define("PartnerCategory", 
{
    idCategory: {
        type: DataTypes.SMALLINT,
        primaryKey: true,
        autoIncrement: true,
        field: "Id"
    },
    name: {
        type: DataTypes.STRING(50),
        field: "Categoria"
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        field: "Importe"
    }
},
{
    underscored: true,
    tableName: "CategoriaSocio",
    timestamps: false,
    logging: true
});

export default PartnerCategory;
