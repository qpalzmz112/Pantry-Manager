import { date } from "./shopping_list";

interface Categories {
  [name: string]: Ingredient[];
}

interface Ingredient {
  name: string;
  desc: string;
  useByDate: date | null;
  category: string;
}

export { Ingredient, Categories };
