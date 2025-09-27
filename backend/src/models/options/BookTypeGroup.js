//tabla Tipo libro grupo

import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

const BookTypeGroup = sequelize.define("BookTypeGroup", 
    {
        groupId: {
            type: DataTypes.INTEGER,
            field: "IdGrupo",
            primaryKey: true,
            references: {
                model: 'GruposTipoLibro',
                key: 'Id'
            }
        },
        bookTypeId: {
            type: DataTypes.INTEGER,
            field: "IdTipoLibro",
            primaryKey: true
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
