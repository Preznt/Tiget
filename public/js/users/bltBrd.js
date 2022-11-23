// 커뮤니티 화면에서 게시판 클릭시 구분을 위한 화면

document.addEventListener("DOMContentLoaded", () => {
  const aNotice = document.querySelector("a.Notice");
  const aAll = document.querySelector("a.all");
  const aConcert_review = document.querySelector("a.concert_review");
  const aConcert_hall_review = document.querySelector("a.concert_hall_review");
  const aFreeboard = document.querySelector("a.freeboard");
  if (category == "all") {
    aAll.style.backgroundColor = "gray";
    aAll.style.color = "white";
  }
  if (category == "notice") {
    aNotice.style.backgroundColor = "gray";
    aNotice.style.color = "white";
  }
  if (category == "concert_review") {
    aConcert_review.style.backgroundColor = "gray";
    aConcert_review.style.color = "white";
  }
  if (category == "concert_hall_review") {
    aConcert_hall_review.style.backgroundColor = "gray";
    aConcert_hall_review.style.color = "white";
  }
  if (category == "freeboard") {
    aFreeboard.style.backgroundColor = "gray";
    aFreeboard.style.color = "white";
  }
});
