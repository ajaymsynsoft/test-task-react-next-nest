export const isObject = (variable: unknown): boolean => {
  return variable !== null && typeof variable === 'object' && !Array.isArray(variable)
}
