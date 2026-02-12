import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const Role = sequelize.define("Roles",
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            field: 'id'
        },
        name: {
            type: DataTypes.STRING(100),
            field: 'Nombre',
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(100),
            field: 'Descripcion',
            allowNull: false
        }
    },
    {
        underscored: true,
        tableName: "Rol",
        freezeTableName: true,
        timestamps: false,
        logging: true,
    }
);

export default Role;
