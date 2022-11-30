document.addEventListener("DOMContentLoaded", () => {
  const rankBox = document.querySelector("div.ranking");
  const mainHeader = document.querySelector("header.main");
  const navButtons = document.querySelector("div.main.button.box");
  const boardSort = document.querySelectorAll(".categorylist div");

  navButtons?.addEventListener("click", (e) => {
    const button = e.target;
    const btnClass = button.textContent;
    if (btnClass == "랭킹") {
      document.location.href = "#ranking";
    } else if (btnClass == "달력") {
      document.location.href = "#main2";
    } else if (btnClass == "포럼") {
      document.location.href = "#main1";
    }
  });
  boardSort?.addEventListener("click", async (e) => {
    const sort = e.target;
    if (sort.tagName === "BUTTON") {
      let location = sort.textContent;
      const option = {
        Method: "get",
        bodydata: location,
      };
      fetch(`/forum/${location}`, option).then((res) => res.json());
    }
  });

  // window.onscroll = scrollF();

  // function scrollF() {
  //   if (document.body.scrollTop > 50) {
  //     mainHeader.classList.add("active");
  //   } else {
  //     mainHeader.classList.remove("active");
  //   }
  // }
});
