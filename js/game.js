import {
  iconsArray,
  numArray
} from "./themeArrays.js";

const theme = localStorage.getItem("theme");
const players = localStorage.getItem("players");
const grid = localStorage.getItem("grid");

let numMode = grid === "4x4" ? numArray.slice(0, 16) : numArray;
let iconsMode = grid === "4x4" ? iconsArray.slice(0, 16) : iconsArray;
let themeSetting = theme === "icons" ? iconsMode : numMode;
const random = shuffle(themeSetting); // Stores shuffle function with array of card as argument.
const cardButton = document.querySelectorAll(".card-button");
let turn = [];

init();

function init() {
  const card = document.querySelectorAll(".card");

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

  Array.from(cardButton).forEach(el => {
    el.addEventListener("click", cardEventListener);
  });
}

function cardEventListener(e) {
  
  if (!e.target.classList.contains("show")) {
    e.target.classList.add("open", "show");
    turn.push(e.target.children);
  }

  cardButton.forEach(btn => {
    if (btn.classList.contains("open")) {
      btn.removeEventListener("click", cardEventListener);
    }
  });
console.log(turn[0][0])
  if (turn.length === 2) {
    let turn1 = turn[0][0];
    let turn2 = turn[1][0];
    if (turn1.classList.value !== turn2.classList.value) {

      turn1.parentElement.classList.add("wrong");
      turn2.parentElement.classList.add("wrong");

      cardButton.forEach(btn => {
        btn.removeEventListener("click", cardEventListener);
      });

      setTimeout(() => {
        turn1.parentElement.classList.remove("open", "show", "wrong");
        turn2.parentElement.classList.remove("open", "show", "wrong");

        turn = [];

        cardButton.forEach(btn => {
          if (!btn.classList.contains("match")) {
            btn.addEventListener("click", cardEventListener);
          }
        })
      }, 1000);
    } else {
      /* If pair of card DO match, the 'match' style is applied to both. */
      turn1.parentElement.classList.add("match");
      turn2.parentElement.classList.add("match");

      turn = []; // 'Turn' array is emptied when a pair of card are revealed.
    }
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
  } else {
    startTimer();
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
  const minutes = document.querySelector(".minutes");
  const seconds = document.querySelector(".seconds");
  let mins = minutes.textContent; // Minutes counter.
  let secs = 0; // Seconds counter.

  /* Sets the game time countdown */
  setInterval(function () {
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