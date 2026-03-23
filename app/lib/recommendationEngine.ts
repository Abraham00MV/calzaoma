import { Product } from "../data/products";

export const getRecommendedProducts = (
  products: Product[],
  foot: number,
  use: string,
  comfort: string
) => {
  return products
    .map((p) => {
      let score = 0;

      // match uso
      if (p.useType === use) score += 2;

      // match comodidad
      if (comfort === "alta" && p.comfortScore >= 8) score += 2;
      if (comfort === "media" && p.comfortScore >= 6) score += 1;

      // match talla
      if (foot >= p.minSize && foot <= p.maxSize) score += 3;

      return { ...p, score };
    })
    .filter((p) => p.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
};
