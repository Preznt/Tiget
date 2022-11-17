document.addEventListener("DOMContentLoaded", () => {
  const yearName = document.querySelector("h2.year");
  const monthName = document.querySelector("h1.month");
  const trs = document.querySelectorAll("table.schedule tbody tr");
  const btnPrev = document.querySelector("button.prev");
  const btnNext = document.querySelector("button.next");
  const btnToday = document.querySelector("button.today");

  const time = new Date();
  let year = time.getFullYear();
  // 0(1월)부터 시작하므로 + 1
  let month = time.getMonth() + 1;
  const day = time.getDay();

  const showNum = () => {
    monthName.textContent = `${month}월`;
    yearName.textContent = `${year}년`;
  };

  const showDate = () => {
    // 이번 달 마지막 날짜 = 총 날짜 개수
    const lastdate = new Date(year, month, 0).getDate();
    // 이번 달 첫 요일은 이번 달 첫 주에서 저번 달 마지막 요일(prevmonthdate)을 뺀 것
    // 저번 달 마지막 요일 index. 0(일요일)부터 시작하므로 요일 개수를 구하기 위해 + 1
    const prevmonthdate = new Date(year, month - 1, 0).getDay() + 1;

    // 모든 td 안의 날짜 div(tdtxt) 제거
    const tdAll = document.querySelectorAll("td");
    for (let td of tdAll) {
      const tdtxt = document.querySelector(".date_txt");
      if (Array.from(td.children).includes(tdtxt)) {
        td.removeChild(tdtxt);
      }
    }

    let dateIndex = 1;
    for (let j = 0; j < 5; j++) {
      let tds = trs[j].querySelectorAll("td");
      for (let k = 0; k < 7; k++) {
        let td = tds[k];
        let dateTxt = document.createElement("div");
        dateTxt.setAttribute("class", "date_txt");
        td.appendChild(dateTxt);
        // 마지막 달이 토요일(6 + 1 = 7)이면 이번 달은 일요일이므로 첫 주 공백이 없음
        if (j === 0 && prevmonthdate != 7 && k < prevmonthdate) {
          dateTxt.textContent = "";
        } else if (dateIndex <= lastdate) {
          dateTxt.textContent = dateIndex;
          dateTxt.setAttribute("class", `date_txt date_${dateIndex}`);
          dateIndex++;
        }
      }
    }
    showNum();
  };

  btnPrev?.addEventListener("click", () => {
    month--;
    if (month === 0) {
      month = 12;
      year--;
    }
    showNum();
    showDate();
  });
  btnNext?.addEventListener("click", () => {
    month++;
    if (month === 13) {
      month = 1;
      year++;
    }
    showNum();
    showDate();
  });

  // 오늘 날짜 표시하기
  // 달력은 넘어가지만 오늘 날짜를 표시하려면?
  // 변수 중복을 줄일 수 있는 방법? 또는 보기 좋게 객체 리터럴로?
  btnToday?.addEventListener("click", () => {
    const todayYear = time.getFullYear();
    const todayMonth = time.getMonth() + 1;
    const todayDate = time.getDate();
    year = todayYear;
    month = todayMonth;
    date = todayDate;
    showDate();
  });

  // 렌더링 완료 후 즉시 실행
  showDate();
});

/**
 * TO DO
 * 0. button.next 클릭하면 오늘 날짜 표시(화면, 일정도 변경)
 * 1. h2.year, h1.month 클릭 시 input 또는 list 표시
 * (좌우 버튼을 여러 번 클릭하지 않아도 달력을 넘길 수 있게)
 * 2. 월별로 배경화면 변경
 * 3. 일정 표시
 * 4. 일정을 클릭하면 넷플릭스 상세정보처럼 modal 창을 크게 표시
 */
