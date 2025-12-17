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
            allowNull: false 
        },   
        authorCode: {
            type: DataTypes.INTEGER,
            field: "CodAutor",
            allowNull: false
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
