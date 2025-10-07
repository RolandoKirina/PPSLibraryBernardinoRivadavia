export const getQuantityBooksAndPartners = async () => {
  const [results] = await sequelize.query(`
    SELECT 
      (SELECT COUNT(*) FROM Books) AS quantitybooks,
      (SELECT COUNT(*) FROM Partners) AS quantitypartners
  `);

  return results[0];
};