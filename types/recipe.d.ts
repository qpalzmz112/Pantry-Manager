export interface RecipeIngredient {
  name: string;
  desc: string;
}

export interface Recipe {
  name: string;
  category: string;
  ingredients: RecipeIngredient[]; // names of ingredients or ingredient categories
  steps: string;
}

export interface Recipes {
  [category: string]: Recipe[];
}
