import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";
  // 🧠 ID lógico: 'id' — usado en Sequelize
  // 🗄️ ID físico: 'project_id' — nombre real en la base
const Project = sequelize.define("Project", {
  id: {
    type: DataTypes.INTEGER,
    field: "project_id",
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING(100),
    field: "project_name",
    allowNull: false
  }
}, {
  tableName: "Projects",
  timestamps: false,
  underscored: true
});

export default Project;
