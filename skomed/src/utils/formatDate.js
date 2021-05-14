import { format, compareAsc, formatDistanceToNow  } from "date-fns";
import ru from "date-fns/locale/ru"

export const defaultFormatDate = (date) => {
  return format(date, "dd.MM.yyyy");
};

export const formatDateWithHourse = (date) => {
  return format(date, "dd.MM.yyyy HH:mm");
};

export const compareAscDate = (date1, date2) => {
  return compareAsc(date1, date2);
};

export const formatDataDistance = (data) => {
  return formatDistanceToNow (data, { locale: ru })
}


export const formatDateForHistory = (date, time) => {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
  return new Date(`${year}-${month}-${day}T${time}:00+06:00`)
};

export const formatServerDate = (value) => {
  return `${value.substring(6, 8)}.${value.substring(4, 6)}.${value.substring(
    0,
    4
  )} ${value.substring(8, 10) ? value.substring(8, 10) : ""}${
    value.substring(10, 12) ? ":" + value.substring(10, 12) : ""
  }`;
};
