import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const Signs = sequelize.define("Signs", 
{
    from: {
        type: DataTypes.STRING(2),
        field: "desde"
    },
    to: {
        type: DataTypes.STRING(2),
        field: "hasta"
    },
    number: {
        type: DataTypes.INTEGER,
        field: "numero"
    }
},
{
    underscored: true,
    tableName: "signs",
    timestamps: false,
    logging: true
});

export default Signs;
