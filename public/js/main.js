document.addEventListener("DOMContentLoaded", (t) => {
  const rankBox = document.querySelector("div.ranking");
  const mainHeader = document.querySelector("header.main");
  const navButtons = document.querySelector("div.main.button.box");
  const boardSort = document.querySelector(".categorylist");
  const tbodyList = document.querySelector("tbody.boardcontainer.tbody");
  const replyCount = document.querySelector(".reply_count");
  const idModal = document.querySelectorAll(".nickname");

  //   td = document.createElement("td")
  //   td.textContent = data.b_title
  //   tr.appendChild(td)

  //   td = document.createElement("td")
  //   td.textContent = data.b_update_date
  //   tr.appendChild(td)

  //   return boardList
  // tbody.append(...boardList)

  const showBoard = (datas) => {
    // console.log(datas);
    tbodyList.textContent = "";

    const boardList = datas.map((data, index) => {
      // console.log(data.f_reply.length);
      let tr = document.createElement("TR");
      tr.className = "board tr";
      tr.textContent = "";
      tr.dataset.id = data.seq;
      let td = document.createElement("td");
      td.classList = "board seq";
      td.textContent = "";
      td.textContent = index + 1;
      tr.appendChild(td);

      td = document.createElement("TD");
      td.classList = "board title";
      let span = document.createElement("SPAN");
      span.textContent = data.b_title;
      let A = document.createElement("A");
      A.className = "reply_count";
      if (data.f_reply.length >= 1) {
        A.textContent = "[" + data.f_reply.length + "]";
      }
      td.appendChild(span);
      td.appendChild(A);
      tr.appendChild(td);

      td = document.createElement("TD");
      td.classList = "board nickname";
      td.textContent = data.b_nickname;
      tr.appendChild(td);

      td = document.createElement("td");
      td.classList = "board date";
      td.textContent = data.b_update_date;
      tr.appendChild(td);
      return tr;
    });
    // console.log(boardList);
    tbodyList.append(...boardList);
  };
  navButtons?.addEventListener("click", (e) => {
    const button = e.target;
    const btnClass = button.textContent;
    if (btnClass == "랭킹") {
      document.location.href = "#ranking";
    } else if (btnClass == "달력") {
      document.location.href = "#main2";
    } else if (btnClass == "포럼") {
      document.location.href = "#main1";
    }
  });
  boardSort?.addEventListener("click", async (b) => {
    const target = b.target;

    if (target.tagName === "DIV") {
      let loadFor = target.textContent;
      console.log(loadFor);
      if (loadFor !== "전체보기") {
        await fetch(`/forum/${loadFor}`)
          .then((res) => res.json())
          .then((datas) => {
            showBoard(datas);
          });
      } else {
        await fetch(`/forum`)
          .then((res) => res.json())
          .then((datas) => {
            showBoard(datas);
          });
      }
    } else return false;
    const buttons = document.querySelectorAll("div.category");

    buttons.forEach((button) => {
      button.classList.remove("active");
    });
    b.target.classList.add("active");
  });
  tbodyList?.addEventListener("click", (e) => {
    const target = e.target;
    console.log(target);

    if (target.tagName === "TD") {
      const boardSeq = target.closest("TR").dataset.id;

      document.location.href = `/forum/board/${boardSeq}`;
    } else if (target.tagName === "A") {
      const boardSeq = target.closest("TR").dataset.id;
      document.location.href = `/forum/board/${boardSeq}`;
      const cookie = (name, value, exp) => {
        let date = new Date();
        date.setTime(date.getTime() + exp * 5000);
        document.cookie =
          name + "=" + value + ";expires=" + date.toUTCString() + ";path=/";
      };
      cookie("reply", "true", 1);
    }
  });

  for (let id = 0; id < idModal.length; id++) {
    idModal.textContent = "";
    idModal[id]?.addEventListener("click", (e) => {
      let idmodal = document.createElement("DIV");
      idmodal.style.position = "absolute";
      idmodal.style.top = "20%";
      idmodal.style.left = "100%";
      idmodal.style.height = "60px";
      idmodal.style.width = "150px";
      idmodal.style.display = "flex";
      idmodal.style.flexDirection = "column";
      idmodal.style.backgroundColor = "black";
      idmodal.style.color = "white";
      idmodal.className = "idmodal";

      let div = document.createElement("DIV");
      div.style.backgroundImage = "url(../../public/images/tv_1280.png)";
      div.textContent = "게시글 검색";
      div.className = "idmodal searchpost";
      div.style.textAlign = "center";
      div.style.cursor = "pointer";
      idmodal.appendChild(div);
      div = document.createElement("DIV");
      div.style.backgroundImage = "url(/images/keyboard_1280.png)";
      div.className = "idmodal searchreply";
      div.textContent = "댓글 검색";
      div.style.textAlign = "center";
      div.style.cursor = "pointer";
      idmodal.appendChild(div);
      div = document.createElement("DIV");
      div.className = "idmodal close";
      div.style.textAlign = "center";
      div.textContent = "닫기";
      div.style.cursor = "pointer";
      idmodal.appendChild(div);
      e.target.appendChild(idmodal);

      console.log(e.target.className);
      if (e.target.className == "idmodal close") {
        console.log("help");
      }
    });
  }

  window.addEventListener("click", (e) => {
    if (e.target.className === "scroll") {
      console.log(e.target.className);
      idmodal.style.display = "none";
    }
  });
});
