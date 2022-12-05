document.addEventListener("DOMContentLoaded", () => {
  let errMsg = document.querySelector("div.err_msg");
  const inputVal = document.querySelector("input[name='val_password']");
  const inputChk = document.querySelector("input[name='chk_password']");
  const btnDel = document.querySelector("button#deleteAcc");

  const chkVal = () => {
    if (!inputVal.value) {
      errMsg.textContent = "비밀번호 란을 입력하세요.";
      inputVal.focus();
      return false;
    }
    if (!inputChk.value) {
      errMsg.textContent = "비밀번호 확인란을 입력하세요.";
      inputChk.focus();
      return false;
    }
    if (inputVal.value !== inputChk.value) {
      errMsg.textContent = "비밀번호 값이 일치하지 않습니다.";
      inputChk.select();
      return false;
    }
    return true;
  };

  const resetInput = () => {
    inputVal.value = "";
    inputChk.value = "";
  };

  btnDel?.addEventListener("click", async () => {
    if (chkVal()) {
      const data = { val_password: inputVal.value };
      const fetchOption = {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      };
      let result = await fetch(`/mypage/delete/check`, fetchOption);
      result = await result.json();
      if (result.msg === "false") {
        errMsg.textContent = "비밀번호가 틀렸습니다. 다시 입력해주세요.";
        resetInput();
        inputVal.focus();
        return false;
      }
      if (result.msg === "null") {
        errMsg.textContent = "존재하지 않거나 탈퇴한 회원입니다.";
        resetInput();
        return false;
      } else {
        location.href = `/mypage/delete/${username}`;
      }
    }
  });
});
