import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

const LoanType = sequelize.define("LoanType", 
    {
        id: {
            autoIncrement:true,
            primaryKey:true,
            type: DataTypes.INTEGER,
            field:"Id"
        },
        description: {
            type: DataTypes.STRING(50),
            field: 'Descripcion'
        }
    },
    {
        underscored: true,
        tableName: "TipoPrestamo", 
        timestamps:false,
        logging:true
    }
);

export default LoanType;