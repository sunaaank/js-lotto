import { $ } from "../utils/dom.js";

export function MyTicketsBlock($el, props) {
  const ticketTemplate = numbers => {
    return `<li class = "mx-1 text-4xl lotto-wrapper">
      <span class="mx-1 text-4xl">🎟️</span>
      <span class="lotto-detail" style="display:none">${numbers}</span>
    </li>`;
  };

  const makeTicketNode = () => {
    const tickets = props.myLottos
      .map(lotto => {
        return ticketTemplate(lotto.join(", "));
      })
      .join("");
    console.log("tickets", tickets);

    return tickets;
  };

  const displayTicket = () => {
    const $ul = $({ selector: "ul", parent: $el });
    $ul.innerHTML = makeTicketNode();
  };

  const toggleSwitchHandler = () => {
    const $switch = $({
      selector: ".switch",
    });
    $switch.addEventListener("click", () => {
      const $lottoNumbersToggleButton = $({
        selector: ".lotto-numbers-toggle-button",
      });
      $lottoNumbersToggleButton.checked
        ? isToggleOpen(true)
        : isToggleOpen(false);
    });
  };

  const isToggleOpen = (toggle = false) => {
    const $ul = $({ selector: "ul", parent: $el });
    const $lottoDetail = $el.querySelectorAll(".lotto-detail");
    if (!!toggle) {
      $ul.classList.add("flex-col");
      $lottoDetail.forEach(lotto => {
        lotto.style.display = "inline";
      });
    } else {
      $ul.classList.remove("flex-col");
      $lottoDetail.forEach(lotto => {
        lotto.style.display = "none";
      });
    }
  };

  const render = () => {
    $el.innerHTML = `<div class="d-flex">
    <label class="flex-auto my-0">총 ${props.myLottos.length}개를 구매하였습니다.</label>
    <div class="flex-auto d-flex justify-end pr-1">
      <label class="switch">
        <input type="checkbox" class="lotto-numbers-toggle-button" data-cy="ticket-toggle"/>
        <span class="text-base font-normal">번호보기</span>
      </label>
    </div>
  </div>
  <ul class="d-flex flex-wrap">
    
  </ul>`;
  };

  render();
  displayTicket();
  toggleSwitchHandler();
}
