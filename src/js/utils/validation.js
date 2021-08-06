import { LOTTO_NUMBER_COUNT_PER_TICKET } from "./constants.js";

export const isUniqueWinNumber = (numbers, bonus) => {
  const winNumbers = new Set(numbers);
  winNumbers.add(bonus);
  return winNumbers.size === LOTTO_NUMBER_COUNT_PER_TICKET + 1;
};
