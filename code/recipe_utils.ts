import { Recipes } from "@/types/recipe";

export function get_matching_categories(c: string, recipes: Recipes) {
  return Object.keys(recipes).filter((key) => {
    return key.toLocaleLowerCase().includes(c.toLocaleLowerCase()) && key != "";
  });
}

export function recipe_name_exists(r: Recipes) {
  // todo
}

export function can_add_recipe(name: string, category: string) {
  // todo
}

//   const canAddItemCheck = () => {
//     if (nameAlreadyExists(itemName)) {
//       setErrorMessage(t("error_name_exists"));
//       return false;
//     } else if (itemName.length == 0) {
//       setErrorMessage(t("error_empty_name"));
//       return false;
//     } else if (category != "" && !Object.keys(categories).includes(category)) {
//       setErrorMessage(t("error_category"));
//       return false;
//     }
//     return true;
//   };
