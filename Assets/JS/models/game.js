class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.drawIntervalId = undefined;
    this.fps = 60;

    this.background = new Background(this.ctx);
    this.newton = new Newton(this.ctx, 0, 450);
    this.apples = [];
    this.generateApples();
    this.start();
  }

  onKeyDown(event) {
    this.newton.onKeyDown(event);
  }

  onKeyUp(event) {
    this.newton.onKeyUp(event);
  }

  start() {
    if (!this.drawIntervalId) {
      this.drawIntervalId = setInterval(() => {
        this.clear();
        this.draw();
        this.move();
      }, 1000 / this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  move() {
    this.newton.move();
    this.moveApples();
    this.checkCollision();
  }

  generateApples() {
    setInterval(() => {
      const x = Math.random() * (this.canvas.width - 50); // Posición X aleatoria dentro del ancho del canvas
      const y = -50; // Posición inicial Y arriba del canvas
      const vy = Math.random() * (5 - 2) + 2; // Velocidad vertical aleatoria entre 2 y 5

      const apple = new Apple(this.ctx, x, y, vy);
      this.apples.push(apple);
    }, 2000); // Intervalo de tiempo en milisegundos (2000 ms = 2 segundos)
  }

  checkCollision() {
    this.apples.forEach((apple, index) => {
      if (apple.isVisible && this.newton.checkCollisionWithApple(apple)) {
        this.apples.splice(index, 1);
        this.gameOver();
      }
    });
  }
  

  gameOver() {
    this.stop();
    console.log("GAME OVER");
  }

  moveApples() {
    this.apples.forEach((apple) => {
      apple.update();
    });
  }

  drawApples() {
    this.apples.forEach((apple) => {
      apple.draw();
    });
  }

  draw() {
    this.clear();
    this.background.draw();
    this.drawApples();
    this.newton.draw();
  }
}

// Función para verificar la colisión entre dos objetos rectangulares
function checkRectCollision(rect1, rect2) {
  return (
    rect1.x < rect2.x + rect2.w &&
    rect1.x + rect1.w > rect2.x &&
    rect1.y < rect2.y + rect2.h &&
    rect1.y + rect1.h > rect2.y
  );
}
