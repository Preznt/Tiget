// 약관화면에 필수항목 체크 확인

document.addEventListener("DOMContentLoaded", () => {
  const chkAll = document.querySelector("input.chk_all");
  const chkbox = document.querySelectorAll("input.terms");
  const button = document.querySelector("button.btn_primary");
  const input1 = document.querySelector("input[id='checkbox1']");
  const input2 = document.querySelector("input[id='checkbox2']");

  button.addEventListener("click", () => {
    if (input1.checked == true && input2.checked == true) {
      document.location.href = "/users/join/register";
    } else alert("필수항목을 체크해주세요");
  });

  chkAll?.addEventListener("click", () => {
    chkbox.forEach((ck) => {
      ck.checked = chkAll.checked;
    });
  });
  chkbox?.forEach((ck) => {
    ck?.addEventListener("click", () => {
      let cht = 0;

      chkbox?.forEach((ck) => {
        if (ck.checked == true) cnt++;
      });
    });
    if (cnt == chkbox?.length) {
      chkAll.checked = true;
    } else {
      chkAll.checked = false;
    }
  });
});
