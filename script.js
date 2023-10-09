var isMoving = true;
var isJumping = false;

var dinoCanvas = document.getElementById("dinoCanvas");
var boxCanvas = document.getElementById("boxCanvas");
var scoreElement = document.getElementById("score");
var levelElement = document.getElementById("level");
var bg = document.getElementById("board");
var coverScreen = document.querySelector(".cover-screen");
var result = document.getElementById("result");
var startButton = document.getElementById("start-button");
var gameContent = document.querySelector(".game-content");
var gameOverScreen = document.querySelector(".game-over");
var readyScreen = document.querySelector(".ready");



var isGameover = false;
// var level = 1;

startButton.addEventListener("click", startGame);

function startGame() {
//   document.getElementById("ready").style.display = "none"; // Hide the start page
//   startButton.style.display = "none";
  coverScreen.style.display = "none"; // Show the game content
  // Hide the start page
  gameContent.style.display = "block"; // Show the game content
  // You can also add initialization code here to start the game
  isMoving = true;
  playGame();

  if (startButton.innerText === "Try Again") {
    // initializeGame();
    location.reload();
  }
}

function restartGame() {
  // Reset game state (if needed)
  isMoving = true;
  isGameover = false;
  level = 1;
  document.getElementById("score").innerHTML = "0";
  document.getElementById("level").innerHTML = "0";

  // Hide the game over screen and show the game content
  document.getElementById("game-over").style.display = "none";
  document.getElementById("game-content").style.display = "block";

  // Restart the game logic (if needed)
  playGame();
}

// inisialisasi fungsi
function playGame() {
  function setBackgroundMoving() {
    if (isMoving) {
      setTimeout(function () {
        // bg berjalan
        bg.style.backgroundPosition =
          parseInt(bg.style.backgroundPosition.replace("px", "")) - 1 + "px";

        // update live score
        if (!isGameover) {
          var currentScore = parseInt(scoreElement.innerHTML);
          scoreElement.innerHTML = currentScore + 1;

          // Check if the score is above 3000 and update the level
          if (currentScore % 3000 == 0) {
            var currentLevel = parseInt(levelElement.innerHTML);
            levelElement.innerHTML = currentLevel + 1;
            // scoreElement.innerHTML = currentScore + " (Level " + level + ")";
          }
        }

        var delay = Math.max(1, 5 - level);

        // Call the function recursively with the new delay
        setTimeout(setBackgroundMoving, delay);
      }, 5);
    }
  }

  setBackgroundMoving();

  function setBoxMoving() {
    var dinoCanvas = document.getElementById("dinoCanvas");
    var boxCanvas = document.getElementById("boxCanvas");
    setTimeout(function () {
      if (!isGameover) {
        boxCanvas.style.marginLeft =
          parseInt(boxCanvas.style.marginLeft.replace("px", "")) - 1 + "px";

        if (parseInt(boxCanvas.style.marginLeft.replace("px", "")) < -100) {
          boxCanvas.style.marginLeft = "600px";
        }

        if (
          dinoCanvas.offsetTop + 50 >= boxCanvas.offsetTop &&
          dinoCanvas.offsetLeft + 50 >= boxCanvas.offsetLeft &&
          dinoCanvas.offsetTop + 50 <= boxCanvas.offsetTop + 50 &&
          dinoCanvas.offsetLeft <= boxCanvas.offsetLeft + 50
        ) {
          gameOver();
        } else {
          // terus berjalan
          setBoxMoving();
        }
      }

      // Call the function recursively with the new delay
      setTimeout(setBackgroundMoving, delay);
    }, 5 - level);
  }

  // inisialisasi kotak
  setBoxMoving();

  function handleJump() {
    if (!isGameover && !isJumping) {
      // menghindari melompat setelah permainan berakhir atau sedang melompat
      isJumping = true; // set status lompat
      // setting loncat
      dinoCanvas.style.marginTop = "30px";
      dinoCanvas.setAttribute("class", "freeze");

      // setting kembali ke posisi semula
      setTimeout(function () {
        dinoCanvas.style.marginTop = "200px";
        isJumping = false; // reset status lompat
        dinoCanvas.setAttribute("class", "");
      }, 1000);
    }
  }

  // Menambah event listener untuk klik tombol space dan panah atas
  window.addEventListener("keyup", function (e) {
    if (e.keyCode == 32 || e.keyCode == 38) {
      handleJump();
    }
    // } else if (e.keyCode == 39) {
    //   isShieldActive = !isShieldActive;
    //   drawShield();
    // }
  });

  // Menambah event listener untuk klik mouse di seluruh dokumen
  document.addEventListener("click", function (e) {
    handleJump();
  });

  function gameOver() {
    alert("Game Over, Your Score: " + scoreElement.innerHTML);
    coverScreen.style.display="block";
    gameContent.style.display="none";
    gameOverScreen.style.display="block";
    // result.style.display="block";
    readyScreen.style.display="none";
    result.innerText = `Your Score: ${scoreElement.innerHTML}`;
    startButton.innerText = "Try Again";
    dinoCanvas.setAttribute("class", "freeze");
    isMoving = false;
    isGameover = true;
    
  }
}
