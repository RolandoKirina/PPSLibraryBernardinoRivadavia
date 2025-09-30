import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const Book = sequelize.define("Book", 
  {
    idBook: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "id"
    },
    codeInventory: {
      type: DataTypes.STRING(50),
      field: "codigo"
    },
    codeCdu: {
      type: DataTypes.STRING(50),
      field: "codigo_cdu"
    },
    title: {
      type: DataTypes.STRING(255),
      field: "titulo"
    },
    editorial: {
      type: DataTypes.STRING(50),
      field: "editorial"
    },
    numberEdition: {
      type: DataTypes.SMALLINT,
      field: "numero_de_edicion"
    },
    yearEdition: {
      type: DataTypes.SMALLINT,
      field: "anio_de_edicion"
    },
    translator: {
      type: DataTypes.STRING(40),
      field: "traductor"
    },
    codeClasification: {
      type: DataTypes.STRING(50),
      field: "codigo_clasificacion"
    },
    numberOfCopies: {
      type: DataTypes.SMALLINT,
      field: "cantidad_de_ejemplares"
    },
    notes: {
      type: DataTypes.STRING(255),
      field: "notas"
    },
    type: {
      type: DataTypes.INTEGER,
      field: "tipo"
    },
    codeLing: {
      type: DataTypes.STRING(50),
      field: "codigo_linguistico"
    },
    authors: {
      type: DataTypes.STRING(255),
      field: "autores"
    },
    idSupplier: {
      type: DataTypes.INTEGER,
      field: "id_proveedor"
    },
    invoiceNumber: {
      type: DataTypes.STRING(12),
      field: "numero_de_factura"
    },
    dateOfBuy: {
      type: DataTypes.DATE,
      field: "fecha_de_compra"
    },
    lossDate: {
      type: DataTypes.DATE,
      field: "fecha_de_perdida",
      allowNull: true
    },
    lostPartnerNumber: {
      type: DataTypes.INTEGER,
      field: "numero_de_socio_de_perdida"
    },
    lost: {
      type: DataTypes.BOOLEAN,
      field: "perdido"
    }
  },
  {
    underscored: true,
    tableName: "Libros",
    timestamps: false,
    logging: true
  }
);

export default Book;
