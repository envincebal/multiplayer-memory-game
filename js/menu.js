(() => {

  const theme = document.querySelectorAll(".btn-theme");
  const playerNum = document.querySelectorAll(".btn-players");
  const grid = document.querySelectorAll(".btn-grid");

  localStorage.setItem("theme", "numbers");
  localStorage.setItem("players", "1");
  localStorage.setItem("grid", "4x4");

  Array.from(theme).forEach(el => {
    el.addEventListener("click", (e) => {
      const selected = document.getElementsByClassName("theme-active");
      selected[0].className = selected[0].className.replace(" theme-active", "");
      el.className += " theme-active";

      if (e.target.value === "icons") {
        localStorage.setItem("theme", "icons");
      }
      if (e.target.value === "numbers") {
        localStorage.setItem("theme", "numbers");
      }
    })
  });


  Array.from(playerNum).forEach(el => {
    el.addEventListener("click", (e) => {
      const selected = document.getElementsByClassName("players-active");
      selected[0].className = selected[0].className.replace(" players-active", "");
      el.className += " players-active";

      switch (e.target.value) {
        case "1":
          localStorage.setItem("players", "1");
          break;
        case "2":
          localStorage.setItem("players", "2");
          break;
        case "3":
          localStorage.setItem("players", "3");
          break;
        case "4":
          localStorage.setItem("players", "4");
          break;
      }
    })
  });

  Array.from(grid).forEach(el => {
    el.addEventListener("click", (e) => {
      const selected = document.getElementsByClassName("grid-active");
      selected[0].className = selected[0].className.replace(" grid-active", "");
      el.className += " grid-active";

      if (e.target.value === "6x6") {
        localStorage.setItem("grid", "6x6");
      } else {
        localStorage.setItem("grid", "4x4");
      }
    })
  });
})()