import {
  startMenu
} from "./startMenu.js";
import {
  activeGame
} from "./activeGame.js";
import {
  iconsArray,
  numArray
} from "./themeArrays.js";
let minutes;
let seconds;
let timer; // Serves as reference for time interval.

const random = shuffle(iconsArray); // Stores shuffle function with array of card as argument.
init();


function startTimer() {
  let mins = minutes.textContent; // Minutes counter.
  let secs = 0; // Seconds counter.


  /* Sets the game time countdown */
  timer = setInterval(function () {
    if (secs === 59) {
      secs = "0" + 0;
      seconds.textContent = secs;
    } else {
      secs++;
      seconds.textContent = (secs < 10) ? "0" + secs : secs;
    }

    if (secs === "0" + 0) {
      mins++;
      minutes.textContent = mins;
    }

  }, 1000);

}


function init() {
  document.querySelector("body").innerHTML = startMenu;
  menu();
}

function menu() {
  const theme = document.querySelectorAll(".btn-theme");
  const playerNum = document.querySelectorAll(".btn-players");
  const grid = document.querySelectorAll(".btn-grid");
  const startGame = document.querySelector(".btn-start");

  Array.from(theme).forEach(el => {
    el.addEventListener("click", () => {
      const selected = document.getElementsByClassName("theme-active");
      selected[0].className = selected[0].className.replace(" theme-active", "");
      el.className += " theme-active";

    })
  });

  Array.from(playerNum).forEach(el => {
    el.addEventListener("click", () => {
      const selected = document.getElementsByClassName("players-active");
      selected[0].className = selected[0].className.replace(" players-active", "");
      el.className += " players-active";
    })
  });

  Array.from(grid).forEach(el => {
    el.addEventListener("click", () => {
      const selected = document.getElementsByClassName("grid-active");
      selected[0].className = selected[0].className.replace(" grid-active", "");
      el.className += " grid-active";
    })
  });

  startGame.addEventListener("click", () => {
    const startScreen = document.querySelector(".start-screen");

    startScreen.style.display = "hidden";

    document.querySelector("body").innerHTML = activeGame;
    document.querySelector("body").style.backgroundColor = "#FCFCFC";



    random.forEach((num, i) => {
      const grid = document.querySelector(".grid");
      const listItem = document.createElement("li");
      const button = document.createElement("button");
      listItem.classList.add("card");
      button.classList.add("card-button");
      listItem.appendChild(button);
      const btn = document.getElementsByClassName("card-button");

      grid.appendChild(listItem);
      btn[i].innerHTML = num;
      minutes = document.querySelector(".minutes")
      seconds = document.querySelector(".seconds")
    });
    startTimer()
  });

}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue;
  let randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}