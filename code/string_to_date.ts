export default function string_to_date(d: string) {
  let month, day, year;
  [month, day, year] = d.split("-");
  let newDate =
    d == "" || d == "MM-DD-YY"
      ? null
      : new Date(
          (d.length == 8 ? 2000 : 0) + parseInt(year),
          parseInt(month) - 1,
          parseInt(day)
        );
  return newDate;
}
