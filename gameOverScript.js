// import { currentLevel, gameModeBtn } from "./script.js";
// import { gameMode } from "./script.js";

function handleDOMContentLoaded() {
    const bodyElement = document.body;
    const storedGameMode = localStorage.getItem('gameMode');
    const storedLevel = localStorage.getItem('level');
    const gameOverSound = document.getElementById("gameOver");
    const jumpscareSound = document.getElementById("jumpscareSound");
    let title = document.getElementById("title");
    let highscore = document.getElementById("highscore");
    let gamemode = document.getElementById("gamemode");
    let gamemodeTitle = document.getElementById("gamemodeTitle");
    let highscoreLevel = document.getElementById('highscoreLevel');
    if (storedGameMode === "Normal")
    {
        bodyElement.style.backgroundColor = '';
        gamemode.style.color = 'blue';
        title.style.color = 'white';
        playAnimation();
    } else
    {
        gamemodeTitle.style.display = 'none';
        highscore.style.display = 'none';
        bodyElement.style.backgroundImage = `url('images/scary-face.jpeg')`;
        jumpscareSound.currentTime = 0;
        jumpscareSound.play();

        setTimeout(() => {
            gamemodeTitle.style.display = 'inline';
            highscore.style.display = 'inline';
            bodyElement.style.backgroundColor = 'transparent';
            bodyElement.style.backgroundImage = `url('images/blood-wall.jpeg')`;
            title.style.color = 'red'
            gamemode.style.color = 'red';
            playAnimation();
        },1500);
        
    }

    function playAnimation()
    {
        document.body.classList.add("loaded");
        setTimeout(function () {
            var startButton = document.getElementById("startButton");
            startButton.style.opacity = "1"; // Make the button visible
            startButton.addEventListener("click", function() {
                // Redirect to the index.html page
                window.location.href = "index.html";
            });
        }, 1500); // Time it appears (in milliseconds)
        gamemodeTitle.style.color = 'white';
        highscore.style.color = 'white';
        highscoreLevel.style.color = 'blue';
        highscoreLevel.textContent = storedLevel;
        gamemode.textContent = storedGameMode;
        gameOverSound.currentTime = 0;
        gameOverSound.play();
    }
}

document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
