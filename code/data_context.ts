import { createContext } from "react";
import { Item } from "@/types/shopping_list";
import { Categories } from "@/types/ingredients";

export const ItemContext = createContext<{
  data: Item[];
  update: (i: Item[]) => void;
}>({ data: [], update: () => {} });

export const CategoryContext = createContext<{
  data: Categories;
  update: (c: Categories) => void;
}>({ data: {}, update: () => {} });
