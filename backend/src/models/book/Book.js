import sequelize from '../../configs/database.js';
import { DataTypes } from "sequelize";

const Book = sequelize.define("Book", 
    {
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
            field: "id"
        },
        code_inventory: {
            type: DataTypes.STRING(50),
            field: "codigo"
        },
        code_cdu: {
            type: DataTypes.STRING(50),
            field: "codigo_cdu"
        },
        title: {
            type: DataTypes.STRING(255),
            field: "titulo"
        },
        editorial: {
            type: DataTypes.STRING(50),
            field: "editorial"
        },
        number_edition: {
            type: DataTypes.SMALLINT,
            field: "numero_de_edicion"
        },
        year_edition: {
            type: DataTypes.SMALLINT,
            field: "anio_de_edicion"
        },
        translator: {
            type: DataTypes.STRING(40),
            field: "traductor"
        },
        code_clasification: {
            type: DataTypes.STRING(50),
            field: "codigo_clasificacion"
        },
        number_of_copies: {
            type: DataTypes.SMALLINT,
            field: "cantidad_de_ejemplares"
        },
        notes: {
            type: DataTypes.STRING(255),
            field: "notas"
        },
        type: {
            type: DataTypes.INTEGER,
            field: "tipo"
        },
        code_ling: {
            type: DataTypes.STRING(50),
            field: "codigo_linguistico"
        },
        authors: {
            type: DataTypes.STRING(255), 
            field: "autores"
        },
        id_supplier: {
            type: DataTypes.INTEGER,
            field: "id_proveedor"
        },
        invoice_number: {
            type: DataTypes.STRING(12),
            field: "numero_de_factura"
        },
        date_of_buy: {
            type: DataTypes.DATE,
            field: "fecha_de_compra"
        },
        loss_date: {
            type: DataTypes.DATE,
            field: "fecha_de_perdida",
            allowNull: true
        },
        lost_partner_number: {
            type: DataTypes.INTEGER,
            field: "numero_de_socio_de_perdida"
        },
        lost: {
            type: DataTypes.BOOLEAN,
            field: "perdido"
        }
    },
    {
        underscored: true,
        tableName: "Libros",
        timestamps: false,
        logging: true
    }
);

export default Book;
