document.addEventListener("DOMContentLoaded", () => {
  const formWithdrawal = document.querySelector("form.withdrawal");
  const inputVal = document.querySelector(
    "form.withdrawal input[name='val_password']"
  );
  const inputChk = document.querySelector(
    "form.withdrawal input[name='chk_password']"
  );
  const btnDel = document.querySelector("button#deleteAcc");

  const chkVal = () => {
    if (!inputVal.value) {
      alert("비밀번호 란을 입력하세요.");
      inputVal.focus();
      return false;
    }
    if (!inputChk.value) {
      alert("비밀번호 확인란을 입력하세요.");
      inputChk.focus();
      return false;
    }
    if (inputVal.value !== inputChk.value) {
      alert("비밀번호 확인이 서로 일치하지 않습니다.");
      inputChk.select();
      return false;
    }
    return true;
  };
  btnDel?.addEventListener("click", () => {
    if (chkVal()) {
      formWithdrawal.submit();
    }
  });
});
