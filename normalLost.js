// import { currentLevel, gameModeBtn } from "./script.js";
// import { gameMode } from "./script.js";

function handleDOMContentLoaded() {
    document.body.classList.add("loaded");
    const storedGameMode = localStorage.getItem('gameMode');
    const storedLevel = localStorage.getItem('level');
    setTimeout(function () {
        var startButton = document.getElementById("startButton");
        startButton.style.opacity = "1"; // Make the button visible
        startButton.addEventListener("click", function() {
            // Redirect to the index.html page
            window.location.href = "index.html";
        });
    }, 1500); // Time it appears (in milliseconds)
    
    let highscore = document.getElementById("highscore");
    let gamemode = document.getElementById("gamemode");
    // highscore.textContent = 'Highest Level: ' + currentLevel;
    // gamemode.textContent = 'Gamemode: ' + gameModeBtn.textContent;
    highscore.textContent = 'Highest Level: ' + storedLevel;
    gamemode.textContent = 'Gamemode: ' + storedGameMode;
}

document.addEventListener("DOMContentLoaded", handleDOMContentLoaded);
