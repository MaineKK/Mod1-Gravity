 class Coin {
        constructor(ctx, x, y) {
          this.ctx = ctx;
          this.x = x;
          this.y = y;
          this.w = Math.floor(50);
          this.h = Math.floor(50);
      
          this.sprite = new Image();
          this.sprite.src = "assets/img/coin.png";
          this.sprite.onload = () => {
            this.sprite.isReady = true;
          };
          this.visible = true;
        }

      
        draw() {
          if (this.visible && this.sprite.isReady) {
            this.ctx.drawImage(
            this.sprite, 
            this.x,
            this.y,
            this.w,
            this.h);
          }
        }
      }

