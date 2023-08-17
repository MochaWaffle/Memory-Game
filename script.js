export let gameMode;
export let currentLevel;
export let gameWon;
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
    const winLevel = 10;
    const sounds = [
        document.getElementById("jumpscareSound"),
        document.getElementById("heartDamage"),
        document.getElementById("levelPass"),
        document.getElementById("nightmareGameplay"),
        document.getElementById("normalModeGameplay"),

    ]
    const hearts = [
        document.getElementById("heart1"),
        document.getElementById("heart2"),
        document.getElementById("heart3")
    ];
    const heartTypes = [
        document.getElementById("heartType1"),
        document.getElementById("heartType2"),
        document.getElementById("heartType3")
    ]
    let sequence = [];
    let playerIndex = 0;
    let livesUnlocked = 2;
    let lives = 1 + livesUnlocked; // Change this to 3 after unlocking
    let gameEnd = false;
    let playerTurn = true;
    let tileGlowLength = 1000;
    let nextGlowDelay = 1000;
    var boxShadowDefaultValue = "rgba(0, 0, 0, 0.25) 0px 54px 55px, " +
    "rgba(0, 0, 0, 0.12) 0px -12px 30px, " +
    "rgba(0, 0, 0, 0.12) 0px 4px 6px, " +
    "rgba(0, 0, 0, 0.17) 0px 12px 13px, " +
    "rgba(0, 0, 0, 0.09) 0px -3px 5px";
    var boxShadowGlowNormalValue = "0 0 7px #fff, \
    0 0 10px #fff, \
    0 0 21px #fff, \
    0 0 42px #0fa, \
    0 0 82px #0fa, \
    0 0 92px #0fa, \
    0 0 102px #0fa, \
    0 0 151px #0fa";
    var boxShadowGlowNightmareValue = "0 0 7px #fff, \
    0 0 10px #fff, \
    0 0 21px #fff, \
    0 0 42px #F72119, \
    0 0 82px #F72119, \
    0 0 92px #F72119, \
    0 0 102px #F72119, \
    0 0 151px #F72119";
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
        localStorage.setItem('gameMode', gameMode.toString());
    }
    function saveLevelToStorage(){
        localStorage.setItem('level', currentLevel.toString())
    }
    function saveGameWon(won)
    {
        gameWon = won;
        localStorage.setItem('gameWon', gameWon.toString());
    }

    gameModeBtn.addEventListener("click", function() {
        if (playerTurn == true)
        {
            if (gameMode == "Normal") {
                nightmareMode();
            } else {
                normalMode();                
            }
            startButton.textContent = "Start";
            startColorSwitchToWarning(false);
            resetGame();
        }
        saveGameModeToStorage();
        
    })

    function startGame() {
        resetGame();
        generateRandomSequence();
        playSequence();
        startButton.textContent = "Reset";
        startColorSwitchToWarning(true);
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
            columns.forEach(col => col.style.boxShadow = boxShadowDefaultValue );
            columns[columnIndex].classList.add("glow");

            if (gameMode === "Normal") {
                columns[columnIndex].style.boxShadow = boxShadowGlowNormalValue;
                playSound(4);
            } else {
                columns[columnIndex].style.boxShadow = boxShadowGlowNightmareValue;
                playSound(3);
            }
        
            setTimeout(() => {
                columns[columnIndex].classList.remove("glow");
                columns[columnIndex].style.boxShadow = boxShadowDefaultValue;
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
            
            if (gameMode === "Normal") 
            {
                this.style.boxShadow = boxShadowGlowNormalValue;
                playSound(4);
                
            } else {
                this.style.boxShadow = boxShadowGlowNightmareValue;
                playSound(3);
            }
            
            setTimeout(() => {
                this.classList.remove("glow"); // Remove the glow after a short delay
                this.style.boxShadow = boxShadowDefaultValue;
                playerIndex++;
                if (playerIndex === sequence.length) {
                    currentLevel++;
                    if (currentLevel > winLevel) {
                        // Player wins!
                        gameEnd = true;
                        gameOverWon();

                    } else {
                        playSound(2);
                        startGame();
                    }
                }
            }, 100); // Adjust the delay as needed
        } else {
            gameEnd = true; // Block further input
            this.classList.add("error");
            if (gameMode === "Normal")
            {
                this.style.boxShadow = boxShadowGlowNormalValue;
            } else {
                this.style.boxShadow = boxShadowGlowNightmareValue;
            }
            setTimeout(() => {
                if (lives > 1) {
                    takeDamage();
                } else {
                    gameOver();
                }
            }, 1000);
        }
    }
    function nightmareMode(){
        gameMode = "Nightmare";
        gameModeBtn.textContent = "Nightmare";
        gameModeBtn.classList.remove("btn-info");
        gameModeBtn.classList.add("btn-danger");
        levelText.textContent = "Nightmare";
        levelText.style.color = "Red";
        levelText.style.textShadow = "2px 2px 5px red";
        tileGlowLength = 300;
        nextGlowDelay = 300;
        lives = 1;
        playSound(0);

        for (let i = 1; i < lives + livesUnlocked; i++){
            hearts[i].style.display = "none";
        }

        bodyElement.style.backgroundImage = `url(${backgroundImages[1]})`
    }
    
    function normalMode(){
        gameMode = "Normal";
        gameModeBtn.textContent = "Normal";
        gameModeBtn.classList.remove("btn-danger");
        gameModeBtn.classList.add("btn-info");
        levelText.textContent = "NORMAL MODE";
        levelText.style.color = "Black";
        levelText.style.textShadow = "2px 2px 5px greenyellow";
        tileGlowLength = 1000;
        nextGlowDelay = 1000;
        lives = 1 + livesUnlocked;
        for (let i = 0; i < lives; i++)
        {
            hearts[i].style.display = "inline";
            heartTypes[i].src = "images/heart.png";
        }
        bodyElement.style.backgroundImage = `url(${backgroundImages[0]})`
    }
    function gameOver(){
        heartTypes[0].src = "images/heartDamaged.png";
        playSound(1);
        saveGameWon(false);
        
        setTimeout(() => {
            alert("Game over! You ran out of lives.");
            saveLevelToStorage();
            window.location.href = "gameOver.html";
        },500);
    }
    function gameOverWon(){
        saveGameWon(true);
        
        setTimeout(() => {
            alert("Congratulations! You won!");
            saveLevelToStorage();
            window.location.href = "gameOver.html";
        },500);
    }
    function startColorSwitchToWarning(switchBoolean){
        if (switchBoolean == true) {
            startButton.classList.remove("btn-primary");
            startButton.classList.add("btn-warning");
        } else {
            startButton.classList.remove("btn-warning");
            startButton.classList.add("btn-primary");
        }
    }
    function playSound(index){
        sounds[index].currentTime = 0;
        sounds[index].play();
    }
    function takeDamage()
    {
        playSound(1);
        lives--;
        heartTypes[lives].src = "images/heartDamaged.png"
        resetGame();
        startGame();
        gameEnd = false;
    }
    function glowTile(glowColor)
    {

    }

});