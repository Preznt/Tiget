document.addEventListener("DOMContentLoaded", () => {
  const btnEmail = document.querySelector("button.email");
  const emailInput = document.querySelector("input.email");
  const certificationInput = document.querySelector("input.certification");
  const certificationBtn = document.querySelector("button.certification");
  const formEmail = document.querySelector("form.email");

  if (number == "") {
    btnEmail?.addEventListener("click", () => {
      const email = emailInput.value;
      if (!email) {
        alert("이메일을 입력해주세요");
        return false;
      }
      formEmail.submit();
    });
  }
  certificationBtn?.addEventListener("click", () => {
    const certificationNum = certificationInput.value;
    if (certificationNum == number) {
      document.location.href = `/users/${number}/${email}`;
    } else {
      alert("인증번호가 틀립니다");
    }
  });
});
