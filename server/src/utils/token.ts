/**
 * Generates the validation token required by Twitter's syndication endpoint.
 * This is based on the logic reverse-engineered from Twitter embeds.
 * 
 * @param id The Tweet ID string
 * @returns The calculated token string
 */
export function getToken(id: string): string {
  // Convert ID string to Number (this mimics double-precision float precision loss
  // that happens in Javascript on the client side, which Twitter's endpoint expects)
  const numId = Number(id);
  
  return ((numId / 1e15) * Math.PI)
    .toString(36)
    .replace(/(0+|\.)/g, '');
}
