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
const moves = document.querySelector(".moves");
let timer;
let turn = [];
let currentPlayer = 0;
let movesCounter = 0;
let matches = 0;

init();

function init() {
  const card = document.querySelectorAll(".card");

  cardButton.forEach((icon, i) => {
    const number = `<p class=${random[i]}>${random[i]}</p>`;

    if (themeSetting !== "icons") {
      icon.innerHTML = number;
    } else {
      icon.innerHTML = random[i];
    }

  })


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
  const player = Array.from(document.querySelectorAll(".player"));
  const score = Array.from(document.querySelectorAll(".score"));


  if (!e.target.classList.contains("show")) {
    e.target.classList.add("open", "show");
    turn.push(e.target.children);
  }

  cardButton.forEach(btn => {
    if (btn.classList.contains("open")) {
      btn.removeEventListener("click", cardEventListener);
    }
  });

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
      matches++



      /* If pair of card DO match, the 'match' style is applied to both. */
      setTimeout(() => {
        turn1.parentElement.classList.add("match");
        turn2.parentElement.classList.add("match");

        turn = [];

      }, 0);
      // 'Turn' array is emptied when a pair of card are revealed.
      if (players > 1) {
        score[currentPlayer].textContent++;
      }

    }
    if (players <= 1 && grid === "4x4" && matches === 8) {
      singlePlayerResult(moves.textContent);
      document.querySelector(".single-result-modal").style.display = "flex";
    }

  }

  if (players <= 1 && turn.length === 2) {
    movesCounter++;
    moves.textContent = movesCounter;
  }

  if (turn.length === 2 && players > 1) {
    player[currentPlayer].classList.remove("player-turn");
    currentPlayer++;
    if (players > currentPlayer) {
      player[currentPlayer].classList.add("player-turn");
    } else {
      currentPlayer = 0;
      player[currentPlayer].classList.add("player-turn");
    }
  }

}

function addPlayer(num) {
  const timer = document.querySelector(".time-div");
  const moves = document.querySelector(".moves-div");
  const playerList = document.querySelector(".players-list");
  const listItem = document.createElement("li");
  const playerHeader = document.createElement("h3");
  const playerScore = document.createElement("p");

  if (players > 1) {
    moves.style.display = "none";
    timer.style.display = "none";
    playerHeader.innerText = "Player " + num;
    playerScore.innerText = 0;
    listItem.classList.add("player");
    listItem.classList.add("moves-div");
    playerScore.classList.add("score");
    playerList.appendChild(listItem);
    listItem.appendChild(playerHeader);
    listItem.appendChild(playerScore);

  } else {
    startTimer();
  }

  const player =
    Array.from(document.querySelectorAll(".player"));

  if (players > 1) {
    player[0].classList.add("player-turn");
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

function singlePlayerResult(moves) {
  const finalTime = document.querySelector(".time-result");
  const finalMoves = document.querySelector(".moves-result");
  const time = document.querySelector(".timer");

  finalTime.textContent = time.textContent;
  finalMoves.textContent = moves;

  clearInterval(timer);
}

function multiplayerResult(time, moves) {

}