import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const BookKey = sequelize.define("BookKey", 
{

    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "id"
    },
    keyId: {
        type: DataTypes.INTEGER,
        field: "IdClave"
    },
    BookId: {
      type: DataTypes.INTEGER,
      field: "bookId"
    },
    bookCode: {
        type: DataTypes.STRING(50),
        field: "CodLibro"
    }
},
{
    underscored: true,
    tableName: "ClavesLibro",
    timestamps: false,
    logging: true
});

export default BookKey;