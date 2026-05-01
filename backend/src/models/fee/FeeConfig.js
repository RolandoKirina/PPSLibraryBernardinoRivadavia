import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const FeeConfig = sequelize.define('FeeConfig', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // La fecha que quieres que aparezca por defecto en el sistema
    defaultPaymentDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        comment: 'Fecha de pago sugerida por el sistema para todos los cobros'
    },
    // Aprovechamos para guardar el valor de la cuota actual
    currentFeeAmount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
        comment: 'Importe de la cuota social vigente'
    },
    // Para saber quién hizo el último cambio de fecha/precio
    lastUpdatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: 'ID del usuario que modificó la configuración'
    }
    },
    {
        underscored: true,
        tableName: "CuotasConfiguracion",
        timestamps: false,
        logging: true
    });

export default FeeConfig;