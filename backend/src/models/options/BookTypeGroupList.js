//tabla Grupos Tipo Libro

import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

const BookTypeGroupList = sequelize.define("BookTypeGroupList", 
    {
        bookTypeGroupId: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            field: "Id"
        },
        group: {
            type: DataTypes.STRING(50),
            field: "Grupo"
        },
        maxAmount: {
            type: DataTypes.INTEGER,
            field: "CantMaxima"
        }
    },
    {
        underscored: true,
        tableName: "GruposTipoLibro",
        timestamps: false,
        logging: true
    }
);

export default BookTypeGroupList;

