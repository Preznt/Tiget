document.addEventListener("DOMContentLoaded", () => {
  const rankBox = document.querySelector("div.ranking");
  const mainHeader = document.querySelector("header.main");
  const navButtons = document.querySelector("div.main.button.box");
  const boardSort = document.querySelector(".categorylist");

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
  boardSort?.addEventListener("click",(b)=>{
    const target = b.target
    if( target.tagName === "DIV") {
      let loadFor = target.textContent
      // console.log(loadFor)
      
      fetch(`/forum/:${loadFor}`)      
    }
  })

  
});
