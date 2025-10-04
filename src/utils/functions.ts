export const insert = (table: string) => {};

export const replacePlaceholders = (query: string) => {
  let index = 0;
  let insideQuotes = false;

  return query.replace(/(\?|['"])/g, (match) => {
    if (match === `'` || match === `"`) {
      insideQuotes = !insideQuotes; // Alterna se está dentro de aspas
      return match; // Retorna o caractere de aspas sem modificação
    }

    if (!insideQuotes && match === `?`) {
      return `$${++index}`; // Substitui apenas os placeholders fora de aspas
    }

    return match; // Retorna o `?` como está, se estiver entre aspas
  });
};
