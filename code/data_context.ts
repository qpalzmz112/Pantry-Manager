import { createContext } from "react";
import { Item } from "@/types/shopping_list";
import { Categories } from "@/types/ingredients";
import { Recipes } from "@/types/recipe";

export const ItemContext = createContext<{
  data: Item[];
  update: (i: any) => void; // i can be Item or prevstate updater function
}>({ data: [], update: () => {} });

export const CategoryContext = createContext<{
  data: Categories;
  update: (c: Categories) => void;
}>({ data: { "": [] }, update: () => {} });

export const RecipeContext = createContext<{
  data: Recipes;
  update: (r: Recipes) => void;
}>({ data: {}, update: () => {} });
