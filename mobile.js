let highestZ = 1;

class MobilePaper {
  constructor(paper) {
    this.paper = paper;
    this.startX = 0;
    this.startY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.holding = false;

    this.init();
  }

  init() {
    // Touchstart: Start dragging
    this.paper.addEventListener('touchstart', (e) => this.onTouchStart(e), { passive: false });

    // Touchmove: Continue dragging
    this.paper.addEventListener('touchmove', (e) => this.onTouchMove(e), { passive: false });

    // Touchend: Stop dragging
    this.paper.addEventListener('touchend', () => this.onTouchEnd());
  }

  onTouchStart(e) {
    e.preventDefault(); // Prevent scrolling
    const touch = e.touches[0];

    this.holding = true;
    this.startX = touch.clientX - this.offsetX;
    this.startY = touch.clientY - this.offsetY;

    // Raise z-index
    this.paper.style.zIndex = ++highestZ;
  }

  onTouchMove(e) {
    if (!this.holding) return;

    e.preventDefault(); // Prevent scrolling
    const touch = e.touches[0];

    this.currentX = touch.clientX - this.startX;
    this.currentY = touch.clientY - this.startY;

    // Update position
    this.offsetX = this.currentX;
    this.offsetY = this.currentY;

    this.paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotateZ(${this.rotation}deg)`;
  }

  onTouchEnd() {
    this.holding = false;
  }
}

// Apply the MobilePaper functionality to all elements with the class "paper"
document.querySelectorAll('.paper').forEach((paper) => new MobilePaper(paper));
