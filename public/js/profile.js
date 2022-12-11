document.addEventListener("DOMContentLoaded", () => {
  const postButton = document.querySelector("div.profilebutton.myPost");
  const postModal = document.querySelector(".modal.post");
  const replyButton = document.querySelector(".profilebutton.myReply");
  const replyModal = document.querySelector(".modal.reply");
  let userId = document.querySelector(".emailid").value;
  const closeButton = document.querySelector(".close.reply");
  const closeButtonPost = document.querySelector(".close.post");
  userId = userId.slice(9, userId.length);
  // console.log(userId);
  replyButton?.addEventListener("click", () => {
    //   const option = {
    //     method: "POST",
    //     body: userId,
    //     headers: { "Content-Type": "application/json" },
    //   };
    //   fetch(`/profile/${userId}`, option).then();
    replyModal.style.display = "flex";
  });
  closeButton?.addEventListener("click", () => {
    replyModal.style.display = "none";
  });

  postButton?.addEventListener("click", () => {
    postModal.style.display = "flex";
  });
  closeButtonPost?.addEventListener("click", () => {
    postModal.style.display = "none";
  });
});
