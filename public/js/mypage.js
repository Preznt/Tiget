document.addEventListener("DOMContentLoaded", () => {
  const nav = document.querySelector("nav.menu");

  nav?.addEventListener("click", (e) => {
    const target = e.target;
    if (target.className === "LI") {
      console.log(target.className);
      switch (target.textContent) {
        case "사용자 정보":
          location.href = "/mypage";
          break;
        case "회원탈퇴":
          location.href = "/mypage/delete";
          break;
      }
    }
  });
});
