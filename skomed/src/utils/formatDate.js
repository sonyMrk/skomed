import { format } from "date-fns";

export const defaultFormatDate = (date) => {
  return format(date, "dd.MM.yyyy");
};

export const formatServerDate = (value) => {
  return `${value.substring(6, 8)}.${value.substring(4, 6)}.${value.substring(
    0,
    4
  )} ${value.substring(8, 10) ? value.substring(8, 10) : ""}${
    value.substring(10, 12) ? ":" + value.substring(10, 12) : ""
  }`;
};

