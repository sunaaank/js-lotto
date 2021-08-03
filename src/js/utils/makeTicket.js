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
  console.log("make tickets", tickets);
  return tickets;
};

export const getLottoNumber = () => {
  const lottoNumbers = new Set();
  while (lottoNumbers.size < LOTTO_NUMBER_COUNT_PER_TICKET) {
    lottoNumbers.add(getRandomNumber());
  }
  console.log("make numbers", lottoNumbers);
  return Array.from(lottoNumbers);
};

export const getRandomNumber = () => {
  return Math.floor(
    Math.random() * (MAX_LOTTO_NUMBER - MIN_LOTTO_NUMBER + 1) + MIN_LOTTO_NUMBER
  );
};
