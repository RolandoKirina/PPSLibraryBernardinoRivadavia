'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
      CREATE OR REPLACE FUNCTION validate_unique_book_type_group() RETURNS TRIGGER AS $$
      BEGIN
        IF EXISTS (
          SELECT 1 FROM "TipoLibroGrupo"
          WHERE "IdGrupo" = NEW."IdGrupo" AND "IdTipoLibro" = NEW."IdTipoLibro"
        ) THEN
          RAISE EXCEPTION 'Ya existe un TipoLibroGrupo con esa combinación';
        END IF;
        RETURN NEW;
      END;
      $$ LANGUAGE plpgsql;

      CREATE TRIGGER trigger_validate_unique_book_type_group
      BEFORE INSERT ON "TipoLibroGrupo"
      FOR EACH ROW
      EXECUTE FUNCTION validate_unique_book_type_group();
    `);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
      DROP TRIGGER IF EXISTS trigger_validate_unique_book_type_group ON "TipoLibroGrupo";
      DROP FUNCTION IF EXISTS validate_unique_book_type_group();
    `);
  }
};
