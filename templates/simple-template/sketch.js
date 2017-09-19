// This is a good place to put global variables you'll need to use repeatedly.

// This function gets called right when the page loads.
function setup() {
	// The createCanvas function gives us a place to draw.
	createCanvas(400, 400);
}

// This function gets called again and again, and the canvas is updated in between.
function draw() {
	// The background function should usually be called right at the beginning of draw().
	// It clears the screen to a specified color.
	background(120, 120, 180);
	// The stroke function sets the "outline" color of the shapes drawn after it's called.
	stroke(0, 50, 0);
	// The fill function sets the "fill" color of shapes drawn after it's called.
	fill(200, 255, 200);
	// The rect function draws a rectangle or square using the current outline and fill colors.
	// The arguments are x, y, width, height.
	// X is how far from the left side of the screen the rectangle will start.
	// Y is how far from the top of the screen the rectangle will start.
	// Width and Height are the dimensions of the rectangle. If they're the same number, it will be a square.
	rect(30, 50, 130, 100);
	// The ellipse function draws an oval or circle using the current outline and fill colors.
	// The arguments are x, y, width, height.
	// X is how far from the left side of the screen the center of the oval will be.
	// Y is how far from the top of the screen the center of the oval will be.
	// Width and Height are the dimensions of the oval. If they're the same number, it will be a circle.
	ellipse(250, 180, 100, 180);
	// Try calling the different functions with different arguments and in different order, even multiple times, and see what happens!
}
