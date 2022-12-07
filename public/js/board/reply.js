document.addEventListener("DOMContentLoaded", () => {
  const replycontainer = document.querySelector("div.replycontainer");
  const replyButton = document.querySelector(".replyAdd");
  const replyInput = document.querySelector("#input");
  const replyPlace = document.querySelector("div.replycontainer");

  const ShowReply = (replies) => {
    console.log(replies);

    const makeReply = replies.map((reply) => {
      const divReply = document.createElement("DIV");
      divReply.className = "reply";

      const divIMG = document.createElement("DIV");
      divIMG.className = "imgexample";
      divIMG.style.backgoundImage =
        reply.b_img || "url('../../images/profile.png')";

      const divExample = document.createElement("DIV");
      divExample.className = "example";

      const replayInfo = document.createElement("DIV");
      replayInfo.className = "replyinfo";

      let span = document.createElement("SPAN");
      span.textContent = `작성일시  : ${reply.r_update_date}`;
      replayInfo.appendChild(span);

      span = document.createElement("SPAN");
      span.textContent = `작성자  : ${reply.r_nickname}`;
      replayInfo.appendChild(span);

      divContent = document.createElement("DIV");
      divContent.className = "replies";
      divContent.textContent = reply.r_content;
      replayInfo.appendChild(divContent);

      divExample.appendChild(replayInfo);
      divReply.appendChild(divIMG);
      divReply.appendChild(divExample);

      return divReply;
    });
    console.log(makeReply);
    replyPlace.textContent = "";
    replyPlace.append(...makeReply);
  };

  replyButton?.addEventListener("click", () => {
    const boardSeq = replycontainer.dataset.seq;
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
