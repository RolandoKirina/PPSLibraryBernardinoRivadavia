const decodeRTFHex = (text) => {
  return text.replace(/\\'([0-9a-fA-F]{2})/g, (_, hex) =>
    String.fromCharCode(parseInt(hex, 16))
  );
};

const cleanRTF = (rtf) => {
  let text = rtf;

  text = decodeRTFHex(text);

  return text
    .replace(/\\par[d]?/g, '\n')       // saltos de línea
    .replace(/\\[a-z]+\d*/g, '')       // comandos RTF
    .replace(/[{}]/g, '')              // llaves
    .replace(/\n\s*\n/g, '\n')         // líneas vacías duplicadas
    .replace(/[ \t]+/g, ' ')           // espacios dentro de línea
    .trim();
};

export const parseRTFSmart = (rtf) => {
  if (!rtf) return null;

  let text = '';

  try {
    // intento con librería
    text = rtf2text(rtf);
  } catch (e) {
    text = '';
  }

  // detectar si falló
  const failed =
    !text ||
    text.includes('{\\rtf') ||
    text.length < 10;

  if (failed) {
    text = cleanRTF(rtf);
  } else {
    // limpieza suave
    text = decodeRTFHex(text)
      .replace(/\\par/g, '\n')
      .replace(/\n\s*\n/g, '\n')
      .replace(/[ \t]+/g, ' ')
      .trim();
  }

  // 🔥 normalización final (para búsqueda)
  return text.toLowerCase();
};