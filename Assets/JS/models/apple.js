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
      this.checkCollision();
    }
  
    checkCollisionWithNewton(newton) {
        if (
          this.isVisible &&
          this.x < newton.x + newton.width &&
          this.x + this.width > newton.x &&
          this.y < newton.y + newton.height &&
          this.y + this.height > newton.y
        ) {
          return true; // Hay una colisión
        }
        return false; // No hay colisión
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