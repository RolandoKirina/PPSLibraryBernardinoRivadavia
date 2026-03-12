export const formatDate = (date) => {
  if (!date) return 'No hay fecha';

  const [year, month, day] = date.split('-');

  return `${day}-${month}-${year.slice(-2)}`;
};



export const toStartOfDay = (str) => {
  const d = new Date(`${str}T00:00:00`);
  return d;
};

export const toEndOfDay = (str) => {
  const d = new Date(`${str}T23:59:59.999`);
  return d;
};

