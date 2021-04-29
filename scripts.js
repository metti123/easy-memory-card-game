

const cards = document.querySelectorAll('.card');

let hasFlippedCard ;
let lockBoard ;
let firstCard, secondCard;
var count;
var tryy;
var fail;
var timeleft;
var w="FIND THE HIDDEN DOG!";
var downloadTimer;

function flipCard() {

  if (lockBoard) return;

  if (this === firstCard) return;

  this.classList.add('flip');

  firstCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = "match" === firstCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  document.getElementById("myP").innerHTML="MATCH FOUND!";
  count+=1;
  if(count===6){
    document.getElementById("myP").innerHTML="CONGRATULATIONS, YOU WON THE GAME!!!(click start button to play again)";
     final();
  }
  firstCard.removeEventListener('click', flipCard);
  tryy-=1;
  var x=document.getElementById('myTable').rows[parseInt(1,10)].cells;
x[parseInt(1,10)].innerHTML=tryy;
  resetBoard();

}

function unflipCards() {

  lockBoard = true;
  fail+=1;

  document.getElementById("myP").innerHTML="WRONG MOVE! TRY AGAIN!";
  var x=document.getElementById('myTable').rows[parseInt(2,10)].cells;
  x[parseInt(1,10)].innerHTML=fail;

  
  setTimeout(() => {
    firstCard.classList.remove('flip');
    resetBoard();
  }, 600);
}


function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard]=[null];
}


function shuffle() {
hasFlippedCard = false;
lockBoard = false;
firstCard, secondCard;
 count=0;
 tryy=6;
 fail=0;
timeleft = 4;

var x=document.getElementById('myTable').rows[parseInt(1,10)].cells;
x[parseInt(1,10)].innerHTML=tryy;
var y=document.getElementById('myTable').rows[parseInt(2,10)].cells;
  y[parseInt(1,10)].innerHTML=fail;



  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
  
}

function play(){

  [hasFlippedCard, lockBoard] = [false, false];
document.getElementById("myP").innerHTML="GAME HAS STARTED!";

shuffle();


  downloadTimer = setInterval(function(){
  if(timeleft <= 0){
    clearInterval(downloadTimer);
    document.getElementById("countdown").innerHTML = "Finished";
  } else {
    document.getElementById("countdown").innerHTML = timeleft + " seconds remaining";
  }
  timeleft -= 1;
  if (timeleft==-1){
    document.getElementById("myP").innerHTML="TIME UP!! GAME OVER!! (click start button to play again)";
    final();
  }
}, 2000);


cards.forEach(card => card.classList.add('flip'));

setTimeout(() => {
  cards.forEach(card => card.classList.remove('flip'));
  }, 700);


cards.forEach(card => card.addEventListener('click', flipCard));

}


function final(){
  clearInterval(downloadTimer);
  cards.forEach(card => card.classList.add('flip'));
  cards.forEach(card => card.removeEventListener('click', flipCard));
}