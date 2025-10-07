-- ====== CATEGORÍAS DE SOCIOS ======
INSERT INTO "CategoriaSocio" ("Categoria", "Importe")
VALUES
('Activo', 1500.00),
('Jubilado', 800.00);

-- ====== LOCALIDADES ======
INSERT INTO "Localidades" ("Localidad", "CPostal")
VALUES
('Buenos Aires', '1000'),
('Rosario', '2000');

-- ====== ESTADOS DE SOCIO ======
INSERT INTO "EstadoSocio" ("Estado")
VALUES
('Activo'),
('Inactivo');

-- ====== MOTIVOS DE BAJA ======
INSERT INTO "MotivoBaja" ("Motivo")
VALUES
('Renuncia'),
('Fallecimiento');

-- ====== TIPO DE DOCUMENTO ======
INSERT INTO "TipoDocumento" ("documentType")
VALUES
('DNI'),
('Pasaporte');

-- ====== ESTADO CIVIL ======
INSERT INTO "EstadoCivil" ("EstadoCivil")
VALUES
('Soltero'),
('Casado'),
('Divorciado');

-- ====== EMPLEADOS ======
INSERT INTO "Empleados" ("Nombre", "Codigo")
VALUES
('María López', 'EMP01'),
('Carlos Gómez', 'EMP02');

-- ====== TIPO DE PRÉSTAMO ======
INSERT INTO "TipoPrestamo" ("Descripcion")
VALUES
('Normal'),
('Urgente');

-- ====== TIPO DE LIBRO ======
INSERT INTO "TipoLibro" ("TipoLibro", "DiasPrestamo")
VALUES
('Novela', 15),
('Ensayo', 10);

-- ====== AUTORES ======
INSERT INTO "Autores" ("Nombre", "Nacionalidad")
VALUES
('Jorge Luis Borges', 'Argentina'),
('Gabriel García Márquez', 'Colombia');

-- ====== LIBROS ======
INSERT INTO "Libros" (codigo, "Cod_rcdu", titulo, "Editorial", "Nro_edic", "Anio_edic", "Traductor", "Cod_Clas", "Cant_ejemplar", "Notas", "Tipo", "Cod_Ling", "Autores", "IdProveedor", "NumFactura", "FechaCompra", "Perdido")
VALUES
('L001', 'RC001', 'El Aleph', 'Emecé', 3, 1949, '—', 'A1', 5, 'Cuentos fantásticos', 1, 'ESP', 'Jorge Luis Borges', 1, 'F001', '2020-01-10', FALSE),
('L002', 'RC002', 'Cien años de soledad', 'Sudamericana', 1, 1967, '—', 'A2', 3, 'Realismo mágico', 2, 'ESP', 'Gabriel García Márquez', 1, 'F002', '2021-03-15', FALSE);

-- ====== AUTORES LIBRO ======
INSERT INTO "AutorLibro" ("BookId", "CodLibro", "CodAutor", "Posicion")
VALUES
(1, 'L001', 1, 1),
(2, 'L002', 2, 1);

-- ====== SOCIOS ======
INSERT INTO socio (numero, "IdCategoria", "IdLocal_part", "IdEstado", "Motivo_Baj", apellido, nombre, fecha_nac, tipo_docum, nro_docum, est_civil, nacionalid, dir_part, tel_part, fecha_insc, est_socio)
VALUES
(1001, 1, 1, 1, 1, 'Pérez', 'Juan', '1990-05-12', 1, '30111222', 1, 'Argentina', 'Av. Corrientes 123', '1122334455', '2020-01-10', 1),
(1002, 2, 2, 1, 1, 'González', 'Laura', '1985-07-03', 1, '29444333', 2, 'Argentina', 'Calle San Martín 45', '1133445566', '2021-02-15', 2);

-- ====== PRÉSTAMOS ======
INSERT INTO "Prestamo" ("partnerId", "TipoPrestamo", "FechaRetiro", "HoraRetiro", "IdEmpleado", "Nombre", "DNI")
VALUES
(1, 1, '2023-01-05', '10:30', 1, 'Juan Pérez', '30111222'),
(2, 2, '2023-02-10', '11:15', 2, 'Laura González', '29444333');

-- ====== PRÉSTAMO LIBRO ======
INSERT INTO "PrestamoLibro" ("BookId", "IdPrestamo", "CodLibro", "FechaPrevista", "FechaDevolucion", "CantRenovacion", "Devuelto", "Ejemplar")
VALUES
(1, 1, 'L001', '2023-01-20', '2023-01-18', 0, TRUE, 1),
(2, 2, 'L002', '2023-02-25', NULL, 1, FALSE, 1);

-- ====== CUOTAS ======
INSERT INTO "Cuotas" ("Mes", "Anio", "Monto", "IdSocio", "Paga", "FechaPago")
VALUES
(1, 2023, 1500.00, 1, TRUE, '2023-01-05'),
(2, 2023, 1500.00, 1, TRUE, '2023-02-05'),
(1, 2023, 800.00, 2, FALSE, NULL);

-- ====== RESERVAS ======
INSERT INTO "Reservas" ("TituloLibro", "FechaReserva", "FechaPrometida", "NumSocio", "Comentarios")
VALUES
('El Aleph', '2023-03-01', '2023-03-10', 1, 'Reserva prioritaria'),
('Cien años de soledad', '2023-03-05', '2023-03-15', 2, 'Pendiente de devolución');

-- ====== RESERVAS LIBRO ======
INSERT INTO "ReservasLibro" ("IdBook", "IdReserva", "CodLibro", "TituloLibro")
VALUES
(1, 1, 'L001', 'El Aleph'),
(2, 2, 'L002', 'Cien años de soledad');
