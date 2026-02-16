import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const Partner = sequelize.define("Partner", {   
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: "id"
    },
    partnerNumber: {
        type: DataTypes.STRING(30),
        field: "numero",
        unique:true
    },
    idCategory: {
        type: DataTypes.SMALLINT,
        field: "IdCategoria",
        allowNull: false
    },
    LocalityId: {
        type: DataTypes.INTEGER,
        field: "IdLocal_part",
        allowNull: false
    },
    idState: {
        type: DataTypes.SMALLINT,
        field: "IdEstado",
        allowNull: false
    },
    idReason: {
        type: DataTypes.INTEGER,
        field: "Motivo_Baj",
        allowNull: true
    },
    surname: {
        type: DataTypes.STRING(25),
        field: "apellido",
        allowNull: false
    },
    name: {
        type: DataTypes.STRING(25),
        field: "nombre",
        allowNull: false
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        field: "fecha_nac",
        allowNull: false

    },
    documentType: {
      type: DataTypes.SMALLINT,
      field: "tipo_docum",
      allowNull: false
    },
    documentNumber: {
        type: DataTypes.STRING(10),
        field: "nro_docum",
        allowNull: false
    },
    MaritalStatusId: {
        type: DataTypes.SMALLINT,
        field: "est_civil",
        allowNull: false
    },
    nationality: {
        type: DataTypes.STRING(15),
        field: "nacionalid"
    },
    homeAddress: {
        type: DataTypes.STRING(100),
        field: "dir_part",
        allowNull: false

    },
    homePhone: {
        type: DataTypes.STRING(20),
        field: "tel_part",
        allowNull: false
    },
    homePostalCode: {
        type: DataTypes.STRING(10),
        field: "cp_part",
        allowNull: false
    },
    profession: {
        type: DataTypes.STRING(50),
        field: "profesion",
        allowNull: false
    },
    workplace: {
        type: DataTypes.STRING(100),
        field: "lugar_trab"
    },
    workAddress: {
        type: DataTypes.STRING(100),
        field: "dir_trab"
    },
    workPhone: {
        type: DataTypes.STRING(20),
        field: "tel_trab"
    },
    workPostalCode: {
        type: DataTypes.STRING(10),
        field: "cp_trab"
    },
    registrationDate: {
        type: DataTypes.DATEONLY,
        field: "fecha_insc"
    },
    presentedBy: {
        type: DataTypes.STRING(100),
        field: "present_x"
    },
    collectionAddress: {
        type: DataTypes.STRING(100),
        field: "dir_cobro",
        allowNull: false
    },
    preferredTime: {
        type: DataTypes.STRING(20),
        field: "horapref",
    },
    withdrawalDate: {
        type: DataTypes.DATEONLY,
        field: "fecha_baja"
    },
    observations: {
        type: DataTypes.STRING(255),
        field: "Observaciones"
    },
    workLocationId: {
        type: DataTypes.INTEGER,
        field: "IdLocal_trab"
    },
    unpaidFees: {
        type: DataTypes.INTEGER,
        field: "CuotasImpagas",
    },
    pendingBooks: {
        type: DataTypes.INTEGER,
        field: "LibrosPendientes",
    },
    resignationDate: {
        type: DataTypes.DATEONLY,
        field: "FechaRenuncia"
    }
},
{
    underscored: true,
    tableName: "socio",
    timestamps: false,
    logging: true
});

Partner.afterCreate(async (partner) => {
  const number = `SOC-${String(partner.id).padStart(5, "0")}`;

  partner.partnerNumber = number;

  await partner.save();
});

export default Partner;
