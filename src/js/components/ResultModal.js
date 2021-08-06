import lottoPrices from "../utils/lottoPrice.js";

export function ResultModal($el, props) {
  const onBtnClick = () => {
    $el.addEventListener("click", e => {
      let element = e.target;
      switch (element.dataset.action) {
        case "close-modal":
          return onCloseModalClick();

        case "reset-lotto":
          return onResetClick();
      }
    });
  };

  const onCloseModalClick = () => {
    props.setIsModalOpen(false);
  };

  const onResetClick = () => {
    props.resetState();
  };

  const getLottoResult = (winNumbers, myLottos) => {
    const lottoResult = {
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
      etc: 0,
    };

    const winningNumberSet = new Set(winNumbers.base);

    myLottos.forEach(ticket => {
      const matchCount = ticket.filter(number =>
        winningNumberSet.has(number)
      ).length;

      switch (matchCount) {
        case 3:
          lottoResult.FIFTH += 1;
          return;
        case 4:
          lottoResult.FOURTH += 1;
          return;
        case 5:
          if (ticket.include(winNumbers.bonus)) {
            lottoResult.SECOND += 1;
            return;
          }
          lottoResult.THIRD += 1;
        case 6:
          lottoResult.FIRST += 1;

        default:
          lottoResult.etc += 1;
      }
    });

    return lottoResult;
  };

  const template = value => {
    return `<tr class="text-center">
  <td class="p-3">${value.matchNumberCount}개 ${
      !!value.matchBonus ? "+ 보너스볼" : ""
    }</td>
  <td class="p-3">${Number(value.price).toLocaleString()}</td>
  <td class="p-3">${value.result}개</td>
</tr>
  `;
  };

  const getWinCount = value => {
    const DIC = {
      1: "FIRST",
      2: "SECOND",
      3: "THIRD",
      4: "FOURTH",
      5: "FIFTH",
      0: "etc",
    };
    const lottoResult = getLottoResult(props.winNumbers, props.myLottos);
    return lottoResult[DIC[value.rank]];
  };

  const displayData = () => {
    const data = lottoPrices.map(value => {
      return Object({ ...value, result: getWinCount(value) });
    });
    return data;
  };

  const displayTemplate = () => {
    return displayData()
      .map(value => {
        return template(value);
      })
      .join("");
  };

  const getWinBenefitRate = (amount, lottoResult) => {
    const getPrice = lottoResult
      .filter(value => value.result !== 0)
      .map(value => value.price * value.result)
      .reduce((prev, current) => prev + current, 0);

    return Math.round(((getPrice - amount) / amount) * 100);
  };

  const render = () => {
    const { amount, myLottos, winNumbers } = props;
    onBtnClick();
    const templateData = displayTemplate();
    const lottoResult = displayData();
    const winBenefitRate = getWinBenefitRate(amount, lottoResult);

    $el.innerHTML = `
    <div class="modal open" data-test="result-modal-wrapper">
      <div class="modal-inner p-10">
      <button type="button" class="modal-close" data-test="close-modal" data-action="close-modal" >
        <svg viewbox="0 0 40 40">
          <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
        </svg>
      </button>

      <h2 class="text-center">🏆 당첨 통계 🏆</h2>
      <div class="d-flex justify-center">
        <table class="result-table border-collapse border border-black">
          <thead>
            <tr class="text-center">
              <th class="p-3">일치 갯수</th>
              <th class="p-3">당첨금</th>
              <th class="p-3">당첨 갯수</th>
            </tr>
          </thead>
          <tbody>
            ${templateData}
          </tbody>
        </table>
      </div>
      <p class="text-center font-bold">당신의 총 수익률은 ${winBenefitRate}%입니다.</p>
      <div class="d-flex justify-center mt-5">
        <button type="button" class="btn btn-cyan reset-btn" data-test="reset-lotto" data-action="reset-lotto" >다시 시작하기</button>
      </div>
    </div>
  </div>
  `;
  };

  render();
}
