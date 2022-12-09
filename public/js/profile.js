document.addEventListener("DOMContentLoaded", () => {
  const postButton = document.querySelector("div.profilebutton.myPost");
  const replyButton = document.querySelector(".profilebutton.myReply");

  postButton?.addEventListener("click", () => {
    alert("클릭");

    console.log(userID);
    // fetch("/");
  });
});
