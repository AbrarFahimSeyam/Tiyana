class OneFingerDrag {
  constructor(element) {
    this.element = element;
    this.startX = 0;
    this.startY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.currentX = 0;
    this.currentY = 0;
    this.isDragging = false;

    this.init();
  }

  init() {
    // Touch start
    this.element.addEventListener("touchstart", (e) => this.onTouchStart(e), { passive: false });

    // Touch move
    this.element.addEventListener("touchmove", (e) => this.onTouchMove(e), { passive: false });

    // Touch end
    this.element.addEventListener("touchend", () => this.onTouchEnd());

    // Touch cancel (e.g., when interrupted by notifications)
    this.element.addEventListener("touchcancel", () => this.onTouchEnd());
  }

  onTouchStart(e) {
    e.preventDefault(); // Prevent scrolling during interaction
    const touch = e.touches[0];

    // Save the starting position
    this.startX = touch.clientX - this.offsetX;
    this.startY = touch.clientY - this.offsetY;

    this.isDragging = true;
  }

  onTouchMove(e) {
    if (!this.isDragging) return;

    e.preventDefault(); // Prevent scrolling during interaction
    const touch = e.touches[0];

    // Calculate the new position
    this.currentX = touch.clientX - this.startX;
    this.currentY = touch.clientY - this.startY;

    // Apply the translation
    this.offsetX = this.currentX;
    this.offsetY = this.currentY;

    this.element.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
  }

  onTouchEnd() {
    this.isDragging = false; // Stop dragging
  }
}

// Apply the OneFingerDrag functionality to all elements with the class "paper"
document.querySelectorAll(".paper").forEach((paper) => new OneFingerDrag(paper));
