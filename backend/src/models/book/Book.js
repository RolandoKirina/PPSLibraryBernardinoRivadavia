import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const Book = sequelize.define("Book", 
  {
    BookId: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
      field: "id"
    },
    codeInventory: {
      type: DataTypes.STRING(50),
      field: "codigo"
    },
    codeCDU: {
      type: DataTypes.STRING(50),
      field: "Cod_rcdu"
    },
    title: {
      type: DataTypes.STRING(255),
      field: "titulo"
    },
    editorial: {
      type: DataTypes.STRING(50),
      field: "Editorial"
    },
    numberEdition: {
      type: DataTypes.SMALLINT,
      field: "Nro_edic"
    },
    yearEdition: {
      type: DataTypes.SMALLINT,
      field: "Anio_edic"
    },
    translator: {
      type: DataTypes.STRING(40),
      field: "Traductor"
    },
    codeClasification: {
      type: DataTypes.STRING(50),
      field: "Cod_Clas"
    },
    numberOfCopies: {
      type: DataTypes.SMALLINT,
      field: "Cant_ejemplar"
    },
    notes: {
      type: DataTypes.STRING(255),
      field: "Notas"
    },
    type: {
      type: DataTypes.INTEGER,
      field: "Tipo"
    },
    codeLing: {
      type: DataTypes.STRING(50),
      field: "Cod_Ling"
    },
    /*codigo signatura*/
    codeSignature: {
      type: DataTypes.STRING(255),
      field: "Autores"
    },
    idSupplier: {
      type: DataTypes.INTEGER,
      field: "IdProveedor"
    },
    invoiceNumber: {
      type: DataTypes.STRING(12),
      field: "NumFactura"
    },
    dateOfBuy: {
      type: DataTypes.DATE,
      field: "FechaCompra"
    },
    lossDate: {
      type: DataTypes.DATE,
      field: "FechaPerdida",
      allowNull: true
    },
    lostPartnerNumber: {
      type: DataTypes.INTEGER,
      field: "NumSocioPerdida"
    },
    lost: {
      type: DataTypes.BOOLEAN,
      field: "Perdido"
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
