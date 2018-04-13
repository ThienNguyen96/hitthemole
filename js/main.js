const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const scoreBoard = document.querySelector(".score");
const modal = document.querySelector('.modalcus');

const timer = document.querySelector('#timer');
const gameOver = document.querySelector('.gameOver__modal');
const lastScore = document.querySelector('.bst--score');

let lastHole;
let play = false;
let score;
let point = 100;


var scr = new Audio();
var  puch = new Audio();
var over = new Audio();

function randTime(min,max){
    return Math.round(Math.random()*(max-min)+min);
}

function randHole(moles){
    const idx = Math.floor(Math.random() * moles.length);
    const moles2 = moles[idx];
    
    if(moles2===lastHole){
        console.log("The Same !");
        return randHole(moles);
    }
    lastHole = moles2;
    return moles2;
}

function moleUp(){
    const time = randTime(200,2000);
    const mole = randHole(moles);
    mole.classList.add('up');
    setTimeout(() => {
      mole.classList.remove('up');
      if(!play)moleUp();
    }, time);
}
function startGame(){
    modal.style.display ="none";
    score = 0;
    play = false;
    scoreBoard.textContent = 0;
    moleUp();
    gameTimer();
}

function hit(e){
    if(!e.isTrusted) return;
    puch.src="audio/Puch.mp3";
    puch.play();
    
    score++;
    scoreBoard.textContent = score;

    scr.src="audio/score.mp3";
    scr.play();
    point+=2;
    timer.style.background = 'green';

    this.classList.remove("up");

    lastScore.textContent = score;
}

moles.forEach(mole=>mole.addEventListener('click',hit));

function gameTimer(){
   let endTime = setInterval(() => {
      timer.style.width = point+"%";
      point-=3;
      timer.style.background = '#E91E63';

      if(point<=0){
            clearInterval(endTime);
            timer.style.width = "0%";
            gameOver.style.display="block";
            over.src="audio/over.wav";
            over.play();
        }
    }, 1000);


}

function resetGame(){
    location.reload();
}



