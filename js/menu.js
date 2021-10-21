const menuSettings = JSON.parse(localStorage.getItem("menu"));

menu();

function menu() {
  const theme = document.querySelectorAll(".btn-theme");
  const playerNum = document.querySelectorAll(".btn-players");
  const grid = document.querySelectorAll(".btn-grid");

  localStorage.setItem("menu", JSON.stringify({
    "theme": "numbers",
    "players": ""
  }));

  Array.from(theme).forEach(el => {
    el.addEventListener("click", (e) => {
      const selected = document.getElementsByClassName("theme-active");
      selected[0].className = selected[0].className.replace(" theme-active", "");
      el.className += " theme-active";
      if (e.target.value === "icons") {

        localStorage.setItem("menu", JSON.stringify({
          "theme": "icons"
        }));

      }


    })
  });



  Array.from(playerNum).forEach(el => {
    el.addEventListener("click", (e) => {
      const selected = document.getElementsByClassName("players-active");
      selected[0].className = selected[0].className.replace(" players-active", "");
      el.className += " players-active";
      console.log(e.target)

      switch (e.target.value) {
        case 1:
      }
    })
  });

  Array.from(grid).forEach(el => {
    el.addEventListener("click", (e) => {
      const selected = document.getElementsByClassName("grid-active");
      selected[0].className = selected[0].className.replace(" grid-active", "");
      el.className += " grid-active";
    })
  });



}