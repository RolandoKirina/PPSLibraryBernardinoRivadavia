import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";
import Book from "../book/Book.js";

const BookAuthor = sequelize.define("BookAuthor", 
    {
        idBook: {
            type: DataTypes.INTEGER,
            field: 'IdBook', 
            references: {
                model: Book,
                key: 'id'
            },
        },
        bookCode: {
            type: DataTypes.STRING(50),
            field: "CodLibro",
        },
        authorCode: {
            type: DataTypes.INTEGER,
            field: "CodAutor",
            references: {
                model: 'Autores',
                key: 'Id'
            }
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
