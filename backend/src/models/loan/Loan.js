import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

const Loan = sequelize.define("Loan", {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
    field: "Id"
  },
  legacyLoanId: {
    type: DataTypes.INTEGER,
    field: "legacyId"
  },
  partnerId: {
    type: DataTypes.INTEGER,
    field: "NumSocio",  //cambiar a numsocio
    allowNull: true //cambiar a true
  },
  loanType: {
    type: DataTypes.INTEGER,
    field: "TipoPrestamo",
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
    allowNull: false
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
