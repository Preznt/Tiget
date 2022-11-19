document.addEventListener("DOMContentLoaded", () => {
  const btnSearch = document.querySelector("button.btn_search_detail");
  const searchDropdownBox = document.querySelector(
    "div.search_detail_dropdown_box"
  );

  btnSearch?.addEventListener("click", () => {
    searchDropdownBox.classList.toggle("visible");
  });
});
