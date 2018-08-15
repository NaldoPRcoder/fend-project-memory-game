/*
 * Create a list that holds all of your cards
 */


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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
}


/*
 * set up the event listener for a card. If a card is clicked:*/
let clickCount = 0;
let openCards = [];

 let gameCard = document.querySelector('.deck');
 gameCard.addEventListener('click',showCard);
 gameCard.addEventListener('click',saveCardName);
 /*  - display the card's symbol (put this functionality in another function that you call from this one)*/

function showCard(e) {
   if (e.target.className === "card") {
     e.target.className = "card open show";
   }
   moves();
}

/*-add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)*/
function saveCardName(e) {
   let name = e.target.innerHTML;
   openCards.push(name);
   console.log(name);
   setTimeout(compareCard,500);
 }
 /*  - if the list already has another card, check to see if the two cards match*/
function matchCard(card) {
  return card == openCards[0];
}

function compareCard (){
  if (openCards.length == 2) {
   let matchingCard = openCards.every(matchCard);

   if (matchingCard) {
     let sameCards = document.querySelectorAll('.show');
     for(i = 0; i < sameCards.length; i++){
       sameCards[i].className = "card match";
     }
     openCards.length = 0;
     console.log(matchingCard);
   }
   else {
     let diffCards = document.querySelectorAll('.show');
     for(i = 0; i < diffCards.length; i++) {
       diffCards[i].className = "card";
     }
     openCards.length = 0;
   }
 }
}

 /*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 /*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 /*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)*/
 function moves() {
   clickCount ++;
   document.querySelector('.moves').innerHTML = clickCount;
 }
 /*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
