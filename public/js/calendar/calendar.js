document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector(".calendar .tbody");
  const btnPrev = document.querySelector("button.prev");
  const btnNext = document.querySelector("button.next");
  const btnToday = document.querySelector("button.today");

  const time = new Date();
  // 달력 넘기기 용도
  const valDay = {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    date: time.getDate(),
    day: time.getDay(),
  };
  // 오늘 날짜 표시 용도
  const today = {
    year: time.getFullYear(),
    month: time.getMonth() + 1,
    date: time.getDate(),
    day: time.getDay(),
  };

  const showNum = () => {
    const yearNum = document.querySelector("h2.year");
    const monthNum = document.querySelector("h1.month");
    yearNum.textContent = `${valDay.year}년`;
    monthNum.textContent = `${valDay.month}월`;
  };

  const matchDay = (arr, val) => arr.includes(val);

  const addSchedule = (concert) => {
    const schedule = document.createElement("div");
    schedule.textContent = concert.conName;
    schedule.dataset.code = concert.conCode;
    schedule.classList.add("schedule");
    return schedule;
  };

  // const calcDate = (start, end) => {
  //   let diffDate = new Date(end).getTime() - new Date(start).getTime();
  //   diffDate = diffDate / (1000 * 3600 * 24);
  //   return diffDate;
  // };

  const toDateFormatting = (year, month, date) => {
    return `${year}-${String(month).padStart(2, 0)}-${String(date).padStart(
      2,
      0
    )}`;
  };

  // calendar 를 넘길 때 데이터 fetch
  const fetchSchedule = async (valDay) => {
    const prevVal = {
      year: valDay.year,
      month: valDay.month - 1,
      date: 1,
    };
    const nextVal = {
      year: valDay.year,
      month: valDay.month + 1,
      date: 31,
    };
    if (valDay.month === 12) {
      nextVal.year = valDay.year + 1;
      nextVal.month = 1;
    }
    if (valDay.month === 1) {
      prevVal.year = valDay.year - 1;
      prevVal.month = 12;
    }
    const prev = toDateFormatting(prevVal.year, prevVal.month, prevVal.date);
    const next = toDateFormatting(nextVal.year, nextVal.month, nextVal.date);

    fetchOption = {
      method: "POST",
      body: JSON.stringify({ prev, next }),
      headers: { "Content-Type": "application/json" },
    };
    const result = await fetch("/main/schedule", fetchOption).then((res) =>
      res.json()
    );
    return result;
  };

  const showSchedule = (conData) => {
    let schedule;
    let dates = Array.from(document.querySelectorAll(".date"));
    for (let date of dates) {
      let classArr = Array.from(date.classList);
      classArr = String(classArr.filter((ele) => ele.includes("-")));
      if (classArr === "") {
        continue;
      }
      let lastconCode;
      for (let data of conData) {
        const concert = {
          conCode: data.concert_code,
          conName: data.concert_name,
          start: data.start_date,
          end: data.end_date,
        };
        if (concert.conCode === lastconCode) {
          continue;
        }
        if (
          new Date(classArr) >= new Date(concert.start) &&
          new Date(classArr) <= new Date(concert.end)
        ) {
          let d = date;
          if (!d.nextSibling) {
            d = d.parentNode?.nextSibling?.firstChild;
          } else {
            d = d.nextSibling;
          }
          schedule = addSchedule(concert);
          date.appendChild(schedule);
        } else {
          continue;
        }
        lastconCode = concert.conCode;
      }
    }
  };

  // !! showDate 함수를 기능별로 분할해야 함 !!
  const showDate = async (valDay) => {
    const todayVal = toDateFormatting(today.year, today.month, today.date);

    // lastDate: 이번 달 마지막 날짜 = 이번 달 날짜의 총 개수
    const lastDate = new Date(valDay.year, valDay.month, 0).getDate();
    // prevLastDate: 저번 달 마지막 날짜
    const prevLastDate = new Date(valDay.year, valDay.month - 1, 0).getDate();
    // prevMonthDays: 저번 달 마지막 날짜 요일 index + 1. 0(일요일)부터 시작하므로 요일 개수를 구하기 위해 + 1
    // 이번 달 첫 날짜 요일이 언제인지를 구하기 위함
    const prevMonthDays =
      new Date(valDay.year, valDay.month - 1, 0).getDay() + 1;
    /**
     * dIndex.current : 1 ~ lastDate 까지 증가
     * dIndex.prev : 이번 달 첫 주에서 표시할 저번 달의 시작 날짜(prevLastDate - 이전 요일 Index)
     *               prevMonthDays에서 + 1 했으므로 - 1
     */

    const dIndex = {
      current: 1,
      prev: prevLastDate - (prevMonthDays - 1),
      next: 1,
    };

    tbody.textContent = "";

    for (let j = 0; j < 6; j++) {
      let tr = document.createElement("div");
      tr.className = "week";

      for (let k = 0; k < 7; k++) {
        let td = document.createElement("div");
        td.className = "date";
        let dateTxt = document.createElement("div");
        dateTxt.classList.add("date_txt");
        td.appendChild(dateTxt);

        // 저번 달 날짜 표시
        // prevMonthDays != 7: 저번 달 마지막 요일이 토요일(6 + 1 = 7)이면 이번 달은 일요일이므로 첫 주 공백이 없음
        if (j === 0 && prevMonthDays != 7 && k < prevMonthDays) {
          dateTxt.textContent = dIndex.prev;
          let dd = String(dIndex.prev).padStart(2, 0);
          if (valDay.month === 1) {
            td.classList.add(`${valDay.year - 1}-12-${dd}`);
          } else {
            let mm = String(valDay.month - 1).padStart(2, 0);
            td.classList.add(`${valDay.year}-${mm}-${dd}`);
          }
          td.classList.add("prevMonth");
          dIndex.prev++;

          // 이번 달 날짜 표시
        } else if (dIndex.current <= lastDate) {
          dateTxt.textContent = dIndex.current;
          let mm = String(valDay.month).padStart(2, 0);
          let dd = String(dIndex.current).padStart(2, 0);
          td.classList.add(`${valDay.year}-${mm}-${dd}`);
          const tdClassArr = Array.from(td.classList);
          if (matchDay(tdClassArr, todayVal)) {
            td.classList.add("today");
          }
          dIndex.current++;

          // 다음 달 날짜 표시
        } else {
          dateTxt.textContent = dIndex.next;
          let dd = String(dIndex.next).padStart(2, 0);
          if (valDay.month === 12) {
            td.classList.add(`${valDay.year + 1}-01-${dd}`);
          } else {
            let mm = String(valDay.month + 1).padStart(2, 0);
            td.classList.add(`${valDay.year}-${mm}-${dd}`);
          }
          td.classList.add("nextMonth");
          dIndex.next++;
        }
        tr.appendChild(td);
      } // 1주 for문 종료
      tbody.appendChild(tr);
    } // 1달 for문 종료

    showNum();

    // 공휴일 데이터 표시
    const tds = Array.from(document.querySelectorAll(".date"));
    for (let td of tds) {
      let tdClassArr = Array.from(td.classList);
      tdClassArr = tdClassArr.map((tdClass) => {
        if (tdClass.includes("-")) {
          tdClass = tdClass.replaceAll("-", "");
        }
        return tdClass;
      });
      let dateTxt = td.querySelector(".date_txt");
      let holiTxt = document.createElement("div");
      holiTxt.classList.add("holi_txt");
      td.appendChild(holiTxt);
      for (let i of holiData) {
        if (tdClassArr.includes(`${i.h_locdate}`)) {
          holiTxt.textContent = i.h_dateName;
          if (i.h_isHoliday === "Y") {
            holiTxt.style.color = "red";
            dateTxt.style.color = "red";
          }
        }
      }
    }
    const result = await fetchSchedule(valDay);
    showSchedule(result);
  };

  showDate(valDay);

  btnPrev?.addEventListener("click", () => {
    valDay.month--;
    if (valDay.month === 0) {
      valDay.month = 12;
      valDay.year--;
    }
    showNum();
    showDate(valDay);
  });
  btnNext?.addEventListener("click", () => {
    valDay.month++;
    if (valDay.month === 13) {
      valDay.month = 1;
      valDay.year++;
    }
    showNum();
    showDate(valDay);
  });
  btnToday?.addEventListener("click", () => {
    valDay.year = today.year;
    valDay.month = today.month;
    valDay.date = today.date;
    showDate();
  });
});
