document.addEventListener("DOMContentLoaded", () => {
  const pw = document.querySelector("input.pw");
  const rePw = document.querySelector("input.rePw");
  const button = document.querySelector("div.pwChange button");
  const form = document.querySelector("form.pwChange");

  button?.addEventListener("click", () => {
    const pwVal = pw.value;
    const reVal = rePw.value;
    if (pwVal !== reVal) {
      alert("입력하신 비밀번호가 서로 틀립니다");
    } else {
      form.submit();
    }
  });
});
