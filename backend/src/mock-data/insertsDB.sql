-- ===== AUTORES =====
INSERT INTO "Autores" ("Nombre", "Nacionalidad")
VALUES 
('Gabriel García Márquez', 'Colombiana'),
('Julio Cortázar', 'Argentina'),
('Isabel Allende', 'Chilena');

-- ===== TIPO LIBRO =====
INSERT INTO "TipoLibro" ("TipoLibro", "DiasPrestamo")
VALUES 
('Novela', 15),
('Ensayo', 10),
('Referencia', 3);

-- ===== LIBROS =====
INSERT INTO "Libros" (codigo, codigo_cdu, titulo, editorial, numero_de_edicion, anio_de_edicion, traductor, codigo_clasificacion, cantidad_de_ejemplares, notas, tipo, codigo_linguistico, autores, id_proveedor, numero_de_factura, fecha_de_compra, perdido)
VALUES
('L001', '82-3', 'Cien Años de Soledad', 'Sudamericana', 1, 1967, NULL, 'NOV', 5, 'Primera edición', 1, 'ES', 'Gabriel García Márquez', NULL, NULL, NOW(), FALSE),
('L002', '82-3', 'Rayuela', 'Sudamericana', 3, 1963, NULL, 'NOV', 3, NULL, 1, 'ES', 'Julio Cortázar', NULL, NULL, NOW(), FALSE),
('L003', '81-4', 'La Casa de los Espíritus', 'Plaza & Janés', 1, 1982, NULL, 'NOV', 2, NULL, 1, 'ES', 'Isabel Allende', NULL, NULL, NOW(), FALSE);

-- ===== AUTOR LIBRO =====
INSERT INTO "AutorLibro" ("BookId", "CodLibro", "CodAutor", "Posicion")
VALUES
(1, 'L001', 1, 1),
(2, 'L002', 2, 1),
(3, 'L003', 3, 1);

-- ===== CLAVES =====
INSERT INTO "Claves" ("Clave")
VALUES 
('Realismo mágico'),
('Literatura latinoamericana'),
('Narrativa contemporánea');

-- ===== CLAVES LIBRO =====
INSERT INTO "ClavesLibro" ("IdClave", "bookId", "CodLibro")
VALUES
(1, 1, 'L001'),
(2, 2, 'L002'),
(3, 3, 'L003');

-- ===== SIGNS =====
INSERT INTO signs (desde, hasta, numero)
VALUES
('A', 'D', 1),
('E', 'H', 2),
('I', 'L', 3);

-- ===== CATEGORIA SOCIO =====
INSERT INTO "CategoriaSocio" ("Categoria", "Importe")
VALUES
('Estudiante', 1500.00),
('Regular', 2500.00),
('Premium', 4000.00);

-- ===== LOCALIDADES =====
INSERT INTO "Localidades" ("Localidad", "CPostal")
VALUES
('Buenos Aires', '1000'),
('Rosario', '2000'),
('Córdoba', '5000');

-- ===== ESTADO SOCIO =====
INSERT INTO "EstadoSocio" ("Estado")
VALUES
('Activo'),
('Suspendido'),
('Baja');

-- ===== MOTIVO BAJA =====
INSERT INTO "MotivoBaja" ("Motivo")
VALUES
('Renuncia'),
('Fallecimiento'),
('Incumplimiento de pagos');

-- ===== TIPO DOCUMENTO =====
INSERT INTO "TipoDocumento" ("documentType")
VALUES
('DNI'),
('Pasaporte'),
('Cédula');

-- ===== ESTADO CIVIL =====
INSERT INTO "EstadoCivil" ("EstadoCivil")
VALUES
('Soltero'),
('Casado'),
('Divorciado');

-- ===== SOCIO =====
INSERT INTO socio (numero, "IdCategoria", "IdLocal_part", "IdEstado", "Motivo_Baj", apellido, nombre, fecha_nac, tipo_docum, nro_docum, est_civil, nacionalid, dir_part, tel_part, fecha_insc, est_socio)
VALUES
(1001, 1, 1, 1, 1, 'Pérez', 'Juan', '1990-05-12', 1, '30111222', 1, 'Argentina', 'Av. Corrientes 123', '1122334455', '2020-01-10', 1),
(1002, 2, 2, 1, 1, 'González', 'Laura', '1985-07-03', 1, '29444333', 2, 'Argentina', 'Calle San Martín 45', '1133445566', '2021-02-15', 1);

-- ===== CUOTAS =====
INSERT INTO "Cuotas" ("Mes", "Anio", "Monto", "IdSocio", "Paga", "FechaPago")
VALUES
(9, 2025, 2500.00, 1, TRUE, NOW()),
(10, 2025, 2500.00, 1, FALSE, NULL),
(9, 2025, 4000.00, 2, TRUE, NOW());

-- ===== ULTIMA GENERACION =====
INSERT INTO "UltimaGeneracion" ("Mes", "Anio", "Fecha")
VALUES
(9, 2025, '2025-09-30');

-- ===== RESERVAS =====
INSERT INTO "Reservas" ("TituloLibro", "FechaReserva", "FechaPrometida", "NumSocio", "Comentarios")
VALUES
('Rayuela', '2025-09-20', '2025-09-30', 1001, 'Retirar antes de fin de mes'),
('Cien Años de Soledad', '2025-09-25', '2025-10-05', 1002, 'Solicitado para taller');

-- ===== RESERVAS LIBRO =====
INSERT INTO "ReservasLibro" ("IdBook", "IdReserva", "CodLibro", "TituloLibro")
VALUES
(2, 1, 'L002', 'Rayuela'),
(1, 2, 'L001', 'Cien Años de Soledad');

-- ===== EMPLEADOS =====
INSERT INTO "Empleados" ("Nombre", "Codigo")
VALUES
('María López', 'E001'),
('Carlos Ruiz', 'E002');

-- ===== TIPO PRESTAMO =====
INSERT INTO "TipoPrestamo" ("Descripcion")
VALUES
('Normal'),
('Especial');

-- ===== PRESTAMO =====
INSERT INTO "Prestamo" ("Id", "partnerId", "TipoPrestamo", "FechaRetiro", "HoraRetiro", "IdEmpleado", "Nombre", "DNI")
VALUES
(1, 1, 1, '2025-09-15', '10:00', 1, 'Juan Pérez', '30111222'),
(2, 2, 2, '2025-09-18', '15:30', 2, 'Laura González', '29444333');

-- ===== PRESTAMO LIBRO =====
INSERT INTO "PrestamoLibro" ("BookId", "IdPrestamo", "CodLibro", "FechaPrevista", "Devuelto", "Ejemplar")
VALUES
(1, 1, 'L001', '2025-09-30', TRUE, 1),
(2, 2, 'L002', '2025-10-05', FALSE, 1);

-- ===== GRUPOS TIPO LIBRO =====
INSERT INTO "GruposTipoLibro" ("Grupo", "CantMaxima")
VALUES
('Ficción', 3),
('No Ficción', 2);

-- ===== TIPO LIBRO GRUPO =====
INSERT INTO "TipoLibroGrupo" ("IdGrupo", "IdTipoLibro")
VALUES
(1, 1),
(2, 2);

-- ===== LECTORES =====
INSERT INTO "Lectores" ("DNI", "Nombre")
VALUES
('30111222', 'Juan Pérez'),
('29444333', 'Laura González');
