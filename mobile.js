let highestZ = 1;

class MobilePaper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  offsetX = 0;
  offsetY = 0;
  rotation = Math.random() * 30 - 15;

  init(paper) {
    paper.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      this.holdingPaper = true;

      // Record initial positions
      this.startX = touch.clientX - this.offsetX;
      this.startY = touch.clientY - this.offsetY;

      // Raise paper to the highest z-index
      paper.style.zIndex = ++highestZ;

      e.preventDefault(); // Prevent scrolling.
    });

    paper.addEventListener('touchmove', (e) => {
      if (!this.holdingPaper) return;

      const touch = e.touches[0];
      this.currentX = touch.clientX - this.startX;
      this.currentY = touch.clientY - this.startY;

      // Apply transform
      paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px) rotateZ(${this.rotation}deg)`;

      // Store offsets for continuity
      this.offsetX = this.currentX;
      this.offsetY = this.currentY;

      e.preventDefault(); // Prevent scrolling during dragging.
    });

    paper.addEventListener('touchend', () => {
      this.holdingPaper = false;
    });
  }
}

// Apply to all papers
const papers = document.querySelectorAll('.paper');
papers.forEach((paper) => {
  const mobilePaper = new MobilePaper();
  mobilePaper.init(paper);
});
