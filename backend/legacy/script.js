import fs from "fs";
import MDBReader from "mdb-reader";
import sequelize from "../src/configs/database.js";
import Authors from "../src/models/author/Authors.js";
import BookType from "../src/models/options/BookType.js";
import Book from "../src/models/book/Book.js";
import Reader from "../src/models/reader/reader.js";
import Employees from "../src/models/options/Employees.js";
import RemoveReason from "../src/models/options/RemoveReason.js";
import PartnerCategory from "../src/models/partner/partnerCategory.js";
import Key from "../src/models/book/Key.js";
import BookKey from "../src/models/book/BookKey.js";
import Locality from "../src/models/partner/locality.js";
import MaritalStatus from "../src/models/partner/maritalStatus.js";
import statePartner from "../src/models/partner/statePartner.js";
import typeDocument from "../src/models/partner/typeDocument.js";
import Partner from "../src/models/partner/partner.js";
import LoanType from "../src/models/loan/LoanType.js";
import Loan from "../src/models/loan/Loan.js";
import Reservations from "../src/models/loan/Reservations.js";
import BookTypeGroupList from "../src/models/options/BookTypeGroupList.js";
import Signs from "../src/models/book/Signs.js";
import LastGeneration from "../src/models/fee/LastGeneration.js";
import Fees from "../src/models/fee/fee.js";
import LoanBook from "../src/models/loan/LoanBook.js";
import BookAuthor from "../src/models/author/BookAuthor.js";
import BookReservations from "../src/models/loan/BookReservations.js";
import BookTypeGroup from "../src/models/options/BookTypeGroup.js";
import bcrypt from "bcrypt";
import Role from "../src/models/auth/Role.js";
import UserRole from "../src/models/auth/UserRole.js";
import User from "../src/models/auth/User.js";
import FeeConfig from "../src/models/fee/FeeConfig.js";
import { parseRTFSmart} from "../src/utils/text/ParseRtf.js"
async function migrateAll() {
    try {
        console.log("Iniciando migración...");

        // Leer MDB una sola vez
        const buffer = fs.readFileSync("legacy/biblioteca.mdb");
        const reader = new MDBReader(buffer);

        await sequelize.transaction(async (t) => {

            /*
            =========================
            CONFIGURACIÓN DE CUOTAS
            =========================
            */
            console.log("Estableciendo configuración de cuotas inicial...");

            // Limpiamos la configuración previa
            await FeeConfig.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            // Creamos el registro semilla (Seed)
            await FeeConfig.create({
                id: 1, // Forzamos el ID 1 para que el front lo encuentre siempre
                defaultPaymentDate: '2026-06-30', // Fecha sugerida inicial
                currentFeeAmount: 0.00,           // Valor inicial (se puede ajustar luego)
                lastUpdatedBy: null               // Sistema
            }, { transaction: t });

            console.log("Configuración de cuotas establecida (ID: 1, Fecha: 2026-06-30).");

            /*
            =========================
            IMPORTAR AUTORES
            =========================
            */

            const authorTable = reader.getTable("Autores");
            const authorRows = authorTable.getData();

            console.log(`Importando ${authorRows.length} autores...`);

            const transformedAuthors = authorRows.map(row => ({
                legacyAuthorCode: row.Id,
                name: row.Nombre,
                nationality: row.Nacionalidad || null
            }));

            await Authors.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await Authors.bulkCreate(transformedAuthors, {
                transaction: t
            });


            // 🔎 Crear mapa legacy → nuevo ID
            const authorsForMap = await Authors.findAll({
                attributes: ["id", "legacyAuthorCode"],
                transaction: t
            });

            const authorLegacyToNewId = {};

            authorsForMap.forEach(a => {
                authorLegacyToNewId[String(a.legacyAuthorCode)] = a.id;
            });

            console.log("Mapa autores (5 ejemplos):");
            console.log(Object.entries(authorLegacyToNewId).slice(0, 5));

            console.log("Autores importados correctamente.");

            /* ========================= 
            IMPORTAR TIPOS DE PRÉSTAMO 
            ========================= 
            */

            const loanTypeTable = reader.getTable("TipoPrestamo"); // Asumo que el nombre en el archivo es este
            const loanTypeRows = loanTypeTable.getData();

            console.log(`Importando ${loanTypeRows.length} tipos de préstamo...`);

            // Transformamos los datos. 
            // Nota: Si no tienes un campo 'legacy_id' en tu DB, el ID autoincremental de Sequelize será distinto al del Excel.
            const transformedLoanTypes = loanTypeRows.map(row => ({
                // Si quieres conservar el ID original del archivo, asegúrate de que el modelo 
                // lo permita o mapealo a un campo temporal si es necesario.
                id: row.Id,
                description: row.Descripcion
            }));

            // Limpiamos la tabla antes de insertar
            await LoanType.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            // Inserción masiva
            await LoanType.bulkCreate(transformedLoanTypes, {
                transaction: t
            });

            // 🔎 Crear mapa legacy ID → nuevo ID de base de datos
            const loanTypesForMap = await LoanType.findAll({
                attributes: ["id", "description"],
                transaction: t
            });

            const loanTypeLegacyToNewId = {};

            loanTypesForMap.forEach(lt => {
                // Mapeamos el ID que acabamos de insertar (que debería coincidir con el del archivo por el bulkCreate)
                loanTypeLegacyToNewId[String(lt.id)] = lt.id;
            });

            console.log("Mapa tipos de préstamo (ejemplos):");
            console.log(Object.entries(loanTypeLegacyToNewId).slice(0, 5));

            console.log("Tipos de préstamo importados correctamente.");

            /*
            =========================
            IMPORTAR TIPO-LIBROS
            =========================
            */

            const table = reader.getTable("TipoLibro");
            const rows = table.getData();

            console.log(`Importando ${rows.length} tipos de libro...`);

            const transformed = rows.map(row => ({
                legacyBookTypeId: row.Id,
                typeName: row.TipoLibro || null,
                loanDays: row.DiasPrestamo || null
            }));

            await BookType.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await BookType.bulkCreate(transformed, {
                transaction: t
            });

            const bookTypesForMap = await BookType.findAll({
                attributes: ["bookTypeId", "legacyBookTypeId"],
                transaction: t
            });

            console.log(bookTypesForMap);

            const legacyBookTypeToNewId = {};
            bookTypesForMap.forEach(bt => {
                legacyBookTypeToNewId[bt.legacyBookTypeId] = bt.bookTypeId;
            });

            console.log("Mapa legacyBookType → nuevo bookTypeId (5 ejemplos):");
            console.log(Object.entries(legacyBookTypeToNewId).slice(0, 5));

            console.log("Tipos de libro importados correctamente.");

            /*
   =========================
   IMPORTAR LIBROS
   =========================
   */
            const bookTable = reader.getTable("Libros");
            const bookRows = bookTable.getData();

            console.log(`Importando ${bookRows.length} libros...`);

            // 🔹 1. Transformar libros y mapear Tipo a bookTypeId
            const transformedBooks = bookRows.map(row => {
                const newBookTypeId = legacyBookTypeToNewId[row.Tipo] ?? null;

                if (!newBookTypeId) {
                    console.warn(`⚠ No se encontró bookTypeId para libro ${row.Titulo} (legacy Tipo: ${row.Tipo})`);
                }


                let notesText = null;

                if (row.Notas) {
                notesText = parseRTFSmart(row.Notas);
                }

                return {
                    codeInventory: row.Codigo || null,
                    codeCDU: row.Cod_rcdu || null,
                    title: row.Titulo || null,
                    editorial: row.Editorial || null,
                    numberEdition: row.Nro_edic || null,
                    yearEdition: row.Anio_edic || null,
                    translator: row.Traductor || null,
                    codeClasification: row.Cod_clas || null,
                    numberOfCopies: row.Cant_ejemplar || null,
                    notes: row.Notas || null,
                    type: newBookTypeId,
                    notes: row.Notas || null,
                    notesText: notesText,
                    codeLing: row.Cod_Ling || null,
                    codeSignature: row.Autores || null,
                    idSupplier: row.IdProveedor || null,
                    invoiceNumber: row.NumFactura || null,
                    dateOfBuy: row.FechaCompra || null,
                    lossDate: row.FechaPerdida || null,
                    lostPartnerNumber: row.NumSocioPerdida || null,
                    lost: row.Perdido ?? false,
                    ubication: row.Ubicacion || null,
                    pages: row.Paginas || null
                };
            });

            // 🔹 2. Filtrar libros sin tipo válido
            const filteredBooks = transformedBooks.filter(b => b.type !== null);

            console.log(`Libros válidos: ${filteredBooks.length}`);
            console.log(`Libros descartados (sin tipo válido): ${transformedBooks.length - filteredBooks.length}`);

            // 🔹 3. Limpiar tabla y bulk insert
            await Book.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await Book.bulkCreate(filteredBooks, {
                transaction: t,
                validate: false
            });

            // 🔹 4. Mapear código legacy → nuevo ID
            const booksForMap = await Book.findAll({
                attributes: ["BookId", "codeInventory"],
                transaction: t
            });

            const bookLegacyToNewId = {};
            booksForMap.forEach(b => {
                bookLegacyToNewId[String(b.codeInventory).trim()] = b.BookId;
            });

            console.log("Libros importados correctamente.");

            /*
            =========================
            IMPORTAR LECTORES
            =========================
            */

            const readerTable = reader.getTable("Lectores"); // mismo nombre que en MDB
            const readerRows = readerTable.getData();

            console.log(`Importando ${readerRows.length} lectores...`);

            // Preview opcional para debug
            console.table(
                readerRows.slice(0, 5).map(r => ({
                    DNI: r.DNI,
                    Nombre: r.Nombre
                }))
            );

            const transformedReaders = readerRows.map(row => ({
                dni: row.DNI ? String(row.DNI).trim() : null,
                name: row.Nombre ? row.Nombre.trim() : null
            }));

            await Reader.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await Reader.bulkCreate(transformedReaders, {
                transaction: t
            });

            console.log("Lectores importados correctamente.");

            /*
            =========================
            IMPORTAR EMPLEADOS
            =========================
            */

            const employeesTable = reader.getTable("Empleados");
            const employeeRows = employeesTable.getData();

            console.log(`Importando ${employeeRows.length} empleados...`);

            // Preview para debug
            console.table(
                employeeRows.slice(0, 5).map(r => ({
                    Id: r.Id,
                    Nombre: r.Nombre,
                    Codigo: r.Codigo
                }))
            );

            const transformedEmployees = employeeRows.map(row => ({
                id: row.Id ?? null, // si querés respetar el Id original
                name: row.Nombre ? row.Nombre.trim() : null,
                code: row.Codigo ? String(row.Codigo).trim() : null
            }));

            await Employees.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await Employees.bulkCreate(transformedEmployees, {
                transaction: t
            });

            await sequelize.query(`
            SELECT setval(
                pg_get_serial_sequence('"Empleados"', 'Id'),
                (SELECT MAX("Id") FROM "Empleados")
            );
        `, { transaction: t });

            console.log("Empleados importados correctamente.");

            /*
            =========================
            IMPORTAR MOTIVOS DE BAJA
            =========================
            */

            const removeReasonTable = reader.getTable("MotivoBaja");
            const removeReasonRows = removeReasonTable.getData();

            // 1. Filtrar y transformar
            const transformedRemoveReasons = removeReasonRows
                .filter(row => row.Motivo && row.Motivo.trim() !== "")
                .map(row => ({
                    id: Number(row.Id),
                    reason: row.Motivo.trim()
                }));

            // 2. Limpiar tabla
            await RemoveReason.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            // 3. Insertar con IDs originales
            // Usamos raw: true o especificamos los campos para que Sequelize no ignore el ID
            await RemoveReason.bulkCreate(transformedRemoveReasons, {
                transaction: t,
                validate: true
            });

            // 4. CORRECCIÓN CRÍTICA: Sincronizar la secuencia
            // Esto le dice a Postgres: "El último que usé fue el MAX(Id), el siguiente dame el que sigue"
            await sequelize.query(
                `
                SELECT setval(
                    pg_get_serial_sequence('"MotivoBaja"', 'Id'), 
                    (SELECT MAX("Id") FROM "MotivoBaja")
                );
                `,
                { transaction: t }
            );

            console.log("Importación y sincronización de secuencias completada.");

            /*
            =========================
            IMPORTAR CATEGORIA SOCIO
            =========================
            */

            const partnerCategoryTable = reader.getTable("CategoriaSocio");
            const partnerCategoryRows = partnerCategoryTable.getData();

            console.log(`Importando ${partnerCategoryRows.length} categorías de socio...`);

            // Preview
            console.table(
                partnerCategoryRows.slice(0, 5).map(r => ({
                    Id: r.Id,
                    Categoria: r.Categoria,
                    Importe: r.Importe
                }))
            );

            const transformedPartnerCategories = partnerCategoryRows.map(row => ({
                idCategory: row.Id ?? null, // conservar Id original si hay FK
                name: row.Categoria ? row.Categoria.trim() : null,
                amount: row.Importe !== null && row.Importe !== undefined
                    ? Number(row.Importe)
                    : null
            }));

            await PartnerCategory.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await PartnerCategory.bulkCreate(transformedPartnerCategories, {
                transaction: t
            });

            await sequelize.query(`
            SELECT setval(
                pg_get_serial_sequence('"CategoriaSocio"', 'Id'),
                (SELECT MAX("Id") FROM "CategoriaSocio")
            );
        `, { transaction: t });

            console.log("Categorías de socio importadas correctamente.");

            /*
            =========================
            IMPORTAR CLAVES
            =========================
            */

            const keyTable = reader.getTable("Claves");
            const keyRows = keyTable.getData();

            console.log(`Importando ${keyRows.length} claves...`);

            console.table(
                keyRows.slice(0, 5).map(r => ({
                    Id: r.Id,
                    Clave: r.Clave
                }))
            );

            const transformedKeys = keyRows.map(row => ({
                id: row.Id ?? null, // conservar Id original
                value: row.Clave ? row.Clave.trim() : null
            }));

            await Key.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await Key.bulkCreate(transformedKeys, {
                transaction: t
            });

            console.log("Claves importadas correctamente.");

            /*
            =========================
            IMPORTAR CLAVES-LIBRO
            =========================
            */

            const bookKeyTable = reader.getTable("ClavesLibro");
            const bookKeyRows = bookKeyTable.getData();

            console.log(`Importando ${bookKeyRows.length} relaciones clave-libro...`);

            console.table(
                bookKeyRows.slice(0, 5).map(r => ({
                    Id: r.Id,
                    IdClave: r.IdClave,
                    bookId: r.bookId,
                    CodLibro: r.CodLibro
                }))
            );

            const transformedBookKeys = bookKeyRows.map(row => ({
                id: row.Id ?? null,
                keyId: row.IdClave ?? null,
                BookId: row.bookId ?? null,
                bookCode: row.CodLibro || null
            }));

            await BookKey.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await BookKey.bulkCreate(transformedBookKeys, {
                transaction: t,
                validate: false
            });

            console.log("Relaciones clave-libro importadas correctamente.");

            /*
            =========================
            IMPORTAR LOCALIDADES
            =========================
            */

            const localityTable = reader.getTable("Localidad");
            const localityRows = localityTable.getData();

            console.log(`Importando ${localityRows.length} localidades...`);

            console.table(
                localityRows.slice(0, 5).map(r => ({
                    Id: r.Id,
                    Localidad: r.Localidad,
                    CPostal: r.CPostal
                }))
            );

            const transformedLocalities = localityRows.map(row => ({
                id: row.Id ?? null,
                name: row.Localidad || null,
                postalCode: row.CPostal || null
            }));

            await Locality.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await Locality.bulkCreate(transformedLocalities, {
                transaction: t,
                validate: false
            });

            await Locality.bulkCreate([
                {
                    id: 2,
                    name: "Azul",
                    postalCode: 7300
                },
                {
                    id: 3,
                    name: "Balcarce",
                    postalCode: null
                },
                {
                    id: 4,
                    name: "Benito Juarez",
                    postalCode: null
                },
                {
                    id: 5,
                    name: "Mar del Plata",
                    postalCode: null
                }
            ], {
                transaction: t
            });

            /*
            =========================
            IMPORTAR ESTADO CIVIL
            =========================
            */

            const maritalStatusTable = reader.getTable("EstadoCivil");
            const maritalStatusRows = maritalStatusTable.getData();

            console.log(`Importando ${maritalStatusRows.length} estados civiles...`);

            console.table(
                maritalStatusRows.slice(0, 5).map(r => ({
                    Id: r.Id,
                    EstadoCivil: r.EstadoCivil
                }))
            );

            const transformedMaritalStatus = maritalStatusRows.map(row => ({
                id: row.Id ?? null,
                statusName: row.EstadoCivil || null
            }));

            await MaritalStatus.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await MaritalStatus.bulkCreate(transformedMaritalStatus, {
                transaction: t,
                validate: false
            });

            /*
            =========================
            IMPORTAR ESTADO SOCIO
            =========================
            */

            const statePartnerTable = reader.getTable("EstadoSocio");
            const statePartnerRows = statePartnerTable.getData();

            console.log(`Importando ${statePartnerRows.length} estados de socio...`);

            console.table(
                statePartnerRows.slice(0, 5).map(r => ({
                    Id: r.Id,
                    Estado: r.Estado
                }))
            );

            const transformedStatePartner = statePartnerRows.map(row => ({
                idState: row.Id ?? null,
                status: row.Estado || null
            }));

            await statePartner.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await statePartner.bulkCreate(transformedStatePartner, {
                transaction: t,
                validate: false
            });



            /*
            =========================
            IMPORTAR TIPO DOCUMENTO
            =========================
            */

            const typeDocumentTable = reader.getTable("TipoDocumento");
            const typeDocumentRows = typeDocumentTable.getData();

            console.log(`Importando ${typeDocumentRows.length} tipos de documento...`);

            console.table(
                typeDocumentRows.slice(0, 5).map(r => ({
                    Id: r.Id,
                    documentType: r.TipoDocumento
                }))
            );

            const transformedTypeDocument = typeDocumentRows.map(row => ({
                Id: row.Id ?? null,
                documentType: row.TipoDocumento || null
            }));

            await typeDocument.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await typeDocument.bulkCreate(transformedTypeDocument, {
                transaction: t,
                validate: false
            });

            /*
            =========================
            IMPORTAR SOCIOS
            =========================
            */

            const partnerTable = reader.getTable("socio");
            const partnerRows = partnerTable.getData();

            console.log(`Importando ${partnerRows.length} socios...`);

            // Mostrar solo algunos campos para inspección
            console.table(
                partnerRows.slice(0, 5).map(r => ({
                    id: r.id,
                    numero: r.numero,
                    apellido: r.apellido,
                    nombre: r.nombre,
                    nro_docum: r.nro_docum,
                    LocalityId: r.IdLocal_part,
                    MaritalStatusId: r.est_civil
                }))
            );

            // ---------------------------
            // 1. Verificar Localidades usadas por socios
            // ---------------------------
            const localityIdsUsed = [...new Set(partnerRows.map(r => r.IdLocal_part).filter(v => v != null))];
            console.log("Localidades usadas por socios:", localityIdsUsed);

            const existingLocalities = await Locality.findAll({
                where: { id: localityIdsUsed },
                attributes: ["id"],
                transaction: t
            });
            const existingLocalityIds = existingLocalities.map(r => r.id);

            // Insertar faltantes con nombre "Desconocida"
            const missingLocalities = localityIdsUsed.filter(id => !existingLocalityIds.includes(id));
            if (missingLocalities.length > 0) {
                const newLocalities = missingLocalities.map(id => ({ id, name: "Desconocida", postalCode: null }));
                await Locality.bulkCreate(newLocalities, { transaction: t });
                console.log(`Se agregaron ${newLocalities.length} localidades faltantes como "Desconocida".`);
            }

            // ---------------------------
            // 2. Verificar Estados Civiles usados por socios
            // ---------------------------
            const maritalIdsUsed = [...new Set(partnerRows.map(r => r.est_civil).filter(v => v != null))];
            console.log("Estados civiles usados por socios:", maritalIdsUsed);

            const existingMaritals = await MaritalStatus.findAll({
                where: { id: maritalIdsUsed },
                attributes: ["id"],
                transaction: t
            });
            const existingMaritalIds = existingMaritals.map(r => r.id);

            // Insertar faltantes como "Desconocido"
            const missingMaritals = maritalIdsUsed.filter(id => !existingMaritalIds.includes(id));
            if (missingMaritals.length > 0) {
                const newMaritals = missingMaritals.map(id => ({ id, statusName: "Desconocido" }));
                await MaritalStatus.bulkCreate(newMaritals, { transaction: t });
                console.log(`Se agregaron ${newMaritals.length} estados civiles faltantes como "Desconocido".`);
            }

            // ---------------------------
            // 3. Verificar Motivos de Baja usados por socios
            // ---------------------------
            const reasonIdsUsed = [...new Set(partnerRows.map(r => r.Motivo_Baj).filter(v => v != null))];
            console.log("Motivos de baja usados por socios:", reasonIdsUsed);

            const existingReasons = await RemoveReason.findAll({
                where: { id: reasonIdsUsed },
                attributes: ["id"],
                transaction: t
            });
            const existingReasonIds = existingReasons.map(r => r.id);

            // Insertar faltantes como "Desconocido"
            const missingReasons = reasonIdsUsed.filter(id => !existingReasonIds.includes(id));
            if (missingReasons.length > 0) {
                const newReasons = missingReasons.map(id => ({ id, reason: "Desconocido" }));
                await RemoveReason.bulkCreate(newReasons, { transaction: t });
                console.log(`Se agregaron ${newReasons.length} motivos de baja faltantes como "Desconocido".`);
            }

            // ---------------------------
            // Insertar dinámicamente los tipos de documento usados por socios y que falten
            // ---------------------------
            const docTypeIdsUsed = [...new Set(partnerRows.map(r => r.tipo_docum).filter(v => v != null))];

            const existingDocTypes = await typeDocument.findAll({
                where: { Id: docTypeIdsUsed },
                attributes: ["Id"],
                transaction: t
            });
            const existingDocTypeIds = existingDocTypes.map(r => r.Id);

            // Insertar los faltantes como "Desconocido"
            const missingDocTypes = docTypeIdsUsed.filter(Id => !existingDocTypeIds.includes(Id));
            if (missingDocTypes.length > 0) {
                const newDocTypes = missingDocTypes.map(Id => ({ Id, documentType: "Desconocido" }));
                await typeDocument.bulkCreate(newDocTypes, { transaction: t });
                console.log(`Se agregaron ${newDocTypes.length} tipos de documento faltantes como "Desconocido".`);
            }



            // ---------------------------
            // Verificar Estados de Socio usados por socios
            // ---------------------------
            const stateIdsUsed = [...new Set(partnerRows.map(r => r.est_socio).filter(v => v != null))];
            console.log("Estados de socio usados por socios:", stateIdsUsed);

            const existingStates = await statePartner.findAll({
                where: { idState: stateIdsUsed },
                attributes: ["idState"],
                transaction: t
            });
            const existingStateIds = existingStates.map(r => r.idState);

            // Insertar los faltantes como "Desconocido"
            const missingStates = stateIdsUsed.filter(id => !existingStateIds.includes(id));
            if (missingStates.length > 0) {
                const newStates = missingStates.map(id => ({ idState: id, status: "Desconocido" }));
                await statePartner.bulkCreate(newStates, { transaction: t });
                console.log(`Se agregaron ${newStates.length} estados de socio faltantes como "Desconocido".`);
            }
            // ---------------------------
            // 3. Transformar socios para insertar
            // ---------------------------
            const transformedPartners = partnerRows.map(row => ({
                id: row.id ?? null,
                idUser: row.idUsuario ?? null,
                partnerNumber: row.numero ?? null,
                idCategory: row.IdCategoria ?? null,
                LocalityId: row.IdLocal_part ?? null,
                idReason: row.Motivo_Baj ?? null,
                surname: row.apellido || null,
                name: row.nombre || null,
                birthDate: row.fecha_nac ?? null,
                documentType: row.tipo_docum ?? null,
                documentNumber: row.nro_docum || null,
                MaritalStatusId: row.est_civil ?? null,
                nationality: row.nacionalid || null,
                homeAddress: row.dir_part || null,
                homePhone: row.tel_part || null,
                homePostalCode: row.cp_part || null,
                profession: row.profesion || null,
                workplace: row.lugar_trab || null,
                workAddress: row.dir_trab || null,
                workPhone: row.tel_trab || null,
                workPostalCode: row.cp_trab || null,
                registrationDate: row.fecha_insc ?? null,
                presentedBy: row.present_x || null,
                collectionAddress: row.dir_cobro || null,
                preferredTime: row.horapref || null,
                isActive: row.est_socio ?? null,
                withdrawalDate: row.fecha_baja ?? null,
                observations: row.Observaciones || null,
                workLocationId: row.IdLocal_trab ?? null,
                unpaidFees: row.CuotasImpagas ?? null,
                pendingBooks: row.LibrosPendientes ?? null,
                resignationDate: row.FechaRenuncia ?? null
            }));

            // ---------------------------
            // 4. Limpiar y crear socios
            // ---------------------------
            await Partner.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await Partner.bulkCreate(transformedPartners, {
                transaction: t,
                validate: false
            });

            console.log("Socios importados correctamente.");

            /*
            =========================
            IMPORTAR PRÉSTAMOS
            =========================
            */

            // Obtener todos los préstamos de la fuente legacy
            const loanTable = reader.getTable("Prestamo");
            const loanRows = loanTable.getData();

            console.log(`Importando ${loanRows.length} préstamos...`);

            // ---------------------------
            // 1. Verificar tipos de préstamo usados por préstamos
            // ---------------------------
            const loanTypeIdsUsed = [...new Set(loanRows.map(r => r.TipoPrestamo).filter(v => v != null))];

            const existingLoanTypes = await LoanType.findAll({
                where: { id: loanTypeIdsUsed },
                attributes: ["id"],
                transaction: t
            });
            const existingLoanTypeIds = existingLoanTypes.map(r => r.id);

            // Insertar los faltantes como "Desconocido"
            const missingLoanTypes = loanTypeIdsUsed.filter(id => !existingLoanTypeIds.includes(id));
            if (missingLoanTypes.length > 0) {
                const newLoanTypes = missingLoanTypes.map(id => ({ id, description: "Desconocido" }));
                await LoanType.bulkCreate(newLoanTypes, { transaction: t });
                console.log(`Se agregaron ${newLoanTypes.length} tipos de préstamo faltantes como "Desconocido".`);
            }

            // ---------------------------
            // 1. Verificar socios usados por préstamos (NumSocio)
            // ---------------------------
            const partnerNumbersUsed = [...new Set(
                loanRows
                    .map(r => Number(r.NumSocio))
                    .filter(v => !isNaN(v))
            )];

            console.log("partnerNumbersUsed (primeros 5):");
            console.log(partnerNumbersUsed.slice(0, 5));
            console.log("Tipos partnerNumbersUsed:");
            console.log(partnerNumbersUsed.slice(0, 5).map(v => typeof v));


            // Traer los socios existentes
            const existingPartners = await Partner.findAll({
                where: { partnerNumber: partnerNumbersUsed },
                attributes: ["partnerNumber"],
                transaction: t
            });

            console.log("existingPartners RAW (primeros 5):");
            console.log(existingPartners.slice(0, 5));

            const existingPartnerNumbers = existingPartners.map(r => Number(r.partnerNumber));

            console.log("existingPartnerNumbers (primeros 5):");
            console.log(existingPartnerNumbers.slice(0, 5));
            console.log("Tipos existingPartnerNumbers:");
            console.log(existingPartnerNumbers.slice(0, 5).map(v => typeof v));


            // Detectar los faltantes
            const missingPartners = partnerNumbersUsed.filter(num => !existingPartnerNumbers.includes(num));

            console.log("missingPartners (primeros 5):");
            console.log(missingPartners.slice(0, 5));
            console.log("Cantidad missing:", missingPartners.length);


            if (missingPartners.length > 0) {
                const newPartners = missingPartners.map(num => ({
                    partnerNumber: num,
                    surname: "Desconocido",         // no permite null
                    name: "Desconocido",            // no permite null
                    idUser: null,
                    idCategory: 1,                  // si no permite null
                    LocalityId: 1,                  // si no permite null
                    idState: 1,                     // si no permite null
                    idReason: null,
                    birthDate: null,
                    documentType: null,
                    documentNumber: "",
                    MaritalStatusId: null,
                    nationality: "Desconocido",
                    homeAddress: "Desconocido",
                    homePhone: "",
                    homePostalCode: "",
                    profession: "Desconocido",
                    workplace: "Desconocido",
                    workAddress: "Desconocido",
                    workPhone: "",
                    workPostalCode: "",
                    registrationDate: null,
                    presentedBy: "",
                    collectionAddress: "",
                    preferredTime: "",
                    isActive: 1,                     // si no permite null
                    withdrawalDate: null,
                    observations: "",
                    workLocationId: 1,               // si no permite null
                    unpaidFees: 0,
                    pendingBooks: 0,
                    resignationDate: null
                }));

                await Partner.bulkCreate(newPartners, { transaction: t });
                console.log(`Se agregaron ${newPartners.length} socios faltantes con datos predeterminados.`);
            }

            // ---------------------------
            // 2. Obtener mapa numero -> id real
            // ---------------------------

            const partnersForMap = await Partner.findAll({
                attributes: ["id", "partnerNumber"],
                transaction: t
            });

            const numeroToId = {};
            partnersForMap.forEach(p => {
                numeroToId[Number(p.partnerNumber)] = p.id;
            });

            console.log("Mapa numeroToId (5 ejemplos):");
            console.log(Object.entries(numeroToId).slice(0, 5));

            // ---------------------------
            // 2. Transformar los préstamos
            // ---------------------------
            const transformedLoans = loanRows.map(row => ({
                legacyLoanId: row.Id,
                partnerId: numeroToId[Number(row.NumSocio)] ?? null,
                loanType: row.TipoPrestamo ?? null,
                retiredDate: row.FechaRetiro ?? null,
                withdrawalTime: row.HoraRetiro || null,
                employeeId: row.IdEmpleado ?? null,
                name: row.Nombre || null,
                dni: row.DNI || null
            }));

            // ---------------------------
            // 3. Limpiar tabla Prestamo y bulk insert
            // ---------------------------
            await Loan.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await Loan.bulkCreate(transformedLoans, {
                transaction: t,
                validate: false
            });

            const loansForMap = await Loan.findAll({
                attributes: ["id", "legacyLoanId"],
                transaction: t
            });

            const loanLegacyToNewId = {};

            loansForMap.forEach(l => {
                loanLegacyToNewId[Number(l.legacyLoanId)] = l.id;
            });

            console.log("Mapa prestamos (5 ejemplos):");
            console.log(Object.entries(loanLegacyToNewId).slice(0, 5));

            console.log("Préstamos importados correctamente.");

            /*
            =========================
            IMPORTAR RESERVAS
            =========================
            */

            // Obtener reservas legacy
            const reservationTable = reader.getTable("Reservas");
            const reservationRows = reservationTable.getData();

            console.log(`Importando ${reservationRows.length} reservas...`);

            // ---------------------------
            // 1. Obtener NumSocio usados en reservas
            // ---------------------------
            const reservationPartnerNumbers = [...new Set(
                reservationRows
                    .map(r => Number(r.NumSocio))
                    .filter(v => !isNaN(v))
            )];

            console.log("reservationPartnerNumbers (primeros 5):");
            console.log(reservationPartnerNumbers.slice(0, 5));

            // ---------------------------
            // 2. Buscar socios existentes para reservas
            // ---------------------------
            const existingReservationPartners = await Partner.findAll({
                where: { partnerNumber: reservationPartnerNumbers },
                attributes: ["partnerNumber"],
                transaction: t
            });

            const existingReservationPartnerNumbers =
                existingReservationPartners.map(r => Number(r.partnerNumber));

            // ---------------------------
            // 3. Detectar socios faltantes en reservas
            // ---------------------------
            const missingReservationPartners = reservationPartnerNumbers.filter(
                num => !existingReservationPartnerNumbers.includes(num)
            );

            console.log("Socios faltantes en reservas:", missingReservationPartners.length);

            // ---------------------------
            // 4. Crear socios faltantes (si hay)
            // ---------------------------
            if (missingReservationPartners.length > 0) {

                const newReservationPartners = missingReservationPartners.map(num => ({
                    partnerNumber: num,
                    surname: "Desconocido",
                    name: "Desconocido",
                    idUser: null,
                    idCategory: 1,
                    LocalityId: 1,
                    idState: 1,
                    idReason: null,
                    birthDate: null,
                    documentType: null,
                    documentNumber: "",
                    MaritalStatusId: null,
                    nationality: "Desconocido",
                    homeAddress: "Desconocido",
                    homePhone: "",
                    homePostalCode: "",
                    profession: "Desconocido",
                    workplace: "Desconocido",
                    workAddress: "Desconocido",
                    workPhone: "",
                    workPostalCode: "",
                    registrationDate: null,
                    presentedBy: "",
                    collectionAddress: "",
                    preferredTime: "",
                    isActive: 1,
                    withdrawalDate: null,
                    observations: "",
                    workLocationId: 1,
                    unpaidFees: 0,
                    pendingBooks: 0,
                    resignationDate: null
                }));

                await Partner.bulkCreate(newReservationPartners, { transaction: t });

                console.log(`Se agregaron ${newReservationPartners.length} socios faltantes para reservas.`);
            }

            // ---------------------------
            // 5. Construir mapa numero → id real para reservas
            // ---------------------------
            const reservationPartnersForMap = await Partner.findAll({
                attributes: ["id", "partnerNumber"],
                transaction: t
            });

            const reservationNumeroToId = {};
            reservationPartnersForMap.forEach(p => {
                reservationNumeroToId[Number(p.partnerNumber)] = p.id;
            });

            console.log("Mapa reservationNumeroToId (5 ejemplos):");
            console.log(Object.entries(reservationNumeroToId).slice(0, 5));

            // ---------------------------
            // 6. Transformar reservas
            // ---------------------------
            const transformedReservations = reservationRows.map(row => ({
                bookTitle: row.TituloLibro || null,
                reservationDate: row.FechaReserva ?? null,
                expectedDate: row.FechaPrometida ?? null,
                partnerNumber: row.NumSocio ?? null, // opcional mantenerlo
                partnerId: reservationNumeroToId[Number(row.NumSocio)] ?? null,
                comments: row.Comentarios || null
            }));

            // ---------------------------
            // 7. Limpiar tabla y bulk insert
            // ---------------------------
            await Reservations.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await Reservations.bulkCreate(transformedReservations, {
                transaction: t,
                validate: false
            });

            console.log("Reservas importadas correctamente.");


            /*
            =========================
            IMPORTAR GRUPOS TIPO LIBRO
            =========================
            */

            // Obtener tabla legacy
            const bookTypeGroupTable = reader.getTable("GruposTipoLibro");
            const bookTypeGroupRows = bookTypeGroupTable.getData();

            console.log(`Importando ${bookTypeGroupRows.length} grupos de tipo libro...`);

            // ---------------------------
            // 1. Transformar datos
            // ---------------------------
            const transformedBookTypeGroups = bookTypeGroupRows.map(row => ({
                legacyId: row.Id ?? null,
                group: row.Grupo || null,
                maxAmount: row.CantMaxima ?? 0
            }));

            console.log("Primeros 5 grupos transformados:");
            console.log(transformedBookTypeGroups.slice(0, 5));

            // ---------------------------
            // 2. Limpiar tabla
            // ---------------------------
            await BookTypeGroupList.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            // ---------------------------
            // 3. Insertar datos
            // ---------------------------
            await BookTypeGroupList.bulkCreate(transformedBookTypeGroups, {
                transaction: t,
                validate: false
            });

            console.log("Grupos Tipo Libro importados correctamente.");

            /*
            =========================
            IMPORTAR SIGNOS
            =========================
            */

            // Obtener tabla legacy
            const signsTable = reader.getTable("signs");
            const signsRows = signsTable.getData();

            console.log(`Importando ${signsRows.length} signos...`);

            // ---------------------------
            // 1. Transformar datos
            // ---------------------------
            const transformedSigns = signsRows.map(row => ({
                from: row.desde || null,
                to: row.hasta || null,
                number: row.numero ?? null
            }));

            console.log("Primeros 5 signos transformados:");
            console.log(transformedSigns.slice(0, 5));

            // ---------------------------
            // 2. Limpiar tabla
            // ---------------------------
            await Signs.destroy({
                truncate: true,
                cascade: true,
                transaction: t
            });

            // ---------------------------
            // 3. Insertar datos
            // ---------------------------
            await Signs.bulkCreate(transformedSigns, {
                transaction: t,
                validate: false
            });

            console.log("Signos importados correctamente.");


            /*
            =========================
            IMPORTAR ULTIMA GENERACION
            =========================
            */

            const lastGenerationTable = reader.getTable("UltimaGeneracion");
            const lastGenerationRows = lastGenerationTable.getData();

            console.log(`Importando ${lastGenerationRows.length} registros de UltimaGeneracion...`);

            console.table(
                lastGenerationRows.slice(0, 5).map(r => ({
                    Mes: r.Mes,
                    Anio: r.Anio,
                    Fecha: r.Fecha
                }))
            );

            // Transformar datos
            const transformedLastGeneration = lastGenerationRows.map(row => ({
                id: row.id ?? null,
                month: row.Mes ?? null,
                year: row.Anio ?? null,
                date: row.Fecha ?? null
            }));

            // Limpiar tabla (porque debería tener solo el último registro)
            await LastGeneration.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            // Insertar nuevos datos
            if (transformedLastGeneration.length > 0) {
                await LastGeneration.bulkCreate(transformedLastGeneration, {
                    transaction: t,
                    validate: false
                });

                console.log("UltimaGeneracion importada correctamente.");
            } else {
                console.log("No había registros en UltimaGeneracion para importar.");
            }

            /*
            =========================
            IMPORTAR CUOTAS
            =========================
            */

            const feesTable = reader.getTable("Cuotas");
            const feesRows = feesTable.getData();

            console.log(`Importando ${feesRows.length} cuotas...`);

            console.table(
                feesRows.slice(0, 5).map(r => ({
                    Id: r.Id,
                    IdSocio: r.IdSocio,
                    Mes: r.Mes,
                    Anio: r.Anio,
                    Monto: r.Monto,
                    Paga: r.Paga
                }))
            );

            // -------------------------------------------------
            // 1. Detectar socios usados en cuotas (legacy)
            // -------------------------------------------------

            const feePartnerNumbersUsed = [...new Set(
                feesRows
                    .map(r => Number(r.IdSocio))
                    .filter(v => !isNaN(v))
            )];

            console.log("Socios usados en cuotas (primeros 5):");
            console.log(feePartnerNumbersUsed.slice(0, 5));

            // Traer socios existentes por numero legacy
            const existingFeePartners = await Partner.findAll({
                where: { partnerNumber: feePartnerNumbersUsed },
                attributes: ["partnerNumber"],
                transaction: t
            });

            const existingFeePartnerNumbers = existingFeePartners.map(p => Number(p.partnerNumber));

            // Detectar faltantes
            const missingFeePartners = feePartnerNumbersUsed.filter(
                num => !existingFeePartnerNumbers.includes(num)
            );

            console.log("Socios faltantes en cuotas:", missingFeePartners.slice(0, 5));
            console.log("Cantidad faltantes:", missingFeePartners.length);

            // -------------------------------------------------
            // 2. Crear socios faltantes si existen
            // -------------------------------------------------

            if (missingFeePartners.length > 0) {

                const newFeePartners = missingFeePartners.map(num => ({
                    partnerNumber: num,
                    surname: "Desconocido",
                    name: "Desconocido",
                    idUser: null,
                    idCategory: 1,
                    LocalityId: 1,
                    idState: 1,
                    idReason: null,
                    birthDate: null,
                    documentType: null,
                    documentNumber: "",
                    MaritalStatusId: null,
                    nationality: "Desconocido",
                    homeAddress: "Desconocido",
                    homePhone: "",
                    homePostalCode: "",
                    profession: "Desconocido",
                    workplace: "Desconocido",
                    workAddress: "Desconocido",
                    workPhone: "",
                    workPostalCode: "",
                    registrationDate: null,
                    presentedBy: "",
                    collectionAddress: "",
                    preferredTime: "",
                    isActive: 1,
                    withdrawalDate: null,
                    observations: "",
                    workLocationId: 1,
                    unpaidFees: 0,
                    pendingBooks: 0,
                    resignationDate: null
                }));

                await Partner.bulkCreate(newFeePartners, { transaction: t });

                console.log(`Se agregaron ${newFeePartners.length} socios faltantes para cuotas.`);
            }

            // -------------------------------------------------
            // 3. Construir mapa numero → id real (CUOTAS)
            // -------------------------------------------------

            const feePartnersForMap = await Partner.findAll({
                attributes: ["id", "partnerNumber"],
                transaction: t
            });

            const feeNumeroToId = {};

            feePartnersForMap.forEach(p => {
                feeNumeroToId[Number(p.partnerNumber)] = p.id;
            });

            console.log("Mapa numeroToId cuotas (5 ejemplos):");
            console.log(Object.entries(feeNumeroToId).slice(0, 5));

            // -------------------------------------------------
            // 4. Transformar cuotas usando id real 
            // -------------------------------------------------

            const transformedFees = feesRows.map(row => {
                const year = Number(row.Anio);
                const month = Number(row.Mes);

                let createdAt = null;
                let periodDate = null;

                if (!isNaN(year) && !isNaN(month) && month >= 1 && month <= 12) {
                    const d = new Date(Date.UTC(year, month - 1, 1));
                    if (!isNaN(d.getTime())) {
                        periodDate = d;
                        createdAt = d;
                    }
                }

                let dateOfPaid = null;
                if (row.FechaPago) {
                    const parsed = new Date(row.FechaPago);
                    if (!isNaN(parsed.getTime())) {
                        dateOfPaid = parsed;
                    }
                }

                return {
                    month: isNaN(month) ? null : month,
                    year: isNaN(year) ? null : year,
                    amount: row.Monto ?? null,
                    idPartner: feeNumeroToId[Number(row.IdSocio)] ?? null,
                    paid: row.Paga ?? false,
                    observation: row.Observacion ?? null,
                    date_of_paid: dateOfPaid,
                    createdAt,
                    periodDate
                };
            });

            // -------------------------------------------------
            // 5. Limpiar tabla e insertar
            // -------------------------------------------------

            await Fees.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            await Fees.bulkCreate(transformedFees, {
                transaction: t,
                validate: false
            });

            console.log("Cuotas importadas correctamente.");

            /*
            =========================
            IMPORTAR PRESTAMO LIBRO
            =========================
            */

            const loanBookTable = reader.getTable("PrestamoLibro");
            const loanBookRows = loanBookTable.getData();

            console.log(`Importando ${loanBookRows.length} registros de PrestamoLibro...`);

            const transformedLoanBooks = loanBookRows.map(row => {

                const legacyLoanId = String(row.IdPrestamo).trim();
                const legacyBookCode = String(row.CodLibro).trim();

                const newLoanId = loanLegacyToNewId[legacyLoanId];
                const newBookId = bookLegacyToNewId[legacyBookCode];

                return {
                    BookId: newBookId ?? null,
                    loanId: newLoanId ?? null,
                    bookCode: legacyBookCode,
                    expectedDate: row.FechaPrevista ?? null,
                    returnedDate: row.FechaDevolucion ?? null,
                    reneweAmount: row.CantRenovacion ?? 0,
                    returned: row.Devuelto ?? false,
                    copy: row.Ejemplar ?? null
                };
            });


            // =======================================
            // 🔎 FILTRAR registros inválidos
            // =======================================

            const filteredLoanBooks = transformedLoanBooks.filter(lb =>
                lb.loanId !== null && lb.BookId !== null
            );

            // =======================================
            // Limpiar tabla
            // =======================================

            await LoanBook.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });


            // =======================================
            // Insertar solo válidos
            // =======================================

            await LoanBook.bulkCreate(filteredLoanBooks, {
                transaction: t,
                validate: false
            });

            console.log("PrestamoLibro importado correctamente.");

            /*
            =========================
            IMPORTAR AUTORLIBRO
            =========================
            */

            const bookAuthorTable = reader.getTable("AutorLibro");
            const bookAuthorRows = bookAuthorTable.getData();

            console.log(`Importando ${bookAuthorRows.length} registros de AutorLibro...`);

            const transformedBookAuthors = bookAuthorRows.map(row => {

                const legacyBookCode = String(row.CodLibro).trim();
                const legacyAuthor = Number(row.CodAutor);  // el código legacy
                const newAuthorId = authorLegacyToNewId[legacyAuthor]; // si tuviste que mapear autores nuevos

                const newBookId = bookLegacyToNewId[legacyBookCode];

                if (!newBookId) console.warn(`⚠ Libro no encontrado: ${legacyBookCode}`);
                if (!newAuthorId) console.warn(`⚠ Autor no encontrado: ${legacyAuthor}`);

                return {
                    BookId: newBookId ?? null,
                    authorCode: newAuthorId ?? null,   // vincula con Author.id
                    legacyAuthorCode: legacyAuthor,    // conserva el código antiguo
                    position: row.Posicion ?? null
                };
            });


            // =======================================
            // 🔎 FILTRAR inválidos
            // =======================================

            const filteredBookAuthors = transformedBookAuthors.filter(ba =>
                ba.BookId !== null && ba.authorCode !== null
            );

            console.log(`Registros válidos: ${filteredBookAuthors.length}`);
            console.log(`Registros descartados: ${transformedBookAuthors.length - filteredBookAuthors.length}`);


            // =======================================
            // 🧹 Limpiar tabla
            // =======================================

            await BookAuthor.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });


            // =======================================
            // 💾 Insertar
            // =======================================

            await BookAuthor.bulkCreate(filteredBookAuthors, {
                transaction: t,
                validate: false
            });

            console.log("AutorLibro importado correctamente.");


            /*
            =========================
            IMPORTAR RESERVAS LIBRO
            =========================
            */

            const bookReservationsTable = reader.getTable("ReservasLibro");
            const bookReservationsRows = bookReservationsTable.getData();

            console.log(`Importando ${bookReservationsRows.length} registros de ReservasLibro...`);

            // 🔹 Mapear legacy → nuevos IDs
            const transformedBookReservations = bookReservationsRows.map(row => {

                const legacyBookCode = String(row.CodLibro).trim();
                const legacyReservationId = Number(row.IdReserva);

                const newBookId = bookLegacyToNewId[legacyBookCode];
                const newReservationId = reservationLegacyToNewId[legacyReservationId]; // si creaste este mapa

                if (!newBookId) {
                    console.warn(`⚠ Libro no encontrado para legacy CodLibro: ${legacyBookCode}`);
                }

                if (!newReservationId) {
                    console.warn(`⚠ Reserva no encontrada para legacy IdReserva: ${legacyReservationId}`);
                }

                return {
                    BookId: newBookId ?? null,              // ID real del libro
                    reservationId: newReservationId ?? null, // ID real de la reserva
                    bookCode: legacyBookCode,               // opcional para referencia legacy
                    bookTitle: row.TituloLibro || null
                };
            });

            // 🔹 Filtrar registros válidos
            const filteredBookReservations = transformedBookReservations.filter(
                br => br.BookId !== null && br.reservationId !== null
            );

            console.log(`Registros válidos: ${filteredBookReservations.length}`);
            console.log(`Registros descartados: ${transformedBookReservations.length - filteredBookReservations.length}`);

            // 🔹 Limpiar tabla antes de insertar
            await BookReservations.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            // 🔹 Insertar solo registros válidos
            await BookReservations.bulkCreate(filteredBookReservations, {
                transaction: t,
                validate: false
            });

            console.log("ReservasLibro importadas correctamente.");

            /*
            =========================
            IMPORTAR TIPO-LIBRO GRUPO
            =========================
            */

            const tipoLibroGrupoTable = reader.getTable("TipoLibroGrupo");
            const tipoLibroGrupoRows = tipoLibroGrupoTable.getData();

            console.log(`Importando ${tipoLibroGrupoRows.length} registros de TipoLibroGrupo...`);

            // 🔹 1. Obtener mapa legacyBookTypeId → nuevo bookTypeId
            const bookTypesList = await BookType.findAll({
                attributes: ["bookTypeId", "legacyBookTypeId"],
                transaction: t
            });

            const bookTypeLegacyMap = {};
            bookTypesList.forEach(bt => {
                bookTypeLegacyMap[bt.legacyBookTypeId] = bt.bookTypeId;
            });

            // 🔹 2. Obtener mapa legacyBookTypeGroupId → nuevo BookTypeGroupListId
            const bookTypeGroupsList = await BookTypeGroupList.findAll({
                attributes: ["bookTypeGroupListId", "legacyId"],
                transaction: t
            });

            const bookTypeGroupLegacyMap = {};
            bookTypeGroupsList.forEach(g => {
                bookTypeGroupLegacyMap[g.legacyId] = g.bookTypeGroupListId;
            });

            console.log("Mapa legacyBookTypeGroup → nuevo BookTypeGroupListId (5 ejemplos):");
            console.log(Object.entries(bookTypeGroupLegacyMap).slice(0, 5));

            // 🔹 3. Transformar datos legacy a nuevos IDs
            const transformedGroups = tipoLibroGrupoRows.map(row => {
                const newBookTypeId = bookTypeLegacyMap[row.IdTipoLibro] ?? null;
                const newBookTypeGroupListId = bookTypeGroupLegacyMap[row.IdGrupo] ?? null;

                if (!newBookTypeId) {
                    console.warn(`⚠ No se encontró bookTypeId para legacy IdTipoLibro: ${row.IdTipoLibro}`);
                }
                if (!newBookTypeGroupListId) {
                    console.warn(`⚠ No se encontró BookTypeGroupListId para legacy IdGrupo: ${row.IdGrupo}`);
                }

                return {
                    BookTypeGroupListId: newBookTypeGroupListId,
                    bookTypeId: newBookTypeId
                };
            });

            // 🔹 4. Filtrar registros inválidos (sin bookTypeId o BookTypeGroupListId)
            const filteredGroups = transformedGroups.filter(
                g => g.bookTypeId !== null && g.BookTypeGroupListId !== null
            );

            console.log(`Registros válidos: ${filteredGroups.length}`);
            console.log(`Registros descartados: ${transformedGroups.length - filteredGroups.length}`);

            // 🔹 5. Limpiar tabla
            await BookTypeGroup.destroy({
                truncate: true,
                restartIdentity: true,
                cascade: true,
                transaction: t
            });

            // 🔹 6. Insertar datos
            await BookTypeGroup.bulkCreate(filteredGroups, {
                transaction: t,
                validate: false
            });

            console.log("TipoLibroGrupo importado correctamente.");
        });





        console.log("Migración completa ✅");
        process.exit(0);

    } catch (error) {
        console.error("Error en migración:", error);
        process.exit(1);
    }
}

async function createAdminUser() {

    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || "Administrador";

    if (!adminEmail || !adminPassword) {
        console.log("ADMIN_EMAIL o ADMIN_PASSWORD no definidos. No se crea admin.");
        return;
    }

    const t = await sequelize.transaction();

    try {

        const [adminRole] = await Role.findOrCreate({
            where: { name: "admin" },
            defaults: {
                name: "admin",
                description: "Rol administrador del sistema"
            },
            transaction: t
        });

        const existingUser = await User.findOne({
            where: { email: adminEmail },
            transaction: t
        });

        let adminUser;

        if (!existingUser) {

            const hashedPassword = await bcrypt.hash(adminPassword, 10);

            adminUser = await User.create({
                fullName: adminName,
                email: adminEmail,
                password: hashedPassword
            }, { transaction: t });

            console.log("Usuario admin creado.");
        } else {
            adminUser = existingUser;
            console.log("Usuario admin ya existe.");
        }

        const existingRelation = await UserRole.findOne({
            where: {
                userId: adminUser.id,
                roleId: adminRole.id
            },
            transaction: t
        });

        if (!existingRelation) {
            await UserRole.create({
                userId: adminUser.id,
                roleId: adminRole.id
            }, { transaction: t });
        }

        await t.commit();
        console.log("Inicialización de admin completada.");

    } catch (error) {
        await t.rollback();
        console.error("Error creando usuario admin:", error);
    }
}


createAdminUser();
migrateAll();