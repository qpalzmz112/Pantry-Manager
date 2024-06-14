import { Recipes, Recipe } from "@/types/recipe";

export function get_matching_categories(c: string, recipes: Recipes) {
  return Object.keys(recipes).filter((key) => {
    return key.toLocaleLowerCase().includes(c.toLocaleLowerCase()) && key != "";
  });
}

const sortByName = (a: Recipe, b: Recipe) => a.name.localeCompare(b.name);

const filterNoSearch = (recipes: Recipes, collapsedCategories: any) => {
  // get names of nonempty categories: string[]
  let names = Object.keys(recipes).filter((c) => recipes[c].length > 0);

  // for each name, sort alphabetically: [{title: string, data: Recipe[]}]
  let sorted = names.map((name) => {
    if (collapsedCategories[name]) {
      return { title: name, data: [] };
    }
    let data = recipes[name].sort(sortByName);
    return { title: name, data: data };
  });
  return sorted;
};

export function filterBySearch(
  search: string,
  recipes: Recipes,
  collapsedCategories: any
) {
  if (search == "") {
    return filterNoSearch(recipes, collapsedCategories);
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

// {title: string, data: Recipe[]}[]
