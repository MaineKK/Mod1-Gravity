class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext("2d");

    this.drawIntervalId = undefined;
    this.fps = 60;

    this.background = new Background(this.ctx);
    this.newton = new Newton(this.ctx, 0, 450);
    this.apples = [];
    this.coin = new Coin(this.ctx, 0, this.canvas.height - 50);
    
    
    this.generateApples();
    this.generateCoin();
    this.coinCount = -1;
    
    this.coinSound = new Audio("assets/audio/coin-sound.mp3");
    this.gameOverSound = new Audio("assets/audio/gameover.mp3");

    
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
      const vy = Math.random() * (5 - 2) + 2; // Velocidad vertical aleatoria entre 2 y 5

      const apple = new Apple(this.ctx, x, y, vy);
      this.apples.push(apple);
    }, 2000); // Intervalo de tiempo en milisegundos (2000 ms = 2 segundos)
  }
  generateCoin() {
    setInterval(() => {
      const x = Math.random() * (this.canvas.width - 50); 
      const y = this.canvas.height - 50; 

      this.coin = new Coin(this.ctx, x, y);
    }, 5000); 
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
        this.playGameOverSound();
        this.stop();
        alert("Game Over");
        
      }
    }

    if (
      this.coin.x < this.newton.x + this.newton.w &&
      this.coin.x + this.coin.w > this.newton.x &&
      this.coin.y < this.newton.y + this.newton.h &&
      this.coin.y + this.coin.h > this.newton.y &&
      this.coin.visible
    ) {
      this.coinCount++;

      if (this.coinCount === 15) {
        this.stop();
        alert("You Win!");
      }

      this.coin.visible = false;
      this.playCoinSound();
    }
  }
  playCoinSound() {
    this.coinSound.currentTime = 1;
    this.coinSound.play();
  }

  playGameOverSound() {
    this.gameOverSound.currentTime = 0;
    this.gameOverSound.play();
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
    this.coin.draw();
    this.drawCoinCount();
  }

  drawCoinCount() {
    this.ctx.font = "20px Arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(`Coins: ${this.coinCount}`, 10, 30);
  }
}