// particles.js
// CSW 38 - Bouncing Particle System
// Author: Daniel Carranza

const canvas = document.getElementById("particleCanvas");
const ctx = canvas.getContext("2d");

let particles = [];

// Keep canvas size filling most of browser window
function resizeCanvas() {
  const width = window.innerWidth * 0.9;   // 90% of window width
  const height = window.innerHeight * 0.65; // 65% of window height

  canvas.width = width;
  canvas.height = height;
}

// Particle class (Stage 1 & 2)
class Particle {
  constructor(x, y, radius, color, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.dx = dx;   // velocity in x direction
    this.dy = dy;   // velocity in y direction
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  update() {
    // Edge detection – bounce off all four sides
    if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }

    // Update position
    this.x += this.dx;
    this.y += this.dy;

    // Draw with updated position
    this.draw();
  }
}

// Helper: random number in range
function random(min, max) {
  return Math.random() * (max - min) + min;
}

// Create a single particle in middle (Stage 1)
function createSingleParticle() {
  particles = [];

  const radius = 20;
  const x = canvas.width / 2;
  const y = canvas.height / 2;
  const dx = 3;   // speed in x direction
  const dy = 2.5; // speed in y direction

  const particle = new Particle(x, y, radius, "#7cf0ff", dx, dy);
  particles.push(particle);
}

// Create many particles with randomized properties (Stage 2)
function createManyParticles(count) {
  particles = [];

  for (let i = 0; i < count; i++) {
    const radius = random(5, 15);
    const x = random(radius, canvas.width - radius);
    const y = random(radius, canvas.height - radius);

    // Velocity can be positive or negative
    const dx = random(-3, 3) || 1; // ensure not 0
    const dy = random(-3, 3) || -1;

    const colors = ["#7cf0ff", "#ffd166", "#ff6b6b", "#c792ea", "#4ade80"];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particles.push(new Particle(x, y, radius, color, dx, dy));
  }
}

// Animation loop
function animate() {
  requestAnimationFrame(animate);

  // Clear entire canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw all particles
  particles.forEach(p => p.update());
}

// Hook up buttons (so your teacher can see Stage 1 vs Stage 2 clearly)
const oneParticleBtn = document.getElementById("oneParticleBtn");
const manyParticlesBtn = document.getElementById("manyParticlesBtn");

oneParticleBtn.addEventListener("click", () => {
  createSingleParticle();
});

manyParticlesBtn.addEventListener("click", () => {
  createManyParticles(100);
});

// Initial setup
window.addEventListener("resize", () => {
  resizeCanvas();
  // Re-create particles so they stay inside the new size
  if (particles.length === 1) {
    createSingleParticle();
  } else {
    createManyParticles(100);
  }
});

resizeCanvas();
createManyParticles(100); // default view: Stage 2 swarm
animate();
