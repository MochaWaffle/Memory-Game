document.addEventListener("DOMContentLoaded", function () {
    const columns = document.querySelectorAll(".col");
    const startButton = document.getElementById("startButton");
    const gameModeBtn = document.getElementById("gameMode");
    const normalModeButton = document.getElementById("normalModeButton");
    const nightmareModeButton = document.getElementById("nightmareModeButton");
    const modeButtons = [normalModeButton, nightmareModeButton];
    const levelText = document.getElementById("levelText");
    let sequence = [];
    let playerIndex = 0;
    let currentLevel = 1;
    let lives = 1; // Change this to 3 after unlocking
    let gameEnd = false;
    let playerTurn = true;
    let speed = 3;

    startButton.addEventListener("click", function () {
        if (startButton.textContent === "Start") {
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
    gameModeBtn.addEventListener("click", function() {
        if (playerTurn == true)
        {
            if (gameModeBtn.textContent == "Normal") {
                gameModeBtn.textContent = "Nightmare";
                gameModeBtn.classList.remove("btn-info");
                gameModeBtn.classList.add("btn-danger");
                levelText.textContent = "Nightmare";
                levelText.style.color = "Red";
                startButton.textContent = "Start";
                resetGame();
            } else {
                gameModeBtn.textContent = "Normal";
                gameModeBtn.classList.remove("btn-danger");
                gameModeBtn.classList.add("btn-info");
                levelText.textContent = "Normal";
                levelText.style.color = "Black";
                startButton.textContent = "Start";
                resetGame()
            }
        }
        
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
        console.log("shouldn't click");
        playerTurn = false;
        let index = 0;
        const interval = setInterval(() => {
            const columnIndex = sequence[index];
            columns.forEach(col => col.classList.remove("glow"));
            columns[columnIndex].classList.add("glow");
            setTimeout(() => {
                columns[columnIndex].classList.remove("glow");
                index++;
                if (index === sequence.length) {
                    clearInterval(interval);
                    setTimeout(() => {
                        playerTurn = true;
                        console.log("can click");
                        allowPlayerInput();
                    }, 500); // Add a delay before allowing player input
                }
            }, 500); // Adjust the interval as needed
        }, 1000); // Adjust the interval as needed
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
                    if (currentLevel > 5) {
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
                    currentLevel = 1;
                    startButton.textContent = "Start";
                    resetGame();
                    
                }
            }, 1000);
        }
    }

    // Handle mode buttons
    modeButtons.forEach(button => {
        button.addEventListener("click", function () {
            currentLevel = 1;
            startGame();
        });
    });
});
