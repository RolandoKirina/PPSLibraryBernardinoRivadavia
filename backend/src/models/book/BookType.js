import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const BookType = sequelize.define("BookType", 
{
    bookTypeId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: "Id"
    },
    typeName: {
        type: DataTypes.STRING(50),
        field: "TipoLibro"
    },
    loanDays: {
        type: DataTypes.INTEGER,
        field: "DiasPrestamo"
    }
},
{
    underscored: true,
    tableName: "TipoLibro",
    timestamps: false,
    logging: true
});

export default BookType;