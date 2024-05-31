import { Categories, Ingredient } from "@/types/ingredients";

const sortByName = (a: Ingredient, b: Ingredient) =>
  a.name.localeCompare(b.name);

const sortByDate = (a: Ingredient, b: Ingredient) => {
  if (a.useByDate! < b.useByDate!) {
    return -1;
  } else if (a.useByDate! > b.useByDate!) {
    return 1;
  }
  return 0;
};

const filterNoSearch = (categories: Categories, collapsedCategories: any) => {
  // get names of nonempty categories: string[]
  let names = Object.keys(categories).filter((c) => categories[c].length > 0);

  // for each name, split ingredients into dated and undated and sort accordingly: [{title: string, data: Ingredient[]}]
  let sorted = names.map((name) => {
    if (collapsedCategories[name]) {
      return { title: name, data: [] };
    }
    // split
    let withDate = categories[name].filter((i) => i.useByDate != null);
    let withoutDate = categories[name].filter((i) => i.useByDate == null);
    // sort
    withDate.sort(sortByDate);
    withoutDate.sort(sortByName);
    // combine
    let data = withDate.concat(withoutDate);
    return { title: name, data: data };
  });
  return sorted;
};

export const filterBySearch = (
  search: string,
  categories: Categories,
  collapsedCategories: any
) => {
  if (search == "") {
    return filterNoSearch(categories, collapsedCategories);
  }
  let filteredCategories = Object.keys(categories).map((category) => {
    let ingredients = categories[category].filter(({ name }) =>
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
};
