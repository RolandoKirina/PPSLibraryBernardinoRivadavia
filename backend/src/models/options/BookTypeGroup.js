//tabla Tipo libro grupo

import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";
import BookTypeGroupList from "./BookTypeGroupList.js";
import BookType from "../book/BookType.js";

const BookTypeGroup = sequelize.define("BookTypeGroup", 
    {
        groupId: {
            type: DataTypes.INTEGER,
            field: "IdGrupo",
            primaryKey: true,
            references: {
                model: BookTypeGroupList,
                key: 'Id'
            }
        },
        bookTypeId: {
            type: DataTypes.INTEGER,
            field: "IdTipoLibro",
            primaryKey: true,
            references: {
                model: BookType,
                key: 'Id'
            }
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
