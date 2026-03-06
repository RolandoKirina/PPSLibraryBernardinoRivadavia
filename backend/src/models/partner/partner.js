import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const Partner = sequelize.define("Partner", {
    id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
        field: "id"
    },
    idUser: {
        type: DataTypes.INTEGER,
        field: "idUsuario",
        unique: true,
        allowNull: true
    },
    partnerNumber: {
        type: DataTypes.INTEGER,
        field: "numero",
        unique: true
    },
    idCategory: {
        type: DataTypes.SMALLINT,
        field: "IdCategoria",
    },

    LocalityId: {
        type: DataTypes.INTEGER,
        field: "IdLocal_part",
        allowNull: true
    },
    idState: {
        type: DataTypes.SMALLINT,
        field: "IdEstado",
    },
    idReason: {
        type: DataTypes.INTEGER,
        field: "Motivo_Baj",
        allowNull: true
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
        type: DataTypes.STRING(10),
        field: "nro_docum"
    },
    MaritalStatusId: {
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
        type: DataTypes.SMALLINT,
        field: "est_socio"
    },
    withdrawalDate: {
        type: DataTypes.DATEONLY,
        field: "fecha_baja"
    },
    observations: {
        type: DataTypes.TEXT,
        field: "Observaciones"
    },
    workLocationId: {
        type: DataTypes.INTEGER,
        field: "IdLocal_trab"
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
        tableName: "socio",
        timestamps: false,
        logging: true
    });

Partner.beforeCreate(async (partner, options) => {
    // 1. Buscamos el número más alto actual
    const lastPartner = await Partner.findOne({
        attributes: ['partnerNumber'],
        order: [['partnerNumber', 'DESC']],
        transaction: options.transaction // Importante para evitar colisiones
    });

    // 2. Si no hay socios, empezamos en 1 (o el número que prefieras)
    // Si hay, sumamos 1 al último
    const nextNumber = lastPartner ? lastPartner.partnerNumber + 1 : 1;

    // 3. Asignamos el valor al campo antes de que se guarde
    partner.partnerNumber = nextNumber;
});

export default Partner;
