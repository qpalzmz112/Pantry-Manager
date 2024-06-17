import { Recipes, Recipe, RecipeIngredient } from "@/types/recipe";
import { Categories } from "@/types/ingredients";
import { Item } from "@/types/shopping_list";

export function get_matching_categories(c: string, recipes: Recipes) {
  return Object.keys(recipes).filter((key) => {
    return key.toLocaleLowerCase().includes(c.toLocaleLowerCase()) && key != "";
  });
}

const sortByName = (a: Recipe, b: Recipe) => a.name.localeCompare(b.name);

const filterNoSearch = (
  recipes: Recipes,
  collapsedCategories: any,
  recipesToMissingIngredients?: { [name: string]: number }
) => {
  const sortByIngredients = (a: Recipe, b: Recipe) => {
    if (
      recipesToMissingIngredients![a.name] <
      recipesToMissingIngredients![b.name]
    ) {
      return -1;
    } else if (
      recipesToMissingIngredients![b.name] <
      recipesToMissingIngredients![a.name]
    ) {
      return 1;
    }
    return 0;
  };

  // get names of nonempty categories: string[]
  let names = Object.keys(recipes).filter((c) => recipes[c].length > 0);

  // for each name, sort alphabetically: [{title: string, data: Recipe[]}]
  let sorted = names.map((name) => {
    if (collapsedCategories[name]) {
      return { title: name, data: [] };
    }
    let data = recipes[name].sort(
      recipesToMissingIngredients ? sortByIngredients : sortByName
    );
    return { title: name, data: data };
  });
  return sorted;
};

// {title: string, data: Recipe[]}[]
export function filterBySearch(
  search: string,
  recipes: Recipes,
  collapsedCategories: any,
  recipesToMissingIngredients?: { [name: string]: number }
) {
  if (search == "") {
    return filterNoSearch(
      recipes,
      collapsedCategories,
      recipesToMissingIngredients ? recipesToMissingIngredients : undefined
    );
  }

  let filteredCategories = Object.keys(recipes).map((category) => {
    let ingredients = recipes[category].filter(({ name }) =>
      name.toLowerCase().includes(search.toLowerCase())
    );
    return {
      title: category,
      data: collapsedCategories[category] ? [] : ingredients,
    };
  });
  return filteredCategories.filter(
    ({ title, data }) => collapsedCategories[title] || data.length > 0
  );
}

export function hasIngredient(ingredients: Categories, name: string) {
  let res = false;
  Object.keys(ingredients).map((category) => {
    if (
      ingredients[category]
        .map((ingredient) => ingredient.name.toLocaleLowerCase())
        .includes(name.toLocaleLowerCase())
    ) {
      res = true;
    }
  });
  return res;
}

export function ingredientsInShoppingList(
  items: Item[],
  ingredients: RecipeIngredient[]
) {
  return ingredients.filter((i) =>
    items.map((item) => item.name).includes(i.name)
  );
}

export function missingIngredients(
  listIngredients: Categories,
  recipeIngredients: RecipeIngredient[],
  inShoppingList: RecipeIngredient[]
) {
  return recipeIngredients
    .filter((i) => !hasIngredient(listIngredients, i.name))
    .filter((i) => !inShoppingList.map((ing) => ing.name).includes(i.name));
}

export function countMissingIngredients(
  listIngredients: Categories,
  recipe: Recipe
) {
  return missingIngredients(listIngredients, recipe.ingredients, []).length;
}

export function makeMissingIngredientDict(
  listIngredients: Categories,
  recipes: Recipes
) {
  let res: { [name: string]: number } = {};
  Object.keys(recipes).map((category) => {
    recipes[category].map(
      (r) => (res[r.name] = countMissingIngredients(listIngredients, r))
    );
  });
  return res;
}
