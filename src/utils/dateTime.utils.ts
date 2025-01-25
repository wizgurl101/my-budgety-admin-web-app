function getDateStr(dateNumber: number): string {
  let str = dateNumber.toString();
  if (dateNumber < 10) {
    str = `0${str}`;
  }
  return str;
}

export const getMonthFirstDay = (date: Date): string => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);

  const firstDayMonth = firstDay.getMonth() + 1;
  const firstDayMonthStr = getDateStr(firstDayMonth);

  const firstDayDate = firstDay.getDate();
  const firstDayDateStr = getDateStr(firstDayDate);

  return `${firstDay.getFullYear()}-${firstDayMonthStr}-${firstDayDateStr}`;
};

export const getMonthLastDay = (date: Date): string => {
  const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);

  const lastDayMonth = lastDay.getMonth() + 1;
  const lastDayMonthStr = getDateStr(lastDayMonth);

  const lastDayDate = lastDay.getDate();
  const lastDayDateStr = getDateStr(lastDayDate);

  return `${lastDay.getFullYear()}-${lastDayMonthStr}-${lastDayDateStr}`;
};
