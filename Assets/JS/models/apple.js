class Apple {
    constructor(ctx, x, y) {
      this.ctx = ctx;
      this.x = x;
      this.y = y;
      this.w = 50;
      this.h = 50;
      this.vy = Math.floor(Math.random() * 5) + 3;// Velocidad vertical aleatoria
  
      this.sprite = new Image();
      this.sprite.src = "assets/img/apple.png";
      this.sprite.onload = () => {
        this.sprite.isReady = true;
      };
    }
  
    update() {
      this.y += this.vy;
    }
  
  
    draw() {
      if (this.sprite.isReady) {
        this.ctx.drawImage(this.sprite, this.x, this.y, this.w, this.h);
      }
    }

    gameOver() {
        console.log("GAME OVER");
    }
  }