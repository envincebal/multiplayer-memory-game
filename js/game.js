import {
  iconsArray,
  numArray,
  playersArray
} from "./themeArrays.js";
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
let timer; // Serves as reference for time interval.
const cardButton = document.querySelectorAll(".card-button");
const theme = localStorage.getItem("theme");
const players = localStorage.getItem("players");
const grid = localStorage.getItem("grid");

let numMode = grid === "4x4" ? numArray.slice(0, 16) : numArray;
let iconsMode = grid === "4x4" ? iconsArray.slice(0, 16) : iconsArray;
let themeSetting = theme === "icons" ? iconsMode : numMode;
const random = shuffle(themeSetting); // Stores shuffle function with array of card as argument.

init();

function init() {
  const card = document.querySelectorAll(".card");
  const player = document.querySelectorAll(".player");


  if (themeSetting === "numbers") {
    cardButton.forEach((num, i) => {
      num.append(random[i])
    })
  } else {
    cardButton.forEach((icon, i) => {
      icon.innerHTML = random[i];
    })
  }

  for (let i = 1; i <= players; i++) {
    addPlayer([i]);
  }



  if (grid === "4x4") {
    Array.from(card).forEach(item => {
      if (item.classList.contains("hard-card")) {
        item.style.display = "none";
      }
    })

    Array.from(cardButton).forEach(item => {
      item.style.width = "118px";
      item.style.height = "118px";
    });
  }
}

function addPlayer(num) {
  const timer = document.querySelector(".time-div");
  const playerList = document.querySelector(".players-list");
  const listItem = document.createElement("li");
  const playerHeader = document.createElement("h3");
  const playerMoves = document.createElement("p");

  playerHeader.innerText = "Player " + num;
  playerMoves.innerText = 0;
  listItem.classList.add("moves-div");
  listItem.classList.add("player");
  playerMoves.classList.add("moves");
  playerList.appendChild(listItem);
  listItem.appendChild(playerHeader);
  listItem.appendChild(playerMoves);

  if (players > 1) {
    timer.style.display = "none";
  }

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