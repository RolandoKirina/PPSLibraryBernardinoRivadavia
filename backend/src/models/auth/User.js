import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const User = sequelize.define("Users",
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            field: 'id'
        },
        fullName: {
            type: DataTypes.STRING(100),
            field: 'NombreCompleto',
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(100),
            field: 'Email',
            allowNull: false
        },
        password: {
            type: DataTypes.STRING(100),
            field: 'Contraseña',
            allowNull: false
        }
    },
    {
        underscored: true,
        tableName: "Usuario",
        freezeTableName: true,
        timestamps: false,
        logging: true,
    }
);

export default User;
