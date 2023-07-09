class Apple {
  constructor(ctx, x, y, vy, apples, newton) {
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.vy = vy;
    
    this.w = Math.floor(40);
    this.h = Math.floor(50);
    this.vy = Math.floor(Math.random() * 3) + 1;
    this.apples = apples;
    this.newton = newton;

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
      this.ctx.drawImage(
        this.sprite,
        this.x,
        this.y,
        this.w,
        this.h
      );
    }
  }

}
