import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const UserRole = sequelize.define("UserRoles",
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            field: 'id'
        },
        userId: {
            type: DataTypes.INTEGER,
            field: 'userId',
            allowNull: false
        },
        roleId: {
            type: DataTypes.INTEGER,
            field: 'roleId',
            allowNull: false
        }
    },
    {
        underscored: true,
        tableName: "RolUsuario",
        freezeTableName: true,
        timestamps: false,
        logging: true,
    }
);

export default UserRole;
