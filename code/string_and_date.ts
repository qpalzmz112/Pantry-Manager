export default function string_to_date(d: string) {
  let month, day, year;
  [month, day, year] = d.split("-");
  let newDate =
    d == ""
      ? null
      : new Date(2000 + parseInt(year), parseInt(month) - 1, parseInt(day));
  return newDate;
}

// date to string, 01 -> 1 problem
function date_to_string(date: any) {
  let res;
  if (date == null) {
    res = "";
  }
  if (typeof date == "string") {
    return `${date.slice(5, 7)}-${date.slice(8, 10)}-${date.slice(0, 4)}`;
  } else {
    let month = date.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
      day = `0${day}`;
    }
    return `${month}-${day}-${date.getFullYear()}`;
  }
}

export { date_to_string };
