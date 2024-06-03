import i18next from "i18next";
import { date } from "@/types/shopping_list";

const date_to_display_string = (date: date | null) => {
  if (date == null) {
    return "";
  }
  return i18next.t("intlDateTime", {
    val: new Date(date.year, date.month - 1, date.day),
    formatParams: {
      val: { day: "numeric", month: "short", year: "numeric" },
    },
  });
};

const date_to_Date = (date: any) => {
  if (date == null) {
    return new Date();
  }
  return new Date(date.year, date.month - 1, date.day);
};

const Date_to_date = (date: Date) => {
  return {
    day: date.getDate(),
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
};

export { date_to_display_string, date_to_Date, Date_to_date };
