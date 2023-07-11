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
    
    
    
    this.generateCoin();
    this.coinCount = -1;
    
    this.backgroundMusic = new Audio("assets/audio/backgroundsound.mp3");
    this.backgroundMusic.loop = true;

    this.coinSound = new Audio("assets/audio/coin-sound.mp3");
    this.gameOverSound = new Audio("assets/audio/gameover.mp3");
    this.winnerSound = new Audio("assets/audio/winner.mp3");

    
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
        this.backgroundMusic.play();
        this.move();
        this.draw();
      }, 1000 / this.fps);
    }
  }

  stop() {
    clearInterval(this.drawIntervalId);
    this.drawIntervalId = undefined;
    this.backgroundMusic.pause();
    this.backgroundMusic.currentTime = 0;
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
    const sectionWidth = this.canvas.width / 10; // Dividir el ancho del canvas en x secciones
    const sectionIndex = Math.floor(Math.random() * 10); // Generar un índice de sección aleatorio

    const x = (sectionIndex * sectionWidth) + (Math.random() * sectionWidth); // Generar coordenada X dentro de la sección
    const y = -40;
    const vy = Math.random() * (30 - 10) + 10; // Velocidad vertical aleatoria

      const apple = new Apple(this.ctx, x, y, vy);
      this.apples.push(apple);
    }, 1000); // Intervalo de tiempo en milisegundos (1000 ms = 1 segundos)
  }
  generateCoin() {
    setInterval(() => {
      const x = Math.random() * (this.canvas.width - 50); 
      const y = this.canvas.height - 50; 

      this.coin = new Coin(this.ctx, x, y);
    }, 3000); 
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
        this.showGameOverImage();
        
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

      if (this.coinCount === 8) {
        this.playWinnerSound();
        this.stop();
        this.showWinImage();
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

  playWinnerSound() {
    this.winnerSound.currentTime = 0;
    this.winnerSound.play();
  }

  showGameOverImage() {
    const gameOverImage = new Image();
    gameOverImage.src = "assets/img/gameover.png";
    gameOverImage.onload = () => {
      this.ctx.drawImage(
        gameOverImage,
        this.canvas.width / 2 - gameOverImage.width / 2,
        this.canvas.height / 2 - gameOverImage.height / 2
      );
    };
  }

  showWinImage() {
    const winImage = new Image();
    winImage.src = "assets/img/winner.png";
    winImage.onload = () => {
      this.ctx.drawImage(
        winImage,
        this.canvas.width / 2 - winImage.width / 2,
        this.canvas.height / 2 - winImage.height / 2
      );
    };
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