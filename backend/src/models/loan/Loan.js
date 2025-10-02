import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";
import Partner from "../partner/partner.js";
import Employees from "../options/Employees.js";
import LoanType from "./LoanType.js";

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
    field: "TipoPrestamo",
    references: {
      model: LoanType,
      key: 'Id'
    }
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
    field: "IdEmpleado",
    references: {
      model: Employees,
      key: 'Id'
    }
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
