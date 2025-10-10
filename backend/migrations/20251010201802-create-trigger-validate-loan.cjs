'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
    await queryInterface.sequelize.query(`
  CREATE OR REPLACE FUNCTION validate_unique_loan() RETURNS TRIGGER AS $$
  BEGIN
    IF EXISTS (
      SELECT 1 FROM "PrestamoLibro"
      WHERE "BookId" = NEW."BookId" AND "IdPrestamo" = NEW."IdPrestamo"
    ) THEN
      RAISE EXCEPTION 'Ya existe un préstamo con esa combinación';
    END IF;
    RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER trigger_validate_unique_loan
  BEFORE INSERT ON "PrestamoLibro"
  FOR EACH ROW
  EXECUTE FUNCTION validate_unique_loan();
`);

  },

  async down (queryInterface) {
   await queryInterface.sequelize.query(`
  DROP TRIGGER IF EXISTS trigger_validate_unique_loan ON "PrestamoLibro";
  DROP FUNCTION IF EXISTS validate_unique_loan();
`);
  }
};
