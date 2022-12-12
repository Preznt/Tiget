document.addEventListener("DOMContentLoaded", () => {
  const Nav = document.querySelector("nav.menu");
  const baseURL = "/mypage";
  const data = [
    { name: "사용자 정보", url: `${baseURL}` },
    { name: "비밀번호 변경", url: `${baseURL}/pwChange/` },
    { name: "선호장르 설정", url: `${baseURL}/favoriteGenre` },
    { name: "찜목록", url: `` },
    { name: "회원탈퇴", url: `${baseURL}/delete` },
  ];
  Nav?.addEventListener("click", (e) => {
    const navItem = e.target;
    if (navItem.tagName === "LI") {
      data.forEach((data) => {
        if (data.name == navItem.textContent) {
          // console.log(data.name, navItem.textContent);
          // alert(navItem.textContent);
          document.location.href = data.url;
        }
      });
    }
  });
});
