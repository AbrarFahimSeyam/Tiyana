let highestZ = 1;

class Paper {
  constructor() {
    this.holdingPaper = false;
    this.mouseTouchX = 0;
    this.mouseTouchY = 0;
    this.mouseX = 0;
    this.mouseY = 0;
    this.prevMouseX = 0;
    this.prevMouseY = 0;
    this.velX = 0;
    this.velY = 0;
    this.rotation = Math.random() * 30 - 15; // Random initial rotation
    this.currentPaperX = 0;
    this.currentPaperY = 0;
    this.rotating = false;
  }

  init(paper) {
    // Update the position and rotation on move
    const onMove = (x, y) => {
      if (!this.rotating) {
        this.mouseX = x;
        this.mouseY = y;

        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }

      const dirX = x - this.mouseTouchX;
      const dirY = y - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = (360 + Math.round((180 * angle) / Math.PI)) % 360;

      if (this.rotating) {
        this.rotation = degrees;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        // Apply translation and rotation
        paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotate(${this.rotation}deg)`;
      }
    };

    // Handle mouse or touch start events
    const onStart = (x, y, isRightClick = false) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      this.mouseTouchX = x;
      this.mouseTouchY = y;
      this.prevMouseX = x;
      this.prevMouseY = y;

      if (isRightClick) {
        this.rotating = true;
      }
    };

    // Handle mouse move
    document.addEventListener("mousemove", (e) => {
      onMove(e.clientX, e.clientY);
    });

    // Handle touch move
    document.addEventListener(
      "touchmove",
      (e) => {
        const touch = e.touches[0];
        onMove(touch.clientX, touch.clientY);
      },
      { passive: false }
    );

    // Handle mouse down
    paper.addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        onStart(e.clientX, e.clientY);
      } else if (e.button === 2) {
        onStart(e.clientX, e.clientY, true);
      }
    });

    // Handle touch start
    paper.addEventListener(
      "touchstart",
      (e) => {
        const touch = e.touches[0];
        onStart(touch.clientX, touch.clientY);
      },
      { passive: false }
    );

    // Handle mouse up and touch end
    const onEnd = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };
    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);
  }
}

// Apply the drag-and-rotate functionality to all `.paper` elements
document.querySelectorAll(".paper").forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
