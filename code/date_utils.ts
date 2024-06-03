import i18next from "i18next";

const string_to_date = (d: string) => {
  let month, day, year;
  if (i18next.t("date_placeholder") == "MM-DD-YY") {
    [month, day, year] = d.split("-");
  } else {
    [day, month, year] = d.split("-");
  }

  let newDate =
    d == ""
      ? null
      : { day: parseInt(day), month: parseInt(month), year: parseInt(year) };
  return newDate;
};

const date_to_display_string = (date: any) => {
  if (date == null) {
    return "";
  }
  return i18next.t("intlDateTime", {
    val: new Date(2000 + date.year, date.month - 1, date.day),
    formatParams: {
      val: { day: "numeric", month: "short", year: "numeric" },
    },
  });
};

const add_leading_zero = (n: number) => {
  if (n < 10) {
    return `0${n}`;
  }
  return `${n}`;
};

const date_to_input_text = (date: any) => {
  if (date == null) {
    return "";
  }
  if (i18next.t("date_placeholder") == "MM-DD-YY") {
    return `${add_leading_zero(date.month)}-${add_leading_zero(
      date.day
    )}-${add_leading_zero(date.year)}`;
  } else {
    return `${add_leading_zero(date.day)}-${add_leading_zero(
      date.month
    )}-${add_leading_zero(date.year)}`;
  }
};

const date_to_Date = (date: any) => {
  return new Date(date.year + 2000, date.month - 1, date.day).valueOf();
};

export {
  string_to_date,
  date_to_display_string,
  date_to_input_text,
  date_to_Date,
};
