import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

const Loan = sequelize.define("Loan", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: "Id"
  },
  partnerNumber: {
    type: DataTypes.INTEGER,
    field: "NumSocio"
  },
  loanType: {
    type: DataTypes.INTEGER,
    field: "TipoPrestamo"
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
