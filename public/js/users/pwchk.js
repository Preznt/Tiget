// 회원가입에서 비밀번호 체크
document.addEventListener("DOMContentLoaded", () => {
  const pass = document.querySelector("input[name='password']");
  const passchk = document.querySelector("input.password_check");
  const divpass1 = document.querySelector("div.pass.ii");
  const divpass2 = document.querySelector("div.pass.i");
  const divCon = document.querySelector("div.pass.div_box");

  const btnJoin = document.querySelector("button.btn.join.submit");
  const formJoin = document.querySelector("form.privacy.input");

  const email = document.querySelector("form.privacy.input input#username");
  const joinInputs = document.querySelector("form.privacy.input input");

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

  btnJoin.addEventListener("click", () => {
    console.log(email.value);
    let exptext = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;
    if (exptext.test(email.value) == false) {
      alert("이메일형식이 올바르지 않습니다.");
      email.select();
      return false;
    }

    alert("회원가입이 완료되었습니다.");
    formJoin?.submit();
  });
});
