var particleCount = 20;
var particles = [];

function setup() {
	// Create the canvas
	createCanvas(400, 400);
	// Create a number of particles equal to particleCount
	for (var i = 0; i < particleCount; i++) {
		// Create a new particle
		particles[i] = new Particle();
		// Give it some random velocity
		particles[i].velocity = createVector(random(-3, 3), random(-3, 3));
	}
}

function draw() {
	// Clear the background to black
	background(0);
	// For each particle...
	for (var i = 0; i < particles.length; i++) {
		// Add a small amount of random acceleration to the particle
		particles[i].addForce(createVector(random(-0.01, 0.01), random(-0.01, 0.01)));
		// Update the particle's position
		particles[i].update();
		// If the particle has gone off the edge of the screen...
		if (particles[i].offEdge()) {
			// ...start it at a random spot...
			particles[i].position = createVector(random(width), random(height));
			// ...and give it some random velocity
			particles[i].velocity = createVector(random(-3, 3), random(-3, 3));
		}
		// Draw the particle on the screen
		particles[i].draw();
	}
}
