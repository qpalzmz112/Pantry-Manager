interface date {
  day: number;
  month: number;
  year: number;
}

interface Item {
  name: string;
  category: string;
  date: date | null;
  qty: number;
  isGrocery: boolean;
  isRecurring: boolean;
  isPurchased: boolean;
}

export { Item, date };
