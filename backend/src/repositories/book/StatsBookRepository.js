import sequelize  from "../../configs/database.js";

export const getQuantityBooksAndPartners = async () => {
  const [results] = await sequelize.query(`
    SELECT 
      (SELECT COUNT(*) FROM "Libros") AS quantitybooks,
      (SELECT COUNT(*) FROM "socio") AS quantitypartners
  `);

  return results[0];
};