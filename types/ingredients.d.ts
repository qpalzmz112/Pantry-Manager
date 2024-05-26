interface Categories {
  [name: string]: Ingredient[];
}

interface Ingredient {
  name: string;
  qty: number;
  useByDate: Date | null;
  category: string;
}

export { Ingredient, Categories };
