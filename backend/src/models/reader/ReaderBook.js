import sequelize from "../../configs/database.js";
import { DataTypes } from "sequelize";

const ReaderBook = sequelize.define("ReaderBook",
    {
        ReaderBookId: {
            type: DataTypes.INTEGER,
            field: 'ReaderBookId',
            autoIncrement: true,
            primaryKey: true,
        },
        BookId: {
            type: DataTypes.INTEGER,
            field: 'BookId',
            allowNull: false
        },
        readerDNI: {
            type: DataTypes.STRING,
            field: "lectorDNI",
            allowNull: false
        },
        retiredDate: {
            type: DataTypes.DATEONLY,
            field: 'FechaRetiro',
            allowNull: false
        },
        retiredHour: {
            type: DataTypes.TIME,
            field: 'HoraRetiro',
            allowNull: false
        },
        returnedDate: {
            type: DataTypes.DATEONLY,
            field: 'FechaDevolucion'
        },
        returnedHour: {
            type: DataTypes.TIME,
            field: 'HoraDevolucion'
        },
        employeeId: {
            type: DataTypes.INTEGER,
            field: "IdEmpleado",
            allowNull: false
        },

    },
    {
        underscored: true,
        tableName: "LectorLibro",
        timestamps: false,
        logging: true
    }
);

export default ReaderBook;

