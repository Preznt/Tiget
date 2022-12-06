document.addEventListener("DOMContentLoaded", () => {
  const btn = document.querySelector("button.write.insert");
  const titleInput = document.querySelector("input.main.title");
  const content = document.querySelector("textarea.content");
  const category = document.querySelector("select.category");
  btn?.addEventListener("click", () => {
    const title = titleInput.value;
    if (!title) {
      alert("제목을 입력해주세요");
      return false;
    }
    if (category.value == "none") {
      alert("게시판을 선택해주세요");
      return false;
    }
    if (!content.value) {
      alert("게시 내용을 입력해주세요");
      return false;
    } else {
      document.querySelector("form.category").submit();
    }
  });
});
