
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
};
/* REPLACE CARDS WITH NEW SHUFFLE DECK*/
function newDeck() {
  const board = document.querySelector('.deck');
  let cards = document.querySelectorAll('ul.deck li');
  let shuffleCards = shuffle(Array.from(cards));
  for (i = 0; i < cards.length; i++) {
    if (cards[i].parentNode) {
      cards[i].parentNode.removeChild(cards[i]);
    }
  }
  for (i = 0; i < shuffleCards.length; i++) {
    board.append(shuffleCards[i]);
  }
};
newDeck();

/* SCORE PANEL*/
let clickCount = 0;
let sameCardCount = 0;
let seconds = 0;
let minutes = 0;
/*EVENT HANDLERS */
const gameCard = document.querySelector('.deck');
const newGame = document.querySelector('.restart');
gameCard.addEventListener('click',showCard);
gameCard.addEventListener('click',startTime);
function timeListener () {
  gameCard.addEventListener('click',startTime);
};
/* STAR A NEW GAME*/
newGame.addEventListener('click', function() {
  console.log('The restart button was clicked!');
  let startOver = document.querySelectorAll('.match, .open');
  for(i = 0; i < startOver.length; i++) {
    startOver[i].className = "card";
  }
  clearInterval(timer);
  clickCount = 0;
  minutes = 0;
  seconds = 0;
  sameCardCount = 0;
  document.querySelector('.moves').innerHTML = clickCount;
  document.querySelector('.minutes').innerHTML = minutes;
  document.querySelector('.seconds').innerHTML = seconds;
  resetStars();
  newDeck();
  document.querySelector('.congrats').style.display = "none";
  let add = document.querySelectorAll('.deck .card');
  for(i = 0; i < add.length; i++) {
    add[i].style.display = "flex";
  }
  timeListener();
});
 /*  - display the card's symbol*/
function showCard(e) {
  let cCard = document.querySelectorAll('.show i');
  if (e.target.className === "card" && cCard.length <= 2) {
     e.target.className = "card open show";
     clickCount ++;
     document.querySelector('.moves').innerHTML = clickCount;
     setTimeout(compareCard,300);
     setTimeout(openCards,700);
     rating();
     setTimeout(compareCard,500);
     setTimeout(openCards,700);
    }
};
/*-add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)*/
function compareCard() {
  let cCard = document.querySelectorAll('.show i');
  if(cCard.length <= 2) {
    let card1 = cCard[0].className;
    let card2 = cCard[1].className;
    if(card1 === card2) {
      let sameCards = document.querySelectorAll('.show');
      for(i = 0; i < sameCards.length; i++){
        sameCards[i].className = "card match";
        sameCardCount ++;
      }
    } else {
      let diffCards = document.querySelectorAll('.show');
      for(i = 0; i < diffCards.length; i++) {
        diffCards[i].className = "card";
      }
    }
  } else {
    let diffCards = document.querySelectorAll('.show');
    for(i = 0; i < diffCards.length; i++) {
      diffCards[i].className = "card";
    }
 }
};

function openCards() {
  if(sameCardCount === 16) {
    clearInterval(timer);
    let remove = document.querySelectorAll('.deck .card');
    for(i = 0; i < remove.length; i++) {
      remove[i].style.display = "none";
    }
    document.querySelector('.congrats .moves').innerHTML = clickCount;
    document.querySelector('.congrats').style.display = "block";
    sameCardCount = 0;
  }
};
let timer;
function startTime(){
  timer = setInterval(stopWatch,1000);
  if (clickCount === 1) {
    removeHandler();
  }
};

function removeHandler() {
  gameCard.removeEventListener('click',startTime);
};

function stopWatch() {
  seconds ++
  let sec = document.querySelector('.seconds').innerHTML = seconds;
  if(seconds >= 60) {
    seconds = 0;
    minutes ++;
    let min = document.querySelector('.minutes').innerHTML = minutes;
  }
};

function rating() {
  let star = document.querySelectorAll('.stars li');
  let congratStar = document.querySelectorAll('.congrats p i');
  switch (clickCount) {
    case 30:
      star[2].style.display = 'none';
      congratStar[2].style.display = 'none';
      break;
    case 40:
      star[1].style.display = 'none';
      congratStar[1].style.display = 'none';
      break;
    default:
      break;
  }
};

function resetStars (){
  let star = document.querySelectorAll('.stars li');
  let congratStar = document.querySelectorAll('.congrats p i');
  star[2].style.display = 'inline-block';
  congratStar[2].style.display = 'inline-block';
  star[1].style.display = 'inline-block';
  congratStar[1].style.display = 'inline-block';
};
