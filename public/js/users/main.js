// nav화면에서 이동과 login 모달창 띄우기

document.addEventListener("DOMContentLoaded", () => {
  const mainNav = document.querySelector("nav.main");
  const btnLogout = document.querySelector("button.logout");

  mainNav?.addEventListener("click", (tag) => {
    const navItem = tag.target;
    if (navItem?.tagName === "LI") {
      let url = "";
      switch (navItem.textContent) {
        case "Home":
          url = "/";
          break;
        case "커뮤니티":
          url = "/users/bltBrd";
          break;
      }
      document.location.href = url;
    }
  });
  const modal = document.getElementById("modal");
  const btnModal = document.getElementById("btn-modal");
  btnModal?.addEventListener("click", () => {
    modal.style.display = "flex";
  });
  const divbtn = document.querySelector("div.close-area");
  divbtn?.addEventListener("click", () => {
    modal.style.display = "none";
  });

  btnLogout?.addEventListener("click", () => {
    if (confirm("로그아웃 하시곘습니까?")) {
      document.location.href = "/users/logout";
    } else {
      return false;
    }
  });
});
