import { $ } from "./utils/dom.js";
import { LottoFormBlock } from "./components/LottoForm.js";
import { getTickets } from "./utils/makeTicket.js";
import { WinNumbersBlock } from "./components/WinNumbers.js";
import { MyTicketsBlock } from "./components/MyTickets.js";
import { LOTTO_PRICE_PER_UNIT } from "./utils/constants.js";
import { ResultModal } from "./components/resultModal.js";

export function LottoApp($el) {
  let state = {
    amount: null,
    myLottos: [[]],
    winNumbers: {
      base: [null, null, null, null, null, null],
      bonus: null,
    },
    isModalOpen: false,
  };

  const setState = nextState => {
    state = {
      ...state,
      ...nextState,
    };

    render();
  };

  const setAmount = amount => {
    const myLottos = getTickets(amount / LOTTO_PRICE_PER_UNIT);
    setState({ amount, myLottos });
  };

  const setWinNumbers = ({ base, bonus }) => {
    const winNumbers = {
      base,
      bonus,
    };
    setState({ winNumbers, isModalOpen: true });
    console.log("win", winNumbers);
  };

  const setModalClose = () => {
    setState({ isModalOpen: false });
  };

  const render = () => {
    const { amount, myLottos, winNumbers, isModalOpen } = state;

    $el.innerHTML = `
    <div class="d-flex justify-center mt-5">
        <div class="w-100">
          <h1 class="text-center">🎱 행운의 로또</h1>
          <section data-component="purchase-form"></section>
          <section data-component="my-tickets" class="mt-9"></section>
          <section data-component="win-numbers"></section>
        </div>
      </div>
      <div data-component="result-modal" class="modal"></div>`;

    new LottoFormBlock(
      $({ selector: '[data-component = "purchase-form"]', parent: $el }),
      { amount, setAmount }
    );

    amount &&
      new MyTicketsBlock(
        $({ selector: '[data-component = "my-tickets"]', parent: $el }),
        { amount, myLottos }
      );

    amount &&
      new WinNumbersBlock(
        $({ selector: '[data-component = "win-numbers"]', parent: $el }),
        { winNumbers, setWinNumbers }
      );

    isModalOpen &&
      new ResultModal(
        $({ selector: '[data-component = "result-modal"]', parent: $el }),
        { amount, myLottos, winNumbers, setModalClose }
      );
  };

  render();
}
