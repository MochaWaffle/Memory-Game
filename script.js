// window.currentLevel = 1;
// console.log(currentLevel)
// window.gameModeBtn = document.getElementById("gameMode");
// window.gameModeBtn.textContent = "Normal";
// console.log(window.gameModeBtn.textContent);
export let gameMode;
export let currentLevel;
document.addEventListener("DOMContentLoaded", function () {
    const bodyElement = document.body;
    const backgroundImages = [
        "images/nature.jpeg",
        "images/blood-wall.jpeg",
        "images/scary-face.jpeg"
    ]
    const columns = document.querySelectorAll(".col");
    const startButton = document.getElementById("startButton");
    const gameModeBtn = document.getElementById("gameMode");
    const levelText = document.getElementById("levelText");
    let sequence = [];
    let playerIndex = 0;
    // let currentLevel = 1;
    let livesUnlocked = 0;
    let lives = 1 + livesUnlocked; // Change this to 3 after unlocking
    let gameEnd = false;
    let playerTurn = true;
    let tileGlowLength = 1000;
    let nextGlowDelay = 1000;
    // let gameMode = "Normal";
    gameMode = "Normal";
    currentLevel = 1;

    startButton.addEventListener("click", function () {
        if (startButton.textContent === "Start") {
            if (gameModeBtn.textContent === "Normal"){
                gameMode = "Normal";
                saveGameModeToStorage();
            }
            currentLevel = 1;
            resetGame();
            startGame();
        }
        else {
            if (playerTurn == true) {
                currentLevel = 1;
                startGame();
            }
            
        }
    });
    function saveGameModeToStorage() {
        localStorage.setItem('gameMode', gameMode);
    }
    function saveLevelToStorage(){
        localStorage.setItem('level', currentLevel)
    }
    gameModeBtn.addEventListener("click", function() {
        if (playerTurn == true)
        {
            if (gameMode == "Normal") {
                gameMode = "Nightmare";
                gameModeBtn.textContent = "Nightmare";
                gameModeBtn.classList.remove("btn-info");
                gameModeBtn.classList.add("btn-danger");
                levelText.textContent = "Nightmare";
                levelText.style.color = "Red";
                startButton.textContent = "Start";
                nightmareMode();
                resetGame();
                
            } else {
                gameMode = "Normal";
                gameModeBtn.textContent = "Normal";
                gameModeBtn.classList.remove("btn-danger");
                gameModeBtn.classList.add("btn-info");
                levelText.textContent = "Normal";
                levelText.style.color = "Black";
                startButton.textContent = "Start";
                normalMode();
                resetGame();
                
            }
        }
        saveGameModeToStorage();
        
    })
    function startGame() {
        resetGame();
        generateRandomSequence();
        playSequence();
        startButton.textContent = "Reset";
        levelText.textContent = "Level " + currentLevel;
    }

    function resetGame() {
        sequence.length = 0;
        playerIndex = 0;
        columns.forEach(col => {
            col.classList.remove("glow", "error");
            col.removeEventListener("click", handleClick);
        });
    }

    function generateRandomSequence() {
        const squaresToClick = currentLevel + 2; // Adjust the number of squares to click
        for (let i = 0; i < squaresToClick; i++) {
            const randomIndex = Math.floor(Math.random() * columns.length);
            sequence.push(randomIndex);
        }
    }

    function playSequence() {
        playerTurn = false;
        let index = 0;
        
        function animateTile() {
            const columnIndex = sequence[index];
            columns.forEach(col => col.classList.remove("glow"));
            columns[columnIndex].classList.add("glow");
            setTimeout(() => {
                columns[columnIndex].classList.remove("glow");
                index++;
                if (index === sequence.length) {
                    setTimeout(() => {
                        playerTurn = true;
                        allowPlayerInput();
                    }, 500);
                } else {
                    setTimeout(animateTile, nextGlowDelay); // Use nextGlowDelay here
                }
            }, tileGlowLength);
        }
        
        animateTile();
    }
    

    function allowPlayerInput() {
        gameEnd = false; // Allow player input
        columns.forEach(col => col.addEventListener("click", handleClick));
    }

    function handleClick() {
        if (gameEnd) return; // Prevent clicking when game has ended
        const clickedIndex = Array.from(columns).indexOf(this);
        if (clickedIndex === sequence[playerIndex]) {
            this.classList.add("glow"); // Add glow on correct click
            setTimeout(() => {
                this.classList.remove("glow"); // Remove the glow after a short delay
                playerIndex++;
                if (playerIndex === sequence.length) {
                    currentLevel++;
                    if (currentLevel > 10) {
                        // Player wins!
                        alert("Congratulations! You won!");
                    } else {
                        startGame();
                    }
                }
            }, 300); // Adjust the delay as needed
        } else {
            gameEnd = true; // Block further input
            this.classList.add("error");
            setTimeout(() => {
                if (lives > 1) {
                    lives--;
                    resetGame();
                    gameEnd = false; // Allow player input after reset
                } else {
                    alert("Game over! You ran out of lives.");
                    // currentLevel = 1;
                    // startButton.textContent = "Start";
                    // resetGame();
                    saveLevelToStorage();
                    window.location.href = "gameOverNormal.html";
                    // console.log(currentLevel);
                }
            }, 1000);
        }
    }
    function nightmareMode(){
        tileGlowLength = 300;
        nextGlowDelay = 300;
        bodyElement.style.backgroundImage = `url(${backgroundImages[1]})`
    }
    
    function normalMode(){
        tileGlowLength = 1000;
        nextGlowDelay = 1000;
        lives = 1 + livesUnlocked;
        bodyElement.style.backgroundImage = `url(${backgroundImages[0]})`
    }
    function gameOver(){
        currentLevel = 1;
        startButton.textContent = "Start";
        resetGame();
    }

});

