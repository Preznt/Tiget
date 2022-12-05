document.addEventListener("DOMContentLoaded", () => {
  const formGenre = document.querySelector("form.genre_select");
  const btnGenre = document.querySelector("button.genre_button");
  const genreInputs = document.querySelectorAll("form.genre_select input");

  btnGenre?.addEventListener("click", () => {
    formGenre?.submit();
  });
});
