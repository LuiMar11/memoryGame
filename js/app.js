// List of all 16 cards
const allCards = [
  {
    name: 'dog',
    icon: 'fa-solid fa-dog',
    type: 'card',
  },

  {
    name: 'cat',
    icon: 'fa-solid fa-cat',
    type: 'card',
  },

  {
    name: 'anchor',
    icon: 'fa fa-anchor',
    type: 'card',
  },

  {
    name: 'bolt',
    icon: 'fa fa-bolt',
    type: 'card',
  },

  {
    name: 'dragon',
    icon: 'fa-solid fa-dragon',
    type: 'card',
  },

  {
    name: 'otter',
    icon: 'fa-solid fa-otter',
    type: 'card',
  },

  {
    name: 'spider',
    icon: 'fa-solid fa-spider',
    type: 'card',
  },

  {
    name: 'paw',
    icon: 'fa-solid fa-paw',
    type: 'card',
  },

  {
    name: 'dog',
    icon: 'fa-solid fa-dog',
    type: 'card',
  },

  {
    name: 'cat',
    icon: 'fa-solid fa-cat',
    type: 'card',
  },

  {
    name: 'anchor',
    icon: 'fa fa-anchor',
    type: 'card',
  },

  {
    name: 'bolt',
    icon: 'fa fa-bolt',
    type: 'card',
  },

  {
    name: 'dragon',
    icon: 'fa-solid fa-dragon',
    type: 'card',
  },

  {
    name: 'otter',
    icon: 'fa-solid fa-otter',
    type: 'card',
  },

  {
    name: 'spider',
    icon: 'fa-solid fa-spider',
    type: 'card',
  },

  {
    name: 'paw',
    icon: 'fa-solid fa-paw',
    type: 'card',
  },
];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Global variables
let deck = document.querySelector('.deck');
let openCardsList = [];
let moves = document.querySelector('.moves');
let click = 0;
let container = document.querySelector('.container');
let time = document.querySelector('.time');
let minutes = 0;
let seconds = 0;
let stars = document.querySelector('.stars');
let restartButton = document.querySelector('.restart');
let welcomeMessage = document.querySelector('.welcome');
let startGameButton = document.querySelector('.startGame');

// Display cards function
function displayCards() {
  // Shuffle the list of cards
  shuffle(allCards);
  // Loop through ech card and its HTML
  for (let card in allCards) {
    const cardHTML = `<li class="${allCards[card].type} ${allCards[card].name}">
        <i class="${allCards[card].icon}"></i>`;
    deck.innerHTML += cardHTML;
  }
}

// Event listener for start button
startGameButton.addEventListener('click', function () {
  startGame();
});

// Start Game
function startGame() {
  welcomeMessage.remove();
  deck.innerHTML = '';
  // Shows and shuffles cards
  displayCards();
  // Start timer
  myTimer();
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

// Event listener for card
deck.addEventListener('click', (event) => {
  if (event.target.nodeName === 'LI') {
    // Prevent from double adding the same element
    if (event.target == document.querySelector('.show')) {
      return false;
    }
    cardSymbol(event);
    addToOpen(event);
    checkMatch();
    rating();
  }
});

// Add symbol on card
function cardSymbol(event) {
  if (openCardsList.length < 2) {
    event.target.classList.add('show', 'open');
  }
}

// Add open cards to array
function addToOpen(event) {
  if (openCardsList.length < 2) {
    openCardsList.push(event.target);
  }
}

// Match cards
function checkMatch() {
  if (openCardsList.length === 2) {
    // Compare cards
    if (openCardsList[0].classList.value === openCardsList[1].classList.value) {
      match();
      countClicks(1);
      finish();
    } else {
      setTimeout(unmatch, 450);
      countClicks(1);
    }
  }
}

// Stick cards (they match)
function match() {
  openCardsList[0].classList.add('match');
  openCardsList[1].classList.add('match');
  openCardsList[0].classList.remove('show', 'open');
  openCardsList[1].classList.remove('show', 'open');
  openCardsList = [];
}

// Hide cards (they don't match)
function unmatch() {
  openCardsList[0].classList.remove('show', 'open');
  openCardsList[1].classList.remove('show', 'open');
  openCardsList = [];
}

// Count clicks
function countClicks(num) {
  click += num;
  moves.innerText = click;
}

// Timer
function myTimer() {
  timer = setInterval(() => {
    if (seconds < 10 && minutes < 10) {
      time.innerText = '0' + minutes + ':' + '0' + seconds;
    } else if (seconds >= 10 && minutes < 10) {
      time.innerText = '0' + minutes + ':' + seconds;
    } else {
      time.innerText = minutes + ':' + seconds;
    }
    seconds++;
    if (seconds == 60) {
      minutes++;
      seconds = 0;
    }
  }, 1000);
}

// Shows star based on moves
function rating() {
  if (click === 30) {
    stars.lastElementChild.remove();
  } else if (click === 60) {
    stars.lastElementChild.remove();
  }
}

// Winning game
function finish() {
  const match = document.getElementsByClassName('match');
  if (match.length === 16) {
    const popUp = `<h1>Good Job!<h2>
    <p>Completaste el juego con <span class="totalMoves">0</span> movimientos.</p>
    <p>Time: <span class="totalTime">0</span></p>
    <ul class="totalStars stars">
    </ul>
    <button type="button" class="playAgain">Volver a jugar!</button>`;
    // Display popUp
    const finish = document.createElement('div');
    finish.className = 'finish';
    container.appendChild(finish);
    finish.innerHTML = popUp;
    clearInterval(timer);
    document.querySelector('.totalMoves').innerText = moves.innerText;
    document.querySelector('.totalTime').innerText = time.innerText;
    document.querySelector('.totalStars').innerHTML = stars.innerHTML;
    // Event listener for Play Again!
    const playAgainButton = document.querySelector('.playAgain');
    playAgainButton.addEventListener('click', function () {
      reset();
    });
  }
}

// Event listener for reset button
restartButton.addEventListener('click', function () {
  reset();
});

// Reset game
function reset() {
  // Remove cards
  openCardsList = [];
  deck.innerHTML = '';
  // Display cards and shuffle them
  displayCards();
  // Clean timer
  clearInterval(timer);
  seconds = 0;
  minutes = 0;
  myTimer();
  // Clean moves
  moves.innerText = '0';
  click = 0;
  // Clean rating
  createRating();
  // Remove winning popUp if displayed
  let removeFinish = document.querySelector('.finish');
  if (removeFinish) {
    removeFinish.remove();
  }
}

// Creating new rating stars
function createRating() {
  const allStarsHTML = `
    <li><i class="fa fa-star"></i></li>
		<li><i class="fa fa-star"></i></li>
		<li><i class="fa fa-star"></i></li>`;
  stars.innerHTML = allStarsHTML;
}
