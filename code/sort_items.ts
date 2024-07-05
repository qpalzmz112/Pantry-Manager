import { Item } from "@/types/shopping_list";

const sortByName = (a: Item, b: Item) => a.name.localeCompare(b.name);

const sortByCategory = (a: Item, b: Item) =>
  a.category.localeCompare(b.category);

const sortItemSet = (items: Item[]) => {
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

const sortItemsByPurchased = (items: Item[]) => {
  let unpurchased = items.filter((i) => !i.isPurchased);
  let purchased = items.filter((i) => i.isPurchased);
  return sortItemSet(unpurchased).concat(sortItemSet(purchased));
};

const sortItems = (items: Item[], sortByPurchased: boolean) => {
  if (sortByPurchased) {
    return sortItemsByPurchased(items);
  } else {
    return sortItemSet(items);
  }
};

export { sortItems, sortByName };
