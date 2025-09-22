import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const Book = sequelize.define("Book", 
    {
        id: {
            autoIncrement:true,
            primaryKey:true,
            type: DataTypes.INTEGER,
            field:"id"
        },
        bookCode:{
            type: DataTypes.STRING(10),
            field:"Codigo"
        },
        title: {
            type: DataTypes.STRING(255),
            field:"Titulo"
        }
    },
    {
    underscored: true,
    tableName: "Libros",
    timestamps:false,
    logging:true
    });


export default Book;