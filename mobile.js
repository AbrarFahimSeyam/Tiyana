let activeTouches = [];
let startMidPoint = { x: 0, y: 0 };
let currentTransform = { x: 0, y: 0 };

class TwoFingerDrag {
  constructor(element) {
    this.element = element;
    this.init();
  }

  init() {
    this.element.addEventListener("touchstart", (e) => this.onTouchStart(e), { passive: false });
    this.element.addEventListener("touchmove", (e) => this.onTouchMove(e), { passive: false });
    this.element.addEventListener("touchend", (e) => this.onTouchEnd(e), { passive: false });
    this.element.addEventListener("touchcancel", (e) => this.onTouchEnd(e), { passive: false });
  }

  onTouchStart(e) {
    e.preventDefault();
    Array.from(e.touches).forEach((touch) => {
      if (!activeTouches.some((t) => t.id === touch.identifier)) {
        activeTouches.push({
          id: touch.identifier,
          x: touch.clientX,
          y: touch.clientY,
        });
      }
    });

    if (activeTouches.length === 2) {
      startMidPoint = this.calculateMidPoint();
    }
  }

  onTouchMove(e) {
    e.preventDefault();
    if (activeTouches.length === 2) {
      Array.from(e.touches).forEach((touch) => {
        const index = activeTouches.findIndex((t) => t.id === touch.identifier);
        if (index > -1) {
          activeTouches[index].x = touch.clientX;
          activeTouches[index].y = touch.clientY;
        }
      });

      const newMidPoint = this.calculateMidPoint();
      const deltaX = newMidPoint.x - startMidPoint.x;
      const deltaY = newMidPoint.y - startMidPoint.y;

      currentTransform.x += deltaX;
      currentTransform.y += deltaY;

      this.element.style.transform = `translate(${currentTransform.x}px, ${currentTransform.y}px)`;
      startMidPoint = newMidPoint;
    }
  }

  onTouchEnd(e) {
    e.preventDefault();
    const remainingTouches = Array.from(e.touches);
    activeTouches = activeTouches.filter((t) =>
      remainingTouches.some((touch) => touch.identifier === t.id)
    );
  }

  calculateMidPoint() {
    if (activeTouches.length !== 2) return { x: 0, y: 0 };
    const [touch1, touch2] = activeTouches;
    return {
      x: (touch1.x + touch2.x) / 2,
      y: (touch1.y + touch2.y) / 2,
    };
  }
}

// Apply the TwoFingerDrag functionality to all elements with the class "paper"
document.querySelectorAll(".paper").forEach((paper) => new TwoFingerDrag(paper));
