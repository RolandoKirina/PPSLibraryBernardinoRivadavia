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
            allowNull: true
        }
    },
    {
        underscored: true,
        tableName: "Empleados",
        timestamps: false,
        logging: true
    }
);

Employees.afterCreate(async (employee, options) => {
    const generatedCode = `EMP-${String(employee.id).padStart(5, "0")}`;

    // Actualizamos solo la columna 'code' directamente
    await employee.update({ code: generatedCode }, {
        transaction: options.transaction // Importante para mantener la integridad
    });
});

export default Employees;

