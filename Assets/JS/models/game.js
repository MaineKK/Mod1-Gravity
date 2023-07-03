class Game {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      this.ctx = this.canvas.getContext("2d");
  
      this.drawIntervalId = undefined;
      this.fps = 60;
  
      this.background = new Background(this.ctx);
      this.newton = new Newton(this.ctx, 0, 450);
      this.apple = this.createApples();
    }
  
    onKeyDown(event) {
      this.newton.onKeyDown(event);
      this.newton.startAnimation();
    }
    
    onKeyUp(event) {
      this.newton.onKeyUp(event);
      this.newton.stopAnimation();
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
      this.checkCollision();
   }
   createApples() {
    const apples = [];
    setInterval(() => {
      const x = Math.floor(Math.random() * (this.canvas.width - 50));
      const y = -50; // Comienza en una posición por encima del canvas
      const vy = Math.floor(Math.random() * 5) + 3; // Velocidad vertical aleatoria
      const apple = new Apple(this.ctx, x, y, vy);
      apples.push(apple);
    }, 1000); // Intervalo de tiempo en milisegundos (1000 ms = 1 segundo)
    return apples;
  }
  

  checkCollision() {
    this.apple.forEach((apple) => {
      if (
        apple.isVisible &&
        this.newton.x < apple.x + apple.width &&
        this.newton.x + this.newton.width > apple.x &&
        this.newton.y < apple.y + apple.height &&
        this.newton.y + this.newton.height > apple.y
      ) {
        this.gameOver();
      }
    });
  }
    
   
    moveApples() {
      this.apple.forEach((apple) => {
        apple.y += apple.vy;
      });
    }
    
  
    drawApples() {
      this.apple.forEach((apple) => {
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
  