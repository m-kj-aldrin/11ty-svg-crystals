export const irand = ([a, b]) => a + Math.floor(Math.random() * (1 + b - a));
export const frand = ([a, b]) => a + Math.random() * (b - a);
export const angleToV = ([a,m]) => [m * Math.cos(a/180 * Math.PI),m * Math.sin(a/180 * Math.PI)]
