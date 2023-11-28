export const pascalToSnakeCase = (str: string) =>
  str
    .replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    .replace(/^_/, '')
    .replace(/ /g, '_')
