//player will enter page and login/register
//player will be able to click play and start playing the game
//player has 60 seconds per gameplay
//random words will pop out at the top of screen
//player has to type out words seen accurately
//new word will pop up if player types incorrectly
//when game ends, score will be displayed at the end of the screen
//player can choose to play again
//player score will be tabulated on the score page where player can monitor their progress
//player can also see the top 10 scores (their friend's score) and compete with 'friends'
//player can add friends

//=============================================GLOBAL VARIABLES====================================================//
let time = 10;
let score = 0;
//check if game is going on; yes then TRUE, no then FALSE
let isPlaying;
let gameWords;

//===============================================DOM ELEMENTS=====================================================//
const wordInput = document.querySelector("#word-input");
const currentWord = document.querySelector("#game-word");
const scoreDisplay = document.querySelector("#score");
const timeDisplay = document.querySelector("#time");
const gameMessage = document.querySelector("#game-message");
const playButton = document.querySelector("#play-button");
const restartButton = document.querySelector("#restart-button");
const endButton = document.querySelector("#endgame-button");

//==============================================GAME LOGIC========================================================//
//Game function
const gameInIt = async () => {
  //hide the restart button
  playButton.disabled = true;
  playButton.classList.remove("d-none");
  //load word from Array
  gameWords = await axios
    .get("/game/words")
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.log(error);
    });
  showWord(gameWords);
  //start match
  wordInput.addEventListener("input", startMatch);
  //call countdown every second
  setInterval(countdown, 1000);
  //check game status
  setInterval(checkStatus, 50);
};

//pick random words ; how to access database using AJAX??
function showWord(gameWords) {
  // get random number to access word object
  const randomNumber = Math.floor(Math.random() * gameWords.length + 1);
  const selectedWord = gameWords[randomNumber].words;
  const myGameWord = document.getElementById("game-word");
  myGameWord.innerHTML = selectedWord;
}

//Start match
function startMatch() {
  if (matchWords()) {
    console.log("MATCH");
    isPlaying = true;
    wordInput.value = "";
    showWord(gameWords);
    score++;
  }
  //if score is -1, display 0
  if (score === -1) {
    scoreDisplay.innerHTML = 0;
  } else {
    scoreDisplay.innerHTML = score;
  }
}

//match current word with word input
function matchWords() {
  if (wordInput.value === currentWord.innerHTML) {
    gameMessage.innerHTML = "Correct!!";
    return true;
  } else {
    gameMessage.innerHTML = "";
    return false;
  }
}

//countdown timer
function countdown() {
  if (time > 0) {
    //start countdown
    time--;
  } else if (time === 0) {
    //game is over
    isPlaying = false;
  }
  //show timer
  timeDisplay.innerHTML = time;
}

//check game status
function checkStatus() {
  if (!isPlaying && time === 0) {
    gameMessage.innerHTML = "Game Over!!!";
    playButton.classList.add("d-none");
    restartButton.classList.remove("d-none");
    document.getElementById("word-input").disabled = true;
  }
}

const replayFunction = async () => {
  document.getElementById("word-input").disabled = false;
  document.getElementById("word-input").value = "";
  gameMessage.innerHTML = "";
  time = 10;
  score = 0;
  timeDisplay.innerHTML = time;
  scoreDisplay.innerHTML = score;
  playButton.classList.remove("d-none");
  restartButton.classList.add("d-none");
  showWord(gameWords);
};

//get the score to display on score page
const scoreBoard = async () => {
  try {
    const playerScore = await axios.post(`/score/post`, { score });
    console.log("this works");
    console.log(window);
    location.reload();
  } catch (err) {
    console.log(err);
  }
};

//=============================================INITIALIZE GAME====================================================//
playButton.addEventListener("click", gameInIt);
restartButton.addEventListener("click", replayFunction);
endButton.addEventListener("click", scoreBoard);
