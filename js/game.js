import {
  iconsArray,
  numArray
} from "./themeArrays.js";

const theme = localStorage.getItem("theme");
const players = localStorage.getItem("players");
const grid = localStorage.getItem("grid");

const cardButton = document.querySelectorAll(".card-button");

let timer;
let turn = [];
let currentPlayer = 0;
let movesCounter = 0;
let matches = 0;
let finalScores = [];
let winner;



init();

function init() {
  const card = document.querySelectorAll(".card");

  let numMode = grid === "4x4" ? numArray.slice(0, 16) : numArray;
  let iconsMode = grid === "4x4" ? iconsArray.slice(0, 16) : iconsArray;
  let themeSetting = theme === "icons" ? iconsMode : numMode;
  const random = shuffle(themeSetting);

  if (grid === "4x4") {
    card.forEach(item => {
      if (item.classList.contains("hard-card")) {
        item.style.display = "none";
      }
    })
  }

  if (grid === "6x6") {
    cardButton.forEach(item => {
      item.classList.remove("card-button")
      item.classList.add("hard-card-button")
    });
  }

  for (let i = 1; i <= players; i++) {
    addPlayer([i]);
  }

  if (document.querySelectorAll(".player").length === 3) {
    document.querySelectorAll(".player").forEach(item => {
      item.style.width = "30%";
    });
  } else if (document.querySelectorAll(".player").length === 4) {
    document.querySelectorAll(".player").forEach(item => {
      item.style.width = "23%";
    });
  }

  cardButton.forEach((icon, i) => {
    const number = `<p class=${random[i]}>${random[i]}</p>`;

    if (theme !== "icons") {
      icon.innerHTML = number;
    } else {
      icon.innerHTML = random[i];
    }
  });

  restartGame();

}

function restartGame() {
  const cards = Array.from(document.querySelectorAll(".card"));
  const random = shuffle(cards);
  const playerTurn =
    document.querySelectorAll(".player");
  const playerContainer = document.querySelectorAll(".player-container");
  const restartBtn = document.querySelectorAll(".restart");
  const gridList = document.querySelector(".grid");
  const moves = document.querySelector(".moves");
  const scores = document.querySelectorAll(".score");
  const singlePlayerModal = document.querySelector(".single-result-modal");
  const multiPlayerModal = document.querySelector(".multiplayer-result-modal");

  turn = [];
  currentPlayer = 0;
  movesCounter = 0;
  matches = 0;
  finalScores = [];
  winner;

  moves.innerText = 0;

  singlePlayerModal.style.display = "none";
  multiPlayerModal.style.display = "none";

  playerContainer.forEach(el => {
    el.remove();
  })

  scores.forEach(score => {
    score.textContent = 0;
  });

  random.forEach(card => {
    gridList.append(card);
  });

  cardButton.forEach(card => {
    card.classList.remove("open", "show", "match");
    card.addEventListener("click", cardEventListener);
  });

  restartBtn.forEach(el => {
    el.addEventListener("click", () => {
      restartGame();
      clearInterval(timer);
      startTimer();
      document.querySelector(".minutes").textContent = "0";
      document.querySelector(".seconds").textContent = "00";
    });
  });

  playerTurn.forEach(el => {
    el.classList.remove("player-turn");
  })

  if (players > 1) {
    playerTurn[0].classList.add("player-turn");
  }
}

function cardEventListener(e) {
  const moves = document.querySelector(".moves");
  const player = document.querySelectorAll(".player");
  const score = document.querySelectorAll(".score");

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

    if (players <= 1 && turn.length === 2) {
      movesCounter++;
      moves.textContent = movesCounter;
    }

    if (players <= 1 && grid === "4x4" && matches === 8) {
      singlePlayerResult(moves.textContent);
      document.querySelector(".single-result-modal").style.display = "flex";
    } else if (players <= 1 && grid === "6x6" && matches === 18) {
      singlePlayerResult(moves.textContent);
      document.querySelector(".single-result-modal").style.display = "flex";
    }

    if (players > 1 && grid === "4x4" && matches === 8) {

      document.querySelector(".multiplayer-result-modal").style.display = "flex";

      score.forEach(item => {
        finalScores.push(parseInt(item.textContent));
      });

      winner = Math.max(...finalScores);

      for (let i = 0; i < players; i++) {
        multiplayerResult([i]);
      }

    } else if (players > 1 && grid === "6x6" && matches === 18) {
      document.querySelector(".multiplayer-result-modal").style.display = "flex";

      score.forEach(item => {
        finalScores.push(parseInt(item.textContent));
      });

      winner = Math.max(...finalScores);

      for (let i = 0; i < players; i++) {
        multiplayerResult([i]);
      }
    }

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

function addPlayer(num) {
  const timer = document.querySelector(".time-div");
  const playerList = document.querySelector(".players-list");
  const movesDiv = document.querySelector(".moves-div");
  const listItem = document.createElement("li");
  const playerHeader = document.createElement("h3");
  const playerScore = document.createElement("p");

  if (players > 1) {
    movesDiv.style.display = "none";
    timer.style.display = "none";
    playerHeader.innerText = "P" + num;
    playerScore.innerText = 0;
    listItem.classList.add("player");
    playerScore.classList.add("score");
    playerList.appendChild(listItem);
    listItem.appendChild(playerHeader);
    listItem.appendChild(playerScore);
  } else {
    startTimer();
  }
}

function multiplayerResult(num) {

  const multiplayerResult = document.querySelector(".multiplayer-result");
  const playerList = document.querySelector(".player-results");
  const player = document.querySelectorAll(".player-container");
  const score = Array.from(document.querySelectorAll(".score"));

  const listItem = document.createElement("li");
  const playerName = document.createElement("p");
  const playerScore = document.createElement("p");
  const duplicates = finalScores.filter((item, index) => finalScores.indexOf(item) !== index);
  const highestScore = Math.max(...finalScores)

  playerName.innerText = `Player ${parseInt(num) + 1}`;
  playerScore.innerText = score[num].textContent;

  if (winner === parseInt(score[num].textContent)) {
    listItem.classList.add("winner");
    playerScore.style.color = "#FCFCFC";

    if (highestScore === Math.max(...duplicates)) {
      multiplayerResult.innerText = "It's a tie!";
    } else {
      multiplayerResult.innerText = `Player ${parseInt(num) + 1} wins!`;
    }
  }

  if (player.length < players) {
    listItem.classList.add("player-container");
    playerName.classList.add("player-name");
    playerScore.classList.add("player-score");
    playerList.appendChild(listItem);
    listItem.appendChild(playerName);
    listItem.appendChild(playerScore);
  }

}

function singlePlayerResult(moves) {
  const finalTime = document.querySelector(".time-result");
  const finalMoves = document.querySelector(".moves-result");
  const time = document.querySelector(".timer");
  const movesCount = document.querySelector(".moves");

  finalTime.textContent = time.textContent;
  finalMoves.textContent = movesCount.textContent;

  clearInterval(timer);
}