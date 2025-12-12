export const formatDate = (date) => {
  if (!date) return 'No hay fecha';
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = String(d.getFullYear()).slice(-2); // últimos dos dígitos
  return `${day}-${month}-${year}`;
};
