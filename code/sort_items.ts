import { Item } from "@/types/shopping_list";

const sortItemsByPurchased = (item1: Item, item2: Item) => {
  if (item1.isPurchased == item2.isPurchased) {
    return 0;
  } else if (item2.isPurchased) {
    return -1;
  } else {
    return 1;
  }
};

const sortByName = (a: Item, b: Item) => a.name.localeCompare(b.name);

const sortByCategory = (a: Item, b: Item) =>
  a.category.localeCompare(b.category);

const sortItems = (items: Item[]) => {
  // split items by category
  let categorized = items.filter((i) => i.category != "" && !i.isPurchased);
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

  let uncategorized = items
    .filter((i) => i.category == "" && !i.isPurchased)
    .sort(sortByName);
  let purchased = items.filter((i) => i.isPurchased).sort(sortByName);

  return sorted.concat(uncategorized).concat(purchased);
};

export { sortItems };
