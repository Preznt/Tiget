document.addEventListener("DOMContentLoaded", () => {
  const favoriteList = document.querySelector("div.ticket_shape.content");

  // calendar 찜 목록 표시
  const showIntCon = async () => {
    await fetch("/main/favorites")
      .then((res) => res.json())
      .then((json) => {
        let lists = json.interConList;
        if (lists !== null) {
          for (let ele of lists) {
            let a = document.createElement("a");
            a.textContent = ele.concert_name;
            a.href = `/detail/${ele.concert_code}`;
            favoriteList.appendChild(a);
          }
        }
      });
  };

  showIntCon();
});

/**
 * modal 의 bookmark 를 클릭할 때마다 업데이트 되어야 함
 */
