import sequelize from "../../configs/database.js";
import { DataTypes, Sequelize } from "sequelize";

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

Employees.beforeCreate(async (employee, options) => {
    try {
        const lastEmployee = await Employees.findOne({
            attributes: ['code'],
            order: [[Sequelize.cast(Sequelize.col('Codigo'), 'INTEGER'), 'DESC']],
            transaction: options.transaction
        });

        const lastCodeValue = (lastEmployee && lastEmployee.code) ? Number(lastEmployee.code) : 0;
        const nextCode = lastCodeValue + 1;

        employee.code = String(nextCode);
    } catch (error) {
        console.error("Error en beforeCreate de Employees:", error);
        throw error;
    }
});

export default Employees;