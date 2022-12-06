// 커뮤니티 화면에서 게시판 클릭시 구분을 위한 화면

document.addEventListener("DOMContentLoaded", () => {
  const aNotice = document.querySelector("li.Notice");
  const aAll = document.querySelector("li.all");
  const aConcert_review = document.querySelector("li.concert_review");
  const aConcert_hall_review = document.querySelector("li.concert_hall_review");
  const aFreeboard = document.querySelector("li.freeboard");
  const mainNav = document.querySelector("nav.main");

  const baseURL = "/users/bltBrd";
  const data = [
    { name: "전체보기", url: `${baseURL}` },
    { name: "공지사항", url: `${baseURL}/Notice` },
    { name: "공연후기", url: `${baseURL}/category/공연후기` },
    { name: "공연장후기", url: `${baseURL}/category/공연장후기` },
    { name: "자유게시판", url: `${baseURL}/category/자유게시판` },
  ];

  mainNav?.addEventListener("click", (tag) => {
    const navItem = tag.target;
    if (navItem?.tagName === "LI") {
      data.forEach((data) => {
        if (data.name === navItem.textContent) {
          document.location.href = data.url;
        }
      });
    }
  });

  if (category == "all") {
    aAll.style.backgroundColor = "gray";
    aAll.style.color = "white";
  }
  if (category == "Notice") {
    aNotice.style.backgroundColor = "gray";
    aNotice.style.color = "white";
  }
  if (category == "공연후기") {
    aConcert_review.style.backgroundColor = "gray";
    aConcert_review.style.color = "white";
  }
  if (category == "공연장후기") {
    aConcert_hall_review.style.backgroundColor = "gray";
    aConcert_hall_review.style.color = "white";
  }
  if (category == "자유게시판") {
    aFreeboard.style.backgroundColor = "gray";
    aFreeboard.style.color = "white";
  }
});
