document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector(".calendar .tbody");

  tbody?.addEventListener("click", async (e) => {
    const target = e.target;
    if (target.className === "schedule") {
      const conCode = target.dataset.code;
      const con = await fetch(`/main/find/${conCode}`);
    }
  });
});
