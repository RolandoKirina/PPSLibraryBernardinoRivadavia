import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

const Authors = sequelize.define("Authors", 
    {
        id: {
            autoIncrement:true,
            primaryKey:true,
            type: DataTypes.INTEGER,
            field:"Id"
        },
        name: {
            type: DataTypes.STRING(100),
            field: 'Nombre'
        },
        nationality: {
            type: DataTypes.STRING(50),
            field: 'Nacionalidad'
        }
    },
    {
        underscored: true,
        tableName: "Autores", 
        timestamps:false,
        logging:true
    }
);

export default Authors;