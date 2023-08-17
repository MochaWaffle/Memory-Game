// import { currentLevel, gameModeBtn } from "./script.js";
// import { gameMode } from "./script.js";

function handleDOMContentLoaded() {
    const bodyElement = document.body;
    const storedGameMode = localStorage.getItem('gameMode');
    const storedLevel = localStorage.getItem('level');
    const storedGameWon = localStorage.getItem('gameWon');
    const gameOverSound = document.getElementById("gameOver");
    const jumpscareSound = document.getElementById("jumpscareSound");
    const gameWonSound_Normal = document.getElementById('gameWonSound-Normal');
    const gameWonSound_Nightmare = document.getElementById('gameWonSound-Nightmare');
    let title = document.getElementById("title");
    let highscore = document.getElementById("highscore");
    let gamemode = document.getElementById("gamemode");
    let gamemodeTitle = document.getElementById("gamemodeTitle");
    let highscoreLevel = document.getElementById('highscoreLevel');
    console.log(storedGameWon);

    if (storedGameWon === "true")
    {
        title.textContent = 'YOU WON!';
    } else {
        title.textContent = 'GAME OVER!';
    }

    if (storedGameMode === "Normal")
    {
        bodyElement.style.backgroundColor = '';
        gamemode.style.color = 'blue';
        title.style.color = 'white';
        playAnimation();
    } else
    {
        if (storedGameWon === "false")
        {
            console.log("should work");
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
        } else {
            bodyElement.style.backgroundColor = 'transparent';
            bodyElement.style.backgroundImage = `url('images/blood-wall.jpeg')`;
            title.style.color = 'lightgreen'
            gamemode.style.color = 'red';
            playAnimation();
        }

        
        
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

        if (storedGameWon === "true"){
            highscoreLevel.textContent = storedLevel - 1;
        } else {
            highscoreLevel.textContent = storedLevel;
        }
        
        gamemode.textContent = storedGameMode;
        if (storedGameWon === "true")
        {
            if (storedGameMode === "Normal"){
                playSound(gameWonSound_Normal);
            } else {
                playSound(gameWonSound_Nightmare);
            }
        } else {
            playSound(gameOverSound);
        }
    }

    function playSound(sound){
        sound.currentTime = 0;
        sound.play();
    }
}

document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
