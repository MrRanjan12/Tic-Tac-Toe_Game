let boxes = document.querySelectorAll(".box");
let reset_btn = document.querySelector("#reset-btn");
let newGameButton = document.querySelector("#new-btn");
let msgConatainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

//sound effect 
const winSound = new Audio("sound_effect/game-over-classic-206486.mp3");
const drawSound = new Audio("sound_effect/game-fail-90322.mp3");

const resetGame = () => {
  turnO = true;
  enableBoxes();
  msgConatainer.classList.add("hide");
  boxes.forEach(box => {
    box.classList.remove('winning-box');
    box.classList.remove('playerO', 'playerX');
    box.classList.remove("playerO", "animate-text");
    box.classList.remove("playerX", "animate-text");
  });
};

// draw functionality
const checkDraw = () => {
  for (let box of boxes) {
    if (box.innerText === "") {
      return false; //if all boxes are empity that means game is not draw
    }
  }
  return true; //All boxex are filled ;
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    // console.log("box was clicked");

    const clickSound = new Audio("sound_effect/game-start-6104.mp3");
    clickSound.play(); //Play click sound

    if (turnO) {
      box.innerText = "O";
      box.classList.add("playerO", "animate-text"); //adding class to change color and animate
      box.classList.add("player0"); //adding class to change color
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.add("playerX", "animate-text"); //adding class to change color and animate
      box.classList.add("playerX"); //adding class to change color
      turnO = true;
    }
    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};

const enableBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
  }
};


const showWinner = (winner,pattern) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgConatainer.classList.remove("hide");

  pattern.forEach((index) => {
    boxes[index].classList.add("winning-box"); // Highlight winning boxes
  });

  winSound.play();  //Play win sound 
  
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        console.log("winner", pos1Val);
        showWinner(pos1Val, pattern);
        return; //Exit after finding a winner
      }
    }
  }
  //check for draw
  if (checkDraw()) {
    console.log("its a draw!");
    msg.innerText = "It's a draw";
    msgConatainer.classList.remove("hide");
    drawSound.play(); //Play draw sound
  }
};

newGameButton.addEventListener("click", resetGame);
reset_btn.addEventListener("click", resetGame);
