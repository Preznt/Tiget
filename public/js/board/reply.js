document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form.replycontainer");
  const replyButton = document.querySelector(".replyAdd");
  const replyInput = document.querySelector("#input");
  const replyPlace = document.querySelector("div.reply");

  const ShowReply = (replies) => {
    console.log(replies);

    const makeReply = replies.map((reply) => {
      let div = document.createElement("DIV");
      // div.className = "imgexample"
      // div.textContent =
      div.className = "example";
      div.textContent = "";

      let divContainer = document.createElement("DIV");
      divContainer.className = "replyinfo";
      let span = document.createElement("SPAN");
      span.textContent = "작성시각";
      divContainer.appendChild(span);
      div = document.createElement("DIV");
      div.textContent = reply.r_update_date;
      divContainer.appendChild(div);
      span = document.createElement("SPAN");
      span.textContent = "작성자";
      divContainer.appendChild(span);
      div = document.createElement("DIV");
      div.textContent = reply.r_nickname;
      divContainer.appendChild(div);

      div = document.createElement("DIV");
      div.className = "replies";
      div.textContent = reply.r_content;
    });
    replyPlace.append(...makeReply);
  };

  replyButton?.addEventListener("click", () => {
    const boardSeq = form.dataset.seq;
    const replyContent = replyInput.value;
    // console.log(boardSeq, replyContent);
    const option = {
      method: "POST",
      body: JSON.stringify({ boardSeq, replyContent }),
      headers: { "Content-Type": "application/json" },
    };

    fetch(`/forum/board/:${boardSeq}`, option)
      .then((res) => res.json())
      .then((replies) => ShowReply(replies));
  });
});
