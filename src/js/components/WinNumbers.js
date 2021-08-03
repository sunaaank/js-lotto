import { $, $$ } from "../utils/dom.js";
import {
  MAX_LOTTO_NUMBER,
  MIN_LOTTO_NUMBER,
  ALERT_MESSAGES,
} from "../utils/constants.js";
import { isUniqueWinNumber } from "../utils/validation.js";

export function WinNumbersBlock($el, props) {
  $el.addEventListener("submit", e => {
    const $winNumbers = $$(".winning-number");
    const bonusNumber = $({ selector: ".bonus-number" }).value;
    const winNumbersArr = [...$winNumbers].map(number => {
      return number.value;
    });

    e.preventDefault();

    if (!isUniqueWinNumber(winNumbersArr, bonusNumber)) {
      alert(ALERT_MESSAGES.UNIQUE_WIN_NUMBER);
      return;
    }
    updateWinNumbers(winNumbersArr, bonusNumber);
  });

  const updateWinNumbers = (winNumbersArr, bonusNumber) => {
    props.setWinNumbers({ base: winNumbersArr, bonus: bonusNumber });
  };

  const winNumInputTemplate = `<input type="number" class="winning-number mx-1 text-center" min = ${MIN_LOTTO_NUMBER} max= ${MAX_LOTTO_NUMBER} required />`;

  const render = () => {
    $el.innerHTML = `<form class="mt-9">
    <label class="flex-auto d-inline-block mb-3">
      지난 주 당첨번호 6개와 보너스 넘버 1개를 입력해주세요.
    </label>
    <div class="d-flex">
      <div>
        <h4 class="mt-0 mb-3 text-center">당첨 번호</h4>
        <div>
        ${winNumInputTemplate.repeat(6)}
        </div>
      </div>
      <div class="bonus-number-container flex-grow">
        <h4 class="mt-0 mb-3 text-center">보너스 번호</h4>
        <div class="d-flex justify-center">
          <input type="number" class="bonus-number text-center" min = ${MIN_LOTTO_NUMBER} max= ${MAX_LOTTO_NUMBER} required />
        </div>
      </div>
    </div>
    <button
      type="submit"
      class="open-result-modal-button mt-5 btn btn-cyan w-100"
    >
      결과 확인하기
    </button>
  </form>
  `;
  };

  render();
}
