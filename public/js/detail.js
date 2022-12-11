document.addEventListener("DOMContentLoaded", () => {
  const bookmark = document.querySelector("#bookmark");
  const thisCode = document.querySelector(".top.content").dataset.code;

  const chkBookmark = async () => {
    const code = thisCode;
    const fetchOption = {
      method: "POST",
      body: JSON.stringify({ code }),
      headers: { "Content-Type": "application/json" },
    };
    await fetch("/main/info", fetchOption)
      .then((res) => res.json())
      .then((json) => {
        let { interCon } = json;
        console.log(interCon);
        if (interCon === true) {
          bookmark.checked = true;
        }
        if (interCon === false || null) {
          bookmark.checked = false;
        }
      });
  };

  chkBookmark();

  bookmark?.addEventListener("click", async () => {
    const value = bookmark.checked;
    const fetchOption = {
      method: "POST",
      body: JSON.stringify({ value, thisCode }),
      headers: { "Content-Type": "application/json" },
    };
    await fetch("/main/bookmark", fetchOption)
      .then((res) => res.text())
      .then((text) => {
        console.log(text);
        if (text === "insert") {
          bookmark.checked = true;
          return false;
        }
        if (text === "delete") {
          bookmark.checked = false;
          return false;
        }
        if (text === "failed") {
          alert("로그인 후 이용해주세요");
          bookmark.checked = false;
          return false;
        }
      });
  });
});
