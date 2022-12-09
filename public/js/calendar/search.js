document.addEventListener("DOMContentLoaded", () => {
  const btnSearchDetail = document.querySelector("button.btn_search_detail");
  const btnSearchSchedule = document.querySelector("#btn_search_schedule");

  // search detail button 클릭하면 dropdown 표시, arrow 토글
  btnSearchDetail?.addEventListener("click", () => {
    document
      .querySelector(".search_detail_dropdown_box")
      .classList.toggle("visible");
    document
      .querySelector(".btn_search_detail_arrow")
      .classList.toggle("active");
  });

  // 상세검색 유효성 검사: input 에 값이 전부 없거나 날짜가 하나만 입력되었을 경우
  // type 이 checkbox 일 경우 value 가 이미 있으므로 checked 로 검사
  const chkValue = () => {
    // nodelist 를 array 로 변환해야 한다
    const inputs = Array.from(
      document.querySelectorAll("form.search_detail_dropdown input")
    );
    const inputStart = document.querySelector("input[id='input_search_start']");
    const inputEnd = document.querySelector("input[id='input_search_end']");

    const result = [];
    inputs.map((input) => {
      if (input.type === "date" || input.type === "text") {
        result.push(input.value);
      }
      if (input.type === "checkbox") {
        result.push(input.checked);
      }
    });
    const chkResult = result.every((ele) => ele == false);
    /**
     * cf)
     * result 배열의 요소는...
     * input type 이 date 나 text 일 경우: 입력한 데이터 또는 ""
     * input type 이 checkbox 일 경우: true 또는 false
     * 따라서 거짓 값을 활용하여
     * 모든 값이 false 일 때 true 가 나오게 하였다.
     * !! 일치연산(===) 사용 시 원하는 결과가 나오지 않는다.
     */

    if (chkResult) {
      alert("검색할 내용을 입력하세요.");
      return false;
    }
    console.log(inputStart.value);
    if (inputStart.value && !inputEnd.value) {
      alert("기간 범위가 잘못되었습니다.\n종료 일자를 입력하세요.");
      inputEnd.focus();
      return false;
    }
    if (!inputStart.value && inputEnd.value) {
      alert("기간 범위가 잘못되었습니다.\n시작 일자를 입력하세요.");
      inputStart.focus();
      return false;
    } else {
      return true;
    }
  };

  btnSearchSchedule?.addEventListener("click", () => {
    if (chkValue()) {
      document.querySelector("form.search_detail_dropdown").submit();
    }
  });
});
