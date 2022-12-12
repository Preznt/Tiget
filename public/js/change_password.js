document.addEventListener("DOMContentLoaded", () => {
  const changeBtn = document.querySelector("button.changebutton");
  const pwInput = document.querySelector("input.password");
  const newPw = document.querySelector("input.passwordinput.new");
  const newPwChk = document.querySelector("input.passwordinput.new_check");
  const divpass1 = document.querySelector("div.pass.ii");
  const divpass2 = document.querySelector("div.pass.i");
  const divCon = document.querySelector("div.pass.div_box");
  const password = document.querySelector("form.password");

  newPwChk?.addEventListener("input", () => {
    let newPwVal = newPw.value;
    let newPwChkVal = newPwChk.value;
    if (newPwVal !== newPwChkVal) {
      divCon.style.display = "block";
      divpass2.style.display = "none";
      divpass1.style.display = "block";
    } else {
      divpass1.style.display = "none";
      divpass2.style.display = "block";
    }
  });

  changeBtn?.addEventListener("click", () => {
    const nowPw = pwInput.value;
    const newPwVal = newPw.value;
    const newPwChkVal = newPwChk.value;
    if (!nowPw) {
      alert("현재 비밀번호를 입력해주세요");
      return false;
    }
    if (!newPwVal) {
      alert("변경할 비밀번호를 입력해주세요");
      return false;
    }
    if (newPwVal !== newPwChkVal) {
      alert("변경할 비밀번호가 틀립니다");
      return false;
    }
    if (newPwVal == nowPw) {
      alert("현재 비밀번호와 변경할 비밀번호가 같습니다");
      return false;
    }
    console.log(nowPw);
    fetch(`/mypage/pwChange/${nowPw}`)
      .then((res) => res.json())
      .then((json) => {
        if (json.status == null) {
          alert("현재 비밀번호가 틀립니다");
          return false;
        }
      });
    password.submit();
  });
});
