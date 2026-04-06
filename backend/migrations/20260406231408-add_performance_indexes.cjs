'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Índice para el filtro de Socios
    await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_partner_id ON "socio" ("id");
    `);

    // 2. Relación Socio -> Préstamo
    await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_loan_numsocio ON "Prestamo" ("NumSocio");
    `);

    // 3. Relación Préstamo -> Libro (Tabla intermedia)
    await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_loanbook_idprestamo ON "PrestamoLibro" ("IdPrestamo");
    `);

    // 4. Índice para el ID de Libros
    await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_book_where ON "Libros" ("id");
    `);
  },

  async down(queryInterface, Sequelize) {
    // Eliminación de índices en reversa
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_partner_id;');
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_loan_numsocio;');
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_loanbook_idprestamo;');
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_book_where;');
  }
};