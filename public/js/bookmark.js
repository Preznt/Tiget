document.addEventListener("DOMContentLoaded", () => {
  const favoriteList = document.querySelector(".bookmark_conlist");

  const showIntCon = async () => {
    await fetch("/mypage/bookmarklist")
      .then((res) => res.json())
      .then((json) => {
        let lists = json.conList;

        favoriteList.textContent = "";
        if (lists !== null) {
          let data = lists.map((ele) => {
            let listBox = document.createElement("DIV");
            listBox.className = "bmk_list_box";
            listBox.dataset.code = ele.concert_code;

            let poster = document.createElement("IMG");
            poster.className = "poster";
            poster.src = ele.concert_poster;

            let link = document.createElement("A");
            link.className = "name";
            link.textContent = ele.concert_name;
            link.href = `detail/${ele.concert_code}`;

            let date = document.createElement("DIV");
            date.className = "date";

            let startDate = document.createElement("SPAN");
            startDate.className = "start";
            startDate.textContent = ele.start_date;

            let dash = document.createElement("SPAN");
            dash.className = "dash";
            dash.innerHTML = "&nbsp;~&nbsp;";

            let endDate = document.createElement("SPAN");
            endDate.className = "end";
            endDate.textContent = ele.end_date;

            date.append(startDate, dash, endDate);

            let place = document.createElement("DIV");
            place.className = "place";
            place.textContent = ele.concert_place;

            let dday = document.createElement("DIV");
            dday.className = "dday";
            if (ele.dday < 0) dday.textContent = `D${ele.dday}`;
            else if (ele.dday > 0) dday.textContent = `D+${ele.dday}`;
            else dday.textContent = "D-Day";

            let bookmark = document.createElement("INPUT");
            bookmark.type = "checkbox";
            bookmark.id = "bookmark";
            bookmark.checked = true;

            // label 의 for 속성은 JS 에서 htmlFor 로 설정
            let label = document.createElement("LABEL");
            label.htmlFor = "bookmark";

            let ticketing = document.createElement("A");
            ticketing.href = `${ele.concert_ticketing}`;
            ticketing.target = "_blank";
            ticketing.className = "ticketing";
            ticketing.textContent = "예매하기";

            listBox.append(
              poster,
              link,
              date,
              place,
              dday,
              bookmark,
              label,
              ticketing
            );
            return listBox;
          });
          favoriteList.append(...data);
        }
      });
  };
  showIntCon();

  favoriteList?.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.id === "bookmark") {
      const value = target.checked;
      const thisCode = target.closest("DIV").dataset.code;
      const fetchOption = {
        method: "POST",
        body: JSON.stringify({ value, thisCode }),
        headers: { "Content-Type": "application/json" },
      };
      await fetch("/main/bookmark", fetchOption)
        .then((res) => res.text())
        .then((text) => {
          if (text === "insert") {
            bookmark.checked = true;
            showIntCon();
            return false;
          }
          if (text === "delete") {
            bookmark.checked = false;
            showIntCon();
            return false;
          }
        });
    }
  });
});
