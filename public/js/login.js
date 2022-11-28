document.addEventListener("DOMContentLoaded", () => {
  const btnLogin = document.querySelector("button.login");
  const idInput = document.querySelector("input.user_id");
  const pwInput = document.querySelector("input.user_pw");

  btnLogin?.addEventListener("click", () => {
    const id = idInput.value;
    const pw = pwInput.value;

    if (!id) {
      alert("아이디를 입력해주세요");
      idInput.select();
      return false;
    }
    if (!pw) {
      alert("비밀번호를 입력해주세요");
      pwInput.select();
      return false;
    }
    document.querySelector("form.login").submit();
  });
});
