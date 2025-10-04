import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

//modelo tabla intermedia sin atributos propios, por ende no tiene id propio, en su lugar tiene dos o mas fk con primary key true (clave compuesta)

const Task = sequelize.define("Task", {
    id: {
        type: DataTypes.INTEGER,
        field: "task_id",
        primaryKey: true,
        autoIncrement: true
    },
    projectId: {
        type: DataTypes.INTEGER,
        field: "project_ref",
        allowNull: false
    },
    studentId: {
        type: DataTypes.INTEGER,
        field: "student_ref",
        allowNull: false
    }
}, {
    tableName: "Tasks",
    timestamps: false,
    underscored: true
});


//modelo tabla intermedia con atributos propios(description), por ende debe tener un id propio,
// const Task = sequelize.define("Task", {
//     id: {
//         type: DataTypes.INTEGER,
//         field: "task_id",
//         primaryKey: true,
//         autoIncrement: true
//     },
//     description: {
//         type: DataTypes.STRING(255),
//         field: "task_description",
//         allowNull: false
//     },
//     projectId: {
//         type: DataTypes.INTEGER,
//         field: "project_ref",
//         allowNull: false
//     },
//     studentId: {
//         type: DataTypes.INTEGER,
//         field: "student_ref", // 🗄️ físico
//         allowNull: false
//     }
// }, {
//     tableName: "Tasks",
//     timestamps: false,
//     underscored: true
// });

export default Task;
