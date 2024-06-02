import { Item } from "@/types/shopping_list";

const sortByName = (a: Item, b: Item) => a.name.localeCompare(b.name);

const sortByCategory = (a: Item, b: Item) =>
  a.category.localeCompare(b.category);

const sortItems = (items: Item[]) => {
  // split items by category
  let categorized = items.filter((i) => i.category != "");
  let categories: { [category: string]: Item[] } = {};
  categorized.map((i) => {
    if (i.category in categories) {
      categories[i.category].push(i);
    } else {
      categories[i.category] = [i];
    }
  });
  // sort each set of items alphabetically
  Object.keys(categories).map((c) => {
    categories[c].sort(sortByName);
  });
  // combine back into one array, in order of category name in alphabetical order
  const template: Item[] = [];
  const sorted = template.concat.apply(
    [],
    Object.keys(categories)
      .sort()
      .map((c) => categories[c])
  );

  let uncategorized = items.filter((i) => i.category == "").sort(sortByName);

  return sorted.concat(uncategorized);
};

export { sortItems, sortByName };
