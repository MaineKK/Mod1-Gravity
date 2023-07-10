const canvasId = "main-canvas";
const canvas = document.getElementById(canvasId);

const game = new Game(canvasId);


window.addEventListener("keydown", (event) => {
    game.onKeyDown(event);
   });
  
window.addEventListener("keyup", (event) => {
    game.onKeyUp(event);
  });

  const startButton = document.getElementById("start-button");
  startButton.addEventListener("click", () => {
    startButton.style.display = "none"; 
    game.start(); 
  });

