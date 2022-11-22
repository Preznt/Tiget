// 글쓰기 화면에서 데이터 넘어오는것을 실험용

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button.write.insert");
  btn?.addEventListener("click", () => {
    document.querySelector("form.category").submit();
  });
});
