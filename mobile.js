class OneFingerDrag {
  constructor(element) {
    this.element = element;
    this.startX = 0; // Starting X position
    this.startY = 0; // Starting Y position
    this.offsetX = 0; // Offset X for transform
    this.offsetY = 0; // Offset Y for transform
    this.isDragging = false; // Dragging state

    this.init();
  }

  init() {
    // Touch start: Initiates the drag
    this.element.addEventListener("touchstart", (e) => this.onTouchStart(e), { passive: false });

    // Touch move: Handles the drag movement
    this.element.addEventListener("touchmove", (e) => this.onTouchMove(e), { passive: false });

    // Touch end: Stops the drag
    this.element.addEventListener("touchend", () => this.onTouchEnd());

    // Touch cancel: Handles interruptions (e.g., notifications)
    this.element.addEventListener("touchcancel", () => this.onTouchEnd());
  }

  onTouchStart(e) {
    e.preventDefault(); // Prevent default scrolling behavior
    const touch = e.touches[0]; // Get the first touch point

    // Save the initial touch point and offset
    this.startX = touch.clientX - this.offsetX;
    this.startY = touch.clientY - this.offsetY;

    this.isDragging = true; // Set dragging state
  }

  onTouchMove(e) {
    if (!this.isDragging) return;

    e.preventDefault(); // Prevent scrolling during the drag
    const touch = e.touches[0]; // Get the first touch point

    // Calculate the new position
    const newX = touch.clientX - this.startX;
    const newY = touch.clientY - this.startY;

    // Update the offsets
    this.offsetX = newX;
    this.offsetY = newY;

    // Apply the translation to the element
    this.element.style.transform = `translate(${newX}px, ${newY}px)`;
  }

  onTouchEnd() {
    this.isDragging = false; // Reset dragging state
  }
}

// Apply the drag functionality to all elements with the class "paper"
document.querySelectorAll(".paper").forEach((paper) => new OneFingerDrag(paper));
