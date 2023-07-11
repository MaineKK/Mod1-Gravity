class Newton {
  constructor(ctx, x, y) {
      this.ctx = ctx;

      this.y0 = y;

      this.x = x;
      this.y = y;
      this.w = Math.floor(120 / 2);
      this.h = Math.floor(200/ 2);
      this.h0 = this.h;

      this.vx = 0;
      this.vy = 0;
      this.ay = NEWTON_AY;

      this.sprite = new Image ();
      this.sprite.src ="assets/img/newton1.png";
      this.sprite.verticalFrames = 1;
      this.sprite.verticalFrameIndex = 0;
      this.sprite.horizontalFrames = 1;
      this.sprite.horizontalFrameIndex = 0;

      this.sprite.onload = () => {
          this.sprite.isReady = true;
          this.sprite.frameWidth = Math.floor(
              this.sprite.width / this.sprite.horizontalFrames);
          this.sprite.frameHeight = Math.floor(
            this.sprite.height / this.sprite.verticalFrames);
        };
      //this.animationTick = 0; DESACTIVADO
    
      this.gameOver = false;
    }

 onKeyDown(event) {
      switch (event.keyCode) {
          case KEY_DOWN:
              this.vy = NEWTON_SPEED; 
              break;
          case KEY_LEFT:
              this.vx = -NEWTON_SPEED;
              break;
          case KEY_RIGHT:
              this.vx = NEWTON_SPEED;
              break;
      }
  }
  
  
 onKeyUp(event) {
  switch (event.keyCode) {
      case KEY_DOWN:
          this.vy = 0; 
          break;
      case KEY_LEFT:
      case KEY_RIGHT:
          this.vx = 0;
          break;
    }
  }

  
  move() {
      this.x += this.vx;
      this.y += this.vy;
    
      if (this.x < 0) {
        this.x = 0;
      } else if (this.x + this.w > this.ctx.canvas.width) {
        this.x = this.ctx.canvas.width - this.w;
      }
    
      if (this.y < 0) {
        this.y = 0;
      } else if (this.y + this.h > this.ctx.canvas.height) {
        this.y = this.ctx.canvas.height - this.h;
      }
    }
    
  draw() {
      if (this.sprite.isReady) {
        this.ctx.drawImage(
          this.sprite,
          this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
          this.sprite.verticalFrameIndex * this.sprite.frameHeight,
          this.sprite.frameWidth,
          this.sprite.frameHeight,
          this.x,
          this.y,
          this.w,
          this.h
        );

        //this.animate();
      }
  }
  //Desactivo la animación del personaje porque no me gusta visualmente y causa problemas con el choque de manzanas.

  /*animate() {
      this.animationTick++;
  
      if (this.animationTick > 10) {
          this.animationTick = 0;
          this.sprite.horizontalFrameIndex++;
          
          if (this.sprite.horizontalFrameIndex > this.sprite.horizontalFrames - 1) {
              this.sprite.horizontalFrameIndex = 0;
          }
      }
  }*/
  
}