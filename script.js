document.addEventListener("DOMContentLoaded", function () {
    const columns = document.querySelectorAll(".col");
    const startButton = document.getElementById("startButton");
    const normalModeButton = document.getElementById("normalModeButton");
    const nightmareModeButton = document.getElementById("nightmareModeButton");
    const modeButtons = [normalModeButton, nightmareModeButton];

    let sequence = [];
    let playerIndex = 0;
    let currentLevel = 1;
    let lives = 1; // Change this to 3 after unlocking

    startButton.addEventListener("click", startGame);

    function startGame() {
        resetGame();
        generateRandomSequence();
        playSequence();
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
        const randomIndices = [];
        const squaresToClick = currentLevel + 2; // Adjust the number of squares to click
        while (randomIndices.length < squaresToClick) {
            const randomIndex = Math.floor(Math.random() * columns.length);
            if (!randomIndices.includes(randomIndex)) {
                randomIndices.push(randomIndex);
                sequence.push(randomIndex);
            }
        }
    }

    function playSequence() {
        let index = 0;
        const interval = setInterval(() => {
            const columnIndex = sequence[index];
            columns[columnIndex].classList.add("glow");
            setTimeout(() => {
                columns[columnIndex].classList.remove("glow");
                index++;
                if (index === sequence.length) {
                    clearInterval(interval);
                    allowPlayerInput();
                }
            }, 500); // Adjust the duration as needed
        }, 1000); // Adjust the interval as needed
    }

    function allowPlayerInput() {
        columns.forEach(col => col.addEventListener("click", handleClick));
    }

    function handleClick() {
        const clickedIndex = Array.from(columns).indexOf(this);
        if (clickedIndex === sequence[playerIndex]) {
            this.classList.add("glow");
            playerIndex++;
            if (playerIndex === sequence.length) {
                console.log("resetted");
                setTimeout(startGame, 1000);
                
            }
        } else {
            this.classList.add("error");
            setTimeout(() => {
                resetGame();
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
