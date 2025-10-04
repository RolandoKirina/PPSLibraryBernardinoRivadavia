import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

const LoanType = sequelize.define("LoanType", 
    {
        id: {
            autoIncrement:true,
            type: DataTypes.INTEGER,
            field:"Id",
            primaryKey: true,
            
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