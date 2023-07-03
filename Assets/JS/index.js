const canvasId = "main-canvas";
const canvas = document.getElementById(canvasId);

const game = new Game(canvasId);

window.addEventListener("keydown", (event) => {
    game.onKeyDown(event);
   });
  
window.addEventListener("keyup", (event) => {
    game.onKeyUp(event);
  });

game.start();
