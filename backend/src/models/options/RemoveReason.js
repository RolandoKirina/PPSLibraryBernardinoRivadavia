import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

const RemoveReason = sequelize.define("RemoveReason", 
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            field: "Id"
        },
        reason: {
            type: DataTypes.STRING(50),
            field: "Motivo",
            allowNull: false
        }
    },
    {
        underscored: true,
        tableName: "MotivoBaja",
        timestamps: false,
        logging: true
    }
);

export default RemoveReason;
