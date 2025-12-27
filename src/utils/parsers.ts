export function parseYears(text: string): string {
  return text.replace('{years}', `${new Date().getFullYear() - 2022}`)
}