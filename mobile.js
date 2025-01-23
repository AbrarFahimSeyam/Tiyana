class OneFingerDrag {
  constructor(element) {
    this.element = element;
    this.startX = 0;
    this.startY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.isDragging = false;

    this.init();
  }

  init() {
    this.element.addEventListener("touchstart", (e) => this.onTouchStart(e), { passive: false });
    this.element.addEventListener("touchmove", (e) => this.onTouchMove(e), { passive: false });
    this.element.addEventListener("touchend", () => this.onTouchEnd());
    this.element.addEventListener("touchcancel", () => this.onTouchEnd());
  }

  onTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    this.startX = touch.clientX - this.offsetX;
    this.startY = touch.clientY - this.offsetY;
    this.isDragging = true;
  }

  onTouchMove(e) {
    if (!this.isDragging) return;
    e.preventDefault();
    const touch = e.touches[0];
    this.offsetX = touch.clientX - this.startX;
    this.offsetY = touch.clientY - this.startY;
    this.element.style.transform = `translate(${this.offsetX}px, ${this.offsetY}px)`;
  }

  onTouchEnd() {
    this.isDragging = false;
  }
}

// Enable dragging for all `.paper` elements
document.querySelectorAll(".paper").forEach((paper) => new OneFingerDrag(paper));
