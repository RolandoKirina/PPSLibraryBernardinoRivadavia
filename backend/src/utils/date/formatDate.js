export const formatDate = (date) => {
  if (!date) return 'No hay fecha';

  const [year, month, day] = date.split('-');

  return `${day}-${month}-${year.slice(-2)}`;
};
