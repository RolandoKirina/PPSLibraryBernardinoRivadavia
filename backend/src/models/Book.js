import SEQUELIZE from "../configs/database.js";
import { DataTypes } from "sequelize";

const BOOK = SEQUELIZE.define("Book", 
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


export default BOOK;