import { Recipes } from "@/types/recipe";

export function get_matching_categories(c: string, recipes: Recipes) {
  return Object.keys(recipes).filter((key) => {
    return key.toLocaleLowerCase().includes(c.toLocaleLowerCase()) && key != "";
  });
}
