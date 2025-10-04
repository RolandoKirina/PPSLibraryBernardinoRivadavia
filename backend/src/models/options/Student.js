import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

const Student = sequelize.define("Student", {
  // 🧠 ID lógico: 'id'
  // 🗄️ ID físico: 'student_id'
  id: {
    type: DataTypes.INTEGER,
    field: "student_id",
    primaryKey: true,
    autoIncrement: true
  },

  // 🧠 Nombre lógico: 'fullName'
  // 🗄️ Nombre físico: 'student_name'
  fullName: {
    type: DataTypes.STRING(100),
    field: "student_name",
    allowNull: false
  },

  // 🧠 Documento lógico: 'dni'
  // 🗄️ Documento físico: 'student_dni'
  dni: {
    type: DataTypes.STRING(20),
    field: "student_dni",
    allowNull: false
  },

  // 🧠 Fecha de nacimiento lógica: 'birthDate'
  // 🗄️ Fecha física: 'birth_date'
  birthDate: {
    type: DataTypes.DATEONLY,
    field: "birth_date"
  }
}, {
  tableName: "Students", // 🗄️ nombre físico de la tabla
  timestamps: false,
  underscored: true
});

export default Student;
