import { $ } from "../utils/dom.js";
import { LOTTO_PRICE_PER_UNIT, ALERT_MESSAGES } from "../utils/constants.js";

export function LottoFormBlock($el, props) {
  $el.addEventListener("submit", e => {
    e.preventDefault();
    onPriceSubmit(Number(new FormData(e.target).get("purchase-price")));
  });

  const onPriceSubmit = price => {
    if (price % LOTTO_PRICE_PER_UNIT !== 0) {
      alert(ALERT_MESSAGES.PRICE_UNIT);
      return;
    }
    props.setAmount(price);
  };

  const render = () => {
    $el.innerHTML = `
      <form class="mt-5">
        <label class="mb-2 d-inline-block">구입할 금액을 입력해주세요.</label>
        <div class="d-flex">
          <input
            type="number"
            class="w-100 mr-2 pl-2"
            name="purchase-price"
            min="1000"
            placeholder="구입 금액"
            ${props.amount && `value = ${props.amount}`}
            data-test="price-input"
            ${props.amount && `disabled=true`} 
          />
          <button
            type="submit"
            class="btn btn-cyan"
            data-test="submit-price"
            ${props.amount && `disabled=true`} 
          >
            확인
          </button>
        </div>
      </form>
    `;
  };

  render();
}
