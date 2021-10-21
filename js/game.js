import {
  iconsArray,
  numArray
} from "./themeArrays.js";
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");
let timer; // Serves as reference for time interval.


const cardButton = document.querySelectorAll(".card-button");
const menuSettings = JSON.parse(localStorage.getItem("menu"));
const themeSetting = menuSettings.theme === "icons" ? iconsArray : numArray;
const random =  shuffle(themeSetting); // Stores shuffle function with array of card as argument.

init();

function init() {



  if (menuSettings.theme === "numbers") {
    for (let i = 0; i < numArray.length; i++) {
      cardButton[i].append(random[i]);

    }
  }else{
    for (let i = 0; i < iconsArray.length; i++) {
      cardButton[i].innerHTML = random[i];
    }
  }

startTimer();
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