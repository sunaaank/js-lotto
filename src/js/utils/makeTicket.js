import {
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
  LOTTO_NUMBER_COUNT_PER_TICKET,
} from "./constants.js";

export const getTickets = ticket => {
  const tickets = [];
  for (let i = 0; i < ticket; i++) {
    tickets.push(getLottoNumber());
  }
  return tickets;
};

export const getLottoNumber = () => {
  const lottoNumbers = new Set();
  while (lottoNumbers.size < LOTTO_NUMBER_COUNT_PER_TICKET) {
    lottoNumbers.add(getRandomNumber());
  }
  return sortWinNumbersBase(Array.from(lottoNumbers));
};

const sortWinNumbersBase = arr => {
  const sortArr = arr.sort(function (a, b) {
    return a - b;
  });
  return sortArr;
};

export const getRandomNumber = () => {
  return Math.floor(
    Math.random() * (MAX_LOTTO_NUMBER - MIN_LOTTO_NUMBER + 1) + MIN_LOTTO_NUMBER
  );
};
