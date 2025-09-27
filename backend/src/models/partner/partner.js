import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const Partner = sequelize.define("Partner", 
{
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: "numero"
    },
    categoryId: {
        type: DataTypes.SMALLINT,
        field: "IdCategoria"
    },
    surname: {
        type: DataTypes.STRING(25),
        field: "apellido"
    },
    name: {
        type: DataTypes.STRING(25),
        field: "nombre"
    },
    birthDate: {
        type: DataTypes.DATEONLY,
        field: "fecha_nac"
    },
    documentType: {
        type: DataTypes.SMALLINT,
        field: "tipo_docum"
    },
    documentNumber: {
        type: DataTypes.STRING(20),
        field: "nro_docum"
    },
    maritalStatus: {
        type: DataTypes.SMALLINT,
        field: "est_civil"
    },
    nationality: {
        type: DataTypes.STRING(15),
        field: "nacionalid"
    },
    homeAddress: {
        type: DataTypes.STRING(100),
        field: "dir_part"
    },
    homePhone: {
        type: DataTypes.STRING(20),
        field: "tel_part"
    },
    homePostalCode: {
        type: DataTypes.STRING(10),
        field: "cp_part"
    },
    profession: {
        type: DataTypes.STRING(50),
        field: "profesion"
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
        field: "dir_cobro"
    },
    preferredTime: {
        type: DataTypes.STRING(20),
        field: "horapref"
    },
    isActive: {
        type: DataTypes.BOOLEAN,
        field: "est_socio"
    },
    withdrawalDate: {
        type: DataTypes.DATEONLY,
        field: "fecha_baja"
    },
    observations: {
        type: DataTypes.STRING(255),
        field: "Observaciones"
    },
    withdrawalReason: {
        type: DataTypes.STRING(100),
        field: "Motivo_Baj"
    },
    workLocationId: {
        type: DataTypes.INTEGER,
        field: "IdLocal_trab"
    },
    homeLocationId: {
        type: DataTypes.INTEGER,
        field: "IdLocal_part"
    },
    collector: {
        type: DataTypes.INTEGER,
        field: "Cobrador"
    },
    unpaidFees: {
        type: DataTypes.INTEGER,
        field: "CuotasImpagas"
    },
    pendingBooks: {
        type: DataTypes.INTEGER,
        field: "LibrosPendientes"
    },
    resignationDate: {
        type: DataTypes.DATEONLY,
        field: "FechaRenuncia"
    }
},
{
    underscored: true,
    tableName: "Socios",
    timestamps: false,
    logging: true
});

export default Partner;
