'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Índices básicos de tablas (Claves primarias y foráneas)
    await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_partner_id ON "socio" ("id");
    `);

    await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_loan_numsocio ON "Prestamo" ("NumSocio");
    `);

    await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_loanbook_idprestamo ON "PrestamoLibro" ("IdPrestamo");
    `);

    await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_book_where ON "Libros" ("id");
    `);

    // 2. ÍNDICES OPTIMIZADOS (Filtros específicos)
    
    // Índice para Cuotas Impagas: Filtra directo por IdSocio solo donde Paga es false
    await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_cuotas_socio_paga 
      ON "Cuotas" ("IdSocio") 
      WHERE "Paga" = false;
    `);

    // Índice para Libros Pendientes: Filtra IdPrestamo solo donde no hay fecha de devolución
    await queryInterface.sequelize.query(`
      CREATE INDEX IF NOT EXISTS idx_prestamos_socio_pendiente 
      ON "PrestamoLibro" ("IdPrestamo") 
      WHERE "FechaDevolucion" IS NULL;
    `);
  },

  async down(queryInterface, Sequelize) {
    // Eliminación de índices
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_partner_id;');
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_loan_numsocio;');
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_loanbook_idprestamo;');
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_book_where;');
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_cuotas_socio_paga;');
    await queryInterface.sequelize.query('DROP INDEX IF EXISTS idx_prestamos_socio_pendiente;');
  }
};