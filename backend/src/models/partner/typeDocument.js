import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

  const typeDocument = sequelize.define('typeDocument', {
    Id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "Id"
    },
    documentType: {
      type: DataTypes.STRING(50),
      field: "documentType"
    }
  }, {
    tableName: 'TipoDocumento',
    timestamps: false,
  });

export default typeDocument;
