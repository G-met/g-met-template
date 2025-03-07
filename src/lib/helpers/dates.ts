import { addDays, addMonths, isAfter, isBefore } from "date-fns";

const today = new Date();
const oneMonthAgo = addMonths(today, -1);
const fifteenDaysAhead = addDays(today, 15);

export const disabledDays = (date: Date) => {
  return isBefore(date, oneMonthAgo) || isAfter(date, fifteenDaysAhead);
};
