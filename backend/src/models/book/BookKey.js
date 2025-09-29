import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const BookKey = sequelize.define("BookKey", 
{
    keyId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        field: "IdClave"
    },
    bookCode: {
        type: DataTypes.STRING(50),
        primaryKey: true,
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