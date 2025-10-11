'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.sequelize.query(`
  CREATE OR REPLACE FUNCTION validate_unique_book_author() RETURNS TRIGGER AS $$
  BEGIN
    IF EXISTS (
      SELECT 1 FROM "AutorLibro"
      WHERE "BookId" = NEW."BookId" AND "CodAutor" = NEW."CodAutor"
    ) THEN
      RAISE EXCEPTION 'Ya existe un autor con esa combinación';
    END IF;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER trigger_validate_unique_book_author
  BEFORE INSERT ON "AutorLibro"
  FOR EACH ROW
  EXECUTE FUNCTION validate_unique_book_author();
`);
  },

  async down(queryInterface) {
    await queryInterface.sequelize.query(`
  DROP TRIGGER IF EXISTS trigger_validate_unique_book_author ON "AutorLibro";
  DROP FUNCTION IF EXISTS validate_unique_book_author();
`);
  }
};
