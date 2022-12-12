document.addEventListener("DOMContentLoaded", () => {
  const imgUpFile = document.querySelector("input#b_upfile");
  const btnUpload = document.querySelector("button.profilebutton");
  const profileForm = document.querySelector("form.setinline");
  btnUpload.addEventListener("click", () => {
    if (!imgUpFile.value) {
      alert("이미지를 선택해주세요");
    } else {
      profileForm.submit();
    }
  });
});
