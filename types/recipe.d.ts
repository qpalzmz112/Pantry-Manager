export interface Recipe {
  name: string;
  category: string;
  ingredients: string[]; // names of ingredients or ingredient categories
  steps: string;
}

export interface Recipes {
  [category: string]: Recipe[];
}
