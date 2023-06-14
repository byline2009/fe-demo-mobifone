export function getPageNumber(total: number, limit: number) {
  return Math.ceil(total / limit);
}
