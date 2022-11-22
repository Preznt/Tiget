// 회원가입에서 비밀번호 체크
document.addEventListener("DOMContentLoaded", () => {
  const pass = document.querySelector("input[name='password']");
  const passchk = document.querySelector("input.password_check");
  const divpass1 = document.querySelector("div.pass.ii");
  const divpass2 = document.querySelector("div.pass.i");
  const divCon = document.querySelector("div.pass.div_box");

  passchk.addEventListener("input", () => {
    let passNow = pass.value;
    let passChkNow = passchk.value;
    if (passNow !== passChkNow) {
      divCon.style.display = "block";
      divpass2.style.display = "none";
      divpass1.style.display = "block";
    } else {
      divpass1.style.display = "none";
      divpass2.style.display = "block";
    }
  });
});
