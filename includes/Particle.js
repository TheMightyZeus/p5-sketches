// Called with a vector argument or no arguments
// If the vector argument is supplied, it's the position of the particle
// Otherwise, the position is random
function Particle(v) {
	// Give this particle a position on the canvas
	this.position = v || createVector(random(width), random(height));
	// And a velocity vector of [0,0] which is sitting still
	this.velocity = createVector();
	// And an acceleration vector of [0,0] which is continuing to sit still
	this.acceleration = createVector();
	// And a color of 255 which is white
	this.color = 255;
	// And a size of one pixel
	this.size = 1;

	// The update method applies the velocity and acceleration to the particle
	this.update = function () {
		this.position.add(this.velocity);
		this.velocity.add(this.acceleration);
		this.acceleration.mult(0);
	};

	// The addForce method adds to the particle's acceleration
	this.addForce = function (f) {
		this.acceleration.add(f);
	};

	// The draw method displays the particle on the screen
	this.draw = function () {
		strokeWeight(this.size);
		stroke(this.color);
		point(this.position.x, this.position.y);
	};

	// This method adds drag to the particle's velocity. A drag of 1 means complete stop,
	// a drag of 0 has no effect.
	this.drag = function (amount) {
		this.velocity.mult(1 - amount);
	};

	// This method checks if the particle is off the edge of the canvas
	// and returns true if so, false otherwise.
	this.offEdge = function () {
		if (this.position.x < 0) {
			return true;
		} else if (this.position.x > width) {
			return true;
		}
		if (this.position.y < 0) {
			return true;
		} else if (this.position.y > height) {
			return true;
		}
		return false;
	};

	// The wrap method checks if the particle has gone off any of the four
	// edges of the screen and wraps it around if so.
	this.wrap = function () {
		if (this.position.x < 0) {
			this.position.x += width;
		} else if (this.position.x > width) {
			this.position.x -= width;
		}
		if (this.position.y < 0) {
			this.position.y += height;
		} else if (this.position.y > height) {
			this.position.y -= height;
		}
	};
}
