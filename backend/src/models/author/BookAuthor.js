import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";
import Book from "../book/Book.js";

const BookAuthor = sequelize.define("BookAuthor", 
    {
        bookAuthorId: {
            type: DataTypes.INTEGER,
            field: 'bookAuthorId',
            primaryKey: true,
            autoIncrement: true
        },
        BookId: {
            type: DataTypes.INTEGER,
            field: 'BookId', 
        },
        bookCode: {
            type: DataTypes.STRING(50),
            field: "CodLibro",
        },
        authorCode: {
            type: DataTypes.INTEGER,
            field: "CodAutor",
        },
        authorName:{
            type: DataTypes.TEXT,
            field: 'Nombre'
        },
        position: {
            type: DataTypes.INTEGER,
            field: "Posicion"
        }
    },
    {
        underscored: true,
        tableName: "AutorLibro",
        freezeTableName: true,
        timestamps: false,
        logging: true,
        
    }
);

export default BookAuthor;
