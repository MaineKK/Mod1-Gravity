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
        this.move();
        this.draw();
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
  }
  generateApples() {
    setInterval(() => {
      const x = Math.random() * (this.canvas.width - 40); // Posición X aleatoria dentro del ancho del canvas
      const y = -40; // Posición inicial Y arriba del canvas
      const vy = Math.random() * (6 - 2) + 2; // Velocidad vertical aleatoria entre 2 y 5

      const apple = new Apple(this.ctx, x, y, vy);
      this.apples.push(apple);
    }, 1000); // Intervalo de tiempo en milisegundos (2000 ms = 2 segundos)
  }
  

  moveApples() {
    this.apples.forEach((apple) => {
      apple.update();
    });
    this.checkCollision();
  }

  checkCollision() {
    for (let i = 0; i < this.apples.length; i++) {
      const apple = this.apples[i];
      if (
        apple.x < this.newton.x + this.newton.w &&
        apple.x + apple.w > this.newton.x &&
        apple.y < this.newton.y + this.newton.h &&
        apple.y + apple.h > this.newton.y
      ) {
        this.stop();
        alert("Game Over");
      }
    }
  }

  drawApples() {
    this.apples.forEach((apple) => {
      apple.draw();
    });
  }

  draw() {
    this.clear();
    this.background.draw();
    this.newton.draw(); 
    this.drawApples(); 
  }
}