 class Coin {
        constructor(ctx, canvasWidth, canvasHeight) {
          this.ctx = ctx;
          this.canvasWidth = canvasWidth;
          this.canvasHeight = canvasHeight;
          this.width = 40;
          this.height = 40;
          this.x = this.getRandomX();
          this.y = this.getRandomY();
          this.visible = true;
          this.collectedCount = 0;
      
          this.image = new Image();
          this.image.src = "assets/img/coin.png";
          this.image.onload = () => {
            this.image.isReady = true;
          };
        }
      
        getRandomX() {
          return Math.random() * (this.canvasWidth - this.width);
        }
      
        getRandomY() {
          return Math.random() * (this.canvasHeight - this.height);
        }
      
        update() {
          
        }
      
        draw() {
          if (this.visible && this.image.isReady) {
            this.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
          }
        }
      }

