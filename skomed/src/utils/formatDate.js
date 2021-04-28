import { format } from "date-fns";

export const defaultFormatDate = (date) => {
  return format(date, "dd.MM.yyyy");
};
