// 커뮤니티 화면에서 게시판 클릭시 구분을 위한 화면

document.addEventListener("DOMContentLoaded", () => {
  const liNotice = document.querySelector("li.Notice");
  const liAll = document.querySelector("li.all");
  const liConcert_review = document.querySelector("li.concert_review");
  const liConcert_hall_review = document.querySelector(
    "li.concert_hall_review"
  );
  const liFreeboard = document.querySelector("li.freeboard");
  const mainNav = document.querySelector("nav.main");
  const bltBrdList = document.querySelector("table.bltBrd.table");
  const pagebox = document.querySelector("div.pagecon");
  const pagePrev = document.querySelector("button.pagePrev");
  const pageNext = document.querySelector("button.pageNext");
  const pageFirst = document.querySelector("button.pagefirst");
  const pageEnd = document.querySelector("button.pageEnd");

  bltBrdList?.addEventListener("click", (tag) => {
    const td = tag.target;
    if (td.tagName === "TD") {
      const id = td.closest("TR").dataset.id;
      document.location.href = `http://localhost:3002/forum/board/${id}`;
    }
  });

  const baseURL = "/users/bltBrd";
  const data = [
    { name: "전체보기", url: `${baseURL}` },
    { name: "공지사항", url: `${baseURL}/Notice/page/1` },
    { name: "공연후기", url: `${baseURL}/category/공연후기/page/1` },
    { name: "공연장후기", url: `${baseURL}/category/공연장후기/page/1` },
    { name: "자유게시판", url: `${baseURL}/category/자유게시판/page/1` },
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
    liAll.style.backgroundColor = "gray";
    liAll.style.color = "white";
  }
  if (category == "Notice") {
    liNotice.style.backgroundColor = "gray";
    liNotice.style.color = "white";
  }
  if (category == "공연후기") {
    liConcert_review.style.backgroundColor = "gray";
    liConcert_review.style.color = "white";
  }
  if (category == "공연장후기") {
    liConcert_hall_review.style.backgroundColor = "gray";
    liConcert_hall_review.style.color = "white";
  }
  if (category == "자유게시판") {
    liFreeboard.style.backgroundColor = "gray";
    liFreeboard.style.color = "white";
  }

  const pageCount = 5;
  let lastNumber = Number(pageGroup) * pageCount; // 최대 페이지

  let firstNumber = lastNumber - (pageCount - 1);
  // 처음 페이지는 최대페이지 -4

  if (lastNumber > Number(totalPage)) {
    if (totalPage == 0) {
      totalPage = 1;
    }
    // 최대 페이지가 데이터베이스의 페이지보다 많을경우
    // 최대 페이지를 데이터베이스의 페이지와 같게하라
    lastNumber = Number(totalPage);
  }

  (() => {
    for (let i = Number(firstNumber); i <= Number(lastNumber); i++) {
      const pageButton = document.createElement("BUTTON");
      pageButton.className = `pageNumber`;
      pageButton.setAttribute(`id`, `${i}`);
      pageButton.textContent = `${i}`;
      pagebox.appendChild(pageButton);
    }
  })();
  pagebox?.addEventListener("click", (e) => {
    const buttonContent = e.target;
    if (buttonContent.tagName === "BUTTON") {
      document.location.href = `${buttonContent.id}`; // 페이지 버튼 눌렀을때 페이지 이동
    }
  });
  pagePrev?.addEventListener("click", () => {
    if (currentPage > 1) {
      const pageNum = currentPage - 1;
      document.location.href = `${pageNum}`;
    } else {
      alert("첫번째 페이지입니다.");
    }
  });
  pageNext?.addEventListener("click", () => {
    if (currentPage < Number(totalPage)) {
      const pageNum = Number(currentPage) + 1;
      document.location.href = `${pageNum}`;
    } else {
      alert("마지막 페이지입니다.");
    }
  });
  pageFirst?.addEventListener("click", () => {
    document.location.href = `1`;
  });
  pageEnd?.addEventListener("click", () => {
    document.location.href = `${totalPage}`;
  });
  const pagebtn = document.querySelector(`button[id='${currentPage}']`);
  (() => {
    pagebtn.style.backgroundColor = "gray";
  })();
});
