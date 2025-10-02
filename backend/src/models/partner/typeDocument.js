import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

  const typeDocument = sequelize.define('typeDocument', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    TipoDocumento: {
      type: DataTypes.STRING(50),
    }
  }, {
    tableName: 'TipoDocumento',
    timestamps: false,
  });

export default typeDocument;
