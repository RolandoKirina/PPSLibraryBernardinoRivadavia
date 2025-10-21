'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // Crea índice único parcial solo para libros perdidos
    await queryInterface.sequelize.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS unique_lost_book_partner
      ON "Libros" ("id", "NumSocioPerdida")
      WHERE "Perdido" = true;
    `);
  },

  async down(queryInterface, Sequelize) {
    // Elimina el índice si revertimos la migración
    await queryInterface.sequelize.query(`
      DROP INDEX IF EXISTS unique_lost_book_partner;
    `);
  }
};