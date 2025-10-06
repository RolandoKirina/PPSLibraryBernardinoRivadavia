//tabla Tipo libro grupo

import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";
import BookTypeGroupList from "./BookTypeGroupList.js";
import BookType from "./BookType.js";

const BookTypeGroup = sequelize.define("BookTypeGroup", 
    {
        BookTypeGroupId:{
            type: DataTypes.INTEGER,
            field: "IdGrupoTipoLibro",   
            primaryKey: true,
            autoIncrement: true
        },
        BookTypeGroupListId: {
            type: DataTypes.INTEGER,
            field: "IdGrupo",   
        },
        bookTypeId: {
            type: DataTypes.INTEGER,
            field: "IdTipoLibro",   
        }
    },
    {
        underscored: true,
        tableName: "TipoLibroGrupo",
        timestamps: false,
        logging: true
    }
);

export default BookTypeGroup;
