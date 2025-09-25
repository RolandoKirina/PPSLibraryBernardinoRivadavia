import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

const BookAuthor = sequelize.define("BookAuthor", 
    {
        bookCode: {
            type: DataTypes.STRING(50),
            field: "CodLibro",
            primaryKey: true
        },
        authorCode: {
            type: DataTypes.INTEGER,
            field: "CodAutor",
            primaryKey: true
        },
        position: {
            type: DataTypes.INTEGER,
            field: "Posicion"
        }
    },
    {
        underscored: true,
        tableName: "AutorLibro",
        timestamps: false,
        logging: true
    }
);

export default BookAuthor;
