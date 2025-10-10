-- -------------------------------
-- 1️⃣ Autores
-- -------------------------------
INSERT INTO "Autores" ("Nombre", "Nacionalidad") VALUES
('Antoine de Saint-Exupéry', 'Francesa'),
('Gabriel García Márquez', 'Colombiana'),
('George Orwell', 'Británica'),
('Miguel de Cervantes', 'Española');

-- -------------------------------
-- 2️⃣ TipoLibro
-- -------------------------------
INSERT INTO "TipoLibro" ("TipoLibro", "DiasPrestamo") VALUES
('Novela', 14),
('Cuento', 7),
('Historia', 21);

-- -------------------------------
-- 3️⃣ Libros
-- -------------------------------
INSERT INTO "Libros" (codigo, "Cod_rcdu", titulo, "Editorial", "Nro_edic", "Anio_edic", "Cant_ejemplar", "Tipo") VALUES
('LB001', 'CR001', 'El Principito', 'Editorial A', 1, 1943, 3, 1),
('LB002', 'CR002', 'Cien Años de Soledad', 'Editorial B', 1, 1967, 2, 1),
('LB003', 'CR003', '1984', 'Editorial C', 1, 1949, 4, 1),
('LB004', 'CR004', 'Don Quijote', 'Editorial D', 2, 1605, 1, 2);

-- -------------------------------
-- 4️⃣ AutorLibro
-- -------------------------------
INSERT INTO "AutorLibro" ("BookId", "CodLibro", "CodAutor", "Posicion") VALUES
(1, 'LB001', 1, 1),
(2, 'LB002', 2, 1),
(3, 'LB003', 3, 1),
(4, 'LB004', 4, 1);

-- -------------------------------
-- 5️⃣ Claves
-- -------------------------------
INSERT INTO "Claves" ("Clave") VALUES
('Ficción'), ('Clásico'), ('Literatura Juvenil');

-- -------------------------------
-- 6️⃣ ClavesLibro
-- -------------------------------
INSERT INTO "ClavesLibro" ("IdClave", "bookId", "CodLibro") VALUES
(1, 1, 'LB001'),
(2, 2, 'LB002'),
(3, 3, 'LB003');

-- -------------------------------
-- 7️⃣ Signs
-- -------------------------------
INSERT INTO signs (desde, hasta, numero) VALUES
('A', 'B', 100),
('C', 'D', 200);

-- -------------------------------
-- 8️⃣ UltimaGeneracion
-- -------------------------------
INSERT INTO "UltimaGeneracion" ("Mes", "Anio", "Fecha") VALUES
(9, 2025, '2025-09-01');

-- -------------------------------
-- 9️⃣ CategoriaSocio
-- -------------------------------
INSERT INTO "CategoriaSocio" ("Categoria", "Importe") VALUES
('Regular', 100.00),
('Premium', 200.00);

-- -------------------------------
-- 10️⃣ Localidades
-- -------------------------------
INSERT INTO "Localidades" ("Localidad", "CPostal") VALUES
('Buenos Aires', '1000'),
('Cordoba', '5000');

-- -------------------------------
-- 11️⃣ EstadoSocio
-- -------------------------------
INSERT INTO "EstadoSocio" ("Estado") VALUES
('Activo'), ('Inactivo');

-- -------------------------------
-- 12️⃣ MotivoBaja
-- -------------------------------
INSERT INTO "MotivoBaja" ("Motivo") VALUES
('Renuncia'), ('Mora');

-- -------------------------------
-- 13️⃣ TipoDocumento
-- -------------------------------
INSERT INTO "TipoDocumento" ("documentType") VALUES
('DNI'), ('Pasaporte');

-- -------------------------------
-- 14️⃣ EstadoCivil
-- -------------------------------
INSERT INTO "EstadoCivil" ("EstadoCivil") VALUES
('Soltero'), ('Casado');

-- -------------------------------
-- 15️⃣ Socio
-- -------------------------------
INSERT INTO socio (numero, "IdCategoria", "IdLocal_part", "IdEstado", "Motivo_Baj", apellido, nombre, fecha_nac, tipo_docum, nro_docum, est_civil, nacionalid, fecha_insc, est_socio) VALUES
(1, 1, 1, 1, NULL, 'Gomez', 'Ana', '1990-03-12', 1, '12345678', 1, 'ARG', '2020-01-15', true),
(2, 1, 1, 1, NULL, 'Perez', 'Carlos', '1985-07-22', 1, '87654321', 1, 'ARG', '2019-06-10', true),
(3, 2, 2, 1, NULL, 'Lopez', 'Maria', '2000-11-05', 1, '11223344', 2, 'ARG', '2021-03-01', true),
(4, 2, 2, 2, 2, 'Martinez', 'Juan', '1995-09-18', 1, '44332211', 1, 'ARG', '2018-08-20', false);

-- -------------------------------
-- 16️⃣ Empleados
-- -------------------------------
INSERT INTO "Empleados" ("Nombre", "Codigo") VALUES
('Javier Perez', 'EMP001'),
('Lucia Gomez', 'EMP002');

-- -------------------------------
-- 17️⃣ TipoPrestamo
-- -------------------------------
INSERT INTO "TipoPrestamo" ("Descripcion") VALUES
('Normal'), ('Urgente');

-- -------------------------------
-- 18️⃣ Prestamo
-- -------------------------------
INSERT INTO "Prestamo" ("Id", "partnerId", "TipoPrestamo", "FechaRetiro", "HoraRetiro", "IdEmpleado", "Nombre", "DNI") VALUES
(1, 1, 1, '2025-01-05', '10:00', 1, 'Ana Gomez', '12345678'),
(2, 2, 1, '2025-01-06', '11:30', 1, 'Carlos Perez', '87654321'),
(3, 1, 1, '2025-02-10', '09:15', 2, 'Ana Gomez', '12345678'),
(4, 3, 2, '2025-02-15', '14:00', 2, 'Maria Lopez', '11223344');

-- -------------------------------
-- 19️⃣ PrestamoLibro
-- -------------------------------
INSERT INTO "PrestamoLibro" ("BookId", "IdPrestamo", "CodLibro", "FechaPrevista", "FechaDevolucion", "Devuelto") VALUES
(1, 1, 'LB001', '2025-01-20', NULL, false),
(2, 2, 'LB002', '2025-01-21', '2025-01-21', true),
(3, 3, 'LB003', '2025-02-25', NULL, false),
(1, 3, 'LB001', '2025-02-25', NULL, false),
(4, 4, 'LB004', '2025-03-01', '2025-03-01', true);

-- -------------------------------
-- 20️⃣ GruposTipoLibro
-- -------------------------------
INSERT INTO "GruposTipoLibro" ("Grupo", "CantMaxima") VALUES
('Literatura', 10),
('Ciencia', 5);

-- -------------------------------
-- 21️⃣ TipoLibroGrupo
-- -------------------------------
INSERT INTO "TipoLibroGrupo" ("IdGrupo", "IdTipoLibro") VALUES
(1, 1),
(1, 2),
(2, 3);

-- -------------------------------
-- 22️⃣ Cuotas
-- -------------------------------
INSERT INTO "Cuotas" ("Mes", "Anio", "Monto", "IdSocio", "Paga", "FechaPago") VALUES
(9, 2025, 100.00, 1, true, '2025-09-01'),
(9, 2025, 200.00, 2, false, NULL);

-- -------------------------------
-- 23️⃣ Lectores
-- -------------------------------
INSERT INTO "Lectores" ("DNI", "Nombre") VALUES
('12345678', 'Ana Gomez'),
('87654321', 'Carlos Perez');

-- -------------------------------
-- 24️⃣ Reservas
-- -------------------------------
INSERT INTO "Reservas" ("TituloLibro", "FechaReserva", "FechaPrometida", "NumSocio", "Comentarios") VALUES
('El Principito', '2025-09-01', '2025-09-15', 1, 'Reservado por 15 días'),
('1984', '2025-09-05', '2025-09-20', 2, 'Reservado por 15 días');

-- -------------------------------
-- 25️⃣ ReservasLibro
-- -------------------------------
INSERT INTO "ReservasLibro" ("IdBook", "IdReserva", "CodLibro", "TituloLibro") VALUES
(1, 1, 'LB001', 'El Principito'),
(3, 2, 'LB003', '1984');
