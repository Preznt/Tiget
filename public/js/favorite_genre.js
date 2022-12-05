document.addEventListener("DOMContentLoaded", () => {
  const formGenre = document.querySelector("form.genre_select");
  const btnGenre = document.querySelector("button.genre_button");
  const genreInputs = document.querySelectorAll("form.genre_select input");

  btnGenre?.addEventListener("click", () => {
    formGenre?.submit();
  });

  // for(let j= 0; j<genreInputs.length; i++ ){
  //   for(let i= 0; i <  ; i++){
  //     if(input[j])= fg[i].genre_code){
  //       input[j].checked =""
  //     }
  //   }

  // }
});
