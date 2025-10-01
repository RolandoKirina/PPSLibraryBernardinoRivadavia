import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";
import Partner from "../partner/partner.js";

const Loan = sequelize.define("Loan", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: "Id"
  },
  partnerNumber: {
    type: DataTypes.INTEGER,
    field: "NumSocio",
    references: {
      model: Partner,
      key: 'numero'
    }
  },
  loanType: {
    type: DataTypes.INTEGER,
    field: "TipoPrestamo"
  },
  retiredDate: {
    type: DataTypes.DATEONLY,
    field: 'FechaRetiro'
  },
  withdrawalTime: {
    type: DataTypes.STRING(6),
    field: "HoraRetiro"
  },
  employeeId: {
    type: DataTypes.INTEGER,
    field: "IdEmpleado"
  },
  name: {
    type: DataTypes.STRING(50),
    field: "Nombre"
  },
  dni: {
    type: DataTypes.STRING(50),
    field: "DNI"
  }
}, {
  tableName: "Prestamo",
  timestamps: false,
  underscored: true,
  logging: true
});

export default Loan;
