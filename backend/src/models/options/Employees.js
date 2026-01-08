import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

const Employees = sequelize.define("Employees",
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            field: "Id",
        },
        name: {
            type: DataTypes.STRING(100),
            field: "Nombre",
            allowNull: false
        },
        code: {
            type: DataTypes.STRING(10),
            field: "Codigo",
            allowNull: false
        }
    },
    {
        underscored: true,
        tableName: "Empleados",
        timestamps: false,
        logging: true
    }
);

export default Employees;
