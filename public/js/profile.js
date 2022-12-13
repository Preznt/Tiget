document.addEventListener("DOMContentLoaded", () => {
  const postButton = document.querySelector("div.profilebutton.myPost");
  const postModal = document.querySelector(".modal.post");
  const replyButton = document.querySelector(".profilebutton.myReply");
  const replyModal = document.querySelector(".modal.reply");
  const closeButton = document.querySelector(".close.reply");
  const closeButtonPost = document.querySelector(".close.post");
  const buttons = document.querySelector("ul.menu");
  const replyTD = document.querySelector("tbody.body.reply");
  const postTD = document.querySelector("tbody.body.post");
  const genreDiv = document.querySelectorAll("div.genre");
  const Form = document.querySelector(".myGenre");
  buttons?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName === "LI") {
      if (target.textContent === "사용자 정보") {
        document.location.href = "/profile";
      } else if (target.textContent === "비밀번호 변경") {
        document.location.href = "/mypage/pwChange";
      } else if (target.textContent === "선호장르 설정") {
        document.location.href = "/mypage/favoriteGenre";
      } else if (target.textContent === "찜목록") {
        document.location.href = "/mypage/bookmark";
      } else if (target.textContent === "회원탈퇴") {
        document.location.href = "/mypage/delete";
      }
    }
  });

  replyButton?.addEventListener("click", () => {
    replyModal.style.display = "flex";
  });
  closeButton?.addEventListener("click", () => {
    replyModal.style.display = "none";
  });

  postButton?.addEventListener("click", () => {
    postModal.style.display = "flex";
  });
  closeButtonPost?.addEventListener("click", () => {
    postModal.style.display = "none";
  });

  replyTD?.addEventListener("click", (e) => {
    const td = e.target;
    if (td.tagName === "TD") {
      alert("클릭");
      const r_seq = td.closest("TR").dataset.r_seq;
      document.location.href = `/forum/board/${r_seq}`;
    }
  });
  postTD?.addEventListener("click", (e) => {
    const td = e.target;
    if (td.tagName === "TD") {
      alert("클릭");
      const p_seq = td.closest("TR").dataset.seq;
      // fetch(`/forum/board/${p_seq}`, {
      //   data: { where: JSON.stringify({ id: p_seq }) },
      // }).then(
      document.location.href = `/forum/board/${p_seq}`;
    }
  });

  Form?.addEventListener("click", (e) => {
    const genre = e.target;
    const genre_code1 = genre.dataset.genre_code;
    alert("클릭");
    console.log(genre_code1);
    const posthref = () => {
      let f = document.createElement("FORM");
      f.setAttribute("METHOD", "POST");
      f.setAttribute("action", "/list");
      let input = document.createElement("INPUT");
      input.setAttribute("TYPE", "Hidden");
      input.setAttribute("Name", "genre_code");
      input.setAttribute("Value", `${genre_code1}`);
      f.appendChild(input);
      document.body.appendChild(f);
      f.submit();
    };
    posthref();
  });
});
