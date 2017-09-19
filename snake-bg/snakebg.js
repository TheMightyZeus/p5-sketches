// Based on sample located at https://p5js.org/examples/interaction-follow-3.html
// Original sample based on code from Keith Peters.

var pts = [], // The segment vectors
	segNum = 50, // Number of segments
	segLength = 5, // Length per segment
	zOffset = 0, // Counter for changing noise over time
	density = 0.001, // Density of the noise, lower values make less chaotic "wind"
	maxNoise = 0, // The biggest slant, used to normalize the wind strength
	speed = 0.001, // How quickly the noise changes over time
	lineSpacing = 0, // How often to put the wind vanes
	intensity = 2.5, // Segment movement speed relative to wind strength
	maxLen = segNum * segLength, // Total snake length
	colorY = 128, // The intensity of the snake colors
	thickness = 9, // The pixel size of the largest segment
	shrink = 0.075; // The number of pixels smaller each segment will be than the last

function setup() {
	for (var i = 0; i < segNum; i++) {
		pts[i] = createVector(0, 0);
	}
	var c = createCanvas(windowWidth, windowHeight);
	c.elt.style.position = "fixed";
	c.elt.style.maxWidth = "none";
	c.elt.style.maxHeight = "none";
	c.elt.style.left = 0;
	c.elt.style.top = 0;
	c.elt.style.zIndex = -100;
}

function draw() {
	zOffset += speed;
	background(255);

	var origY = colorY;

	if (lineSpacing > 0) {
		strokeWeight(1);
		stroke(0);
		for (var row = lineSpacing / 2; row < height; row += lineSpacing) {
			for (var col = lineSpacing / 2; col < height; col += lineSpacing) {
				var v = getDirVector(createVector(row, col));
				line(row, col, row + v.x * 5, col + v.y * 5);
			}
		}
	}

	strokeWeight(thickness);
	dragSegment(0, mouseX, mouseY);
	pts[0].add(getDirVector(pts[0]));
	for (var i = 0; i < pts.length - 1; i++) {
		strokeWeight(thickness - shrink * i);
		colorY++;
		pts[i + 1].add(getDirVector(pts[i + 1]));
		dragSegment(i + 1, pts[i].x, pts[i].y);
	}

	colorY = origY;
}

function setColor(u, v) {
	var y = colorY;
	var r = y + 1.4075 * (v - 128)
	var g = y - 0.3455 * (u - 128) - (0.7169 * (v - 128))
	var b = y + 1.7790 * (u - 128)
	stroke(r, g, b);
}

function getDirVector(vec) {
	var nLeft = noise((vec.x - 1) * density, vec.y * density, zOffset);
	var nRight = noise((vec.x + 1) * density, vec.y * density, zOffset);
	var nTop = noise(vec.x * density, (vec.y - 1) * density, zOffset);
	var nBottom = noise(vec.x * density, (vec.y + 1) * density, zOffset);

	var nx = nLeft - nRight;
	var ny = nTop - nBottom;

	if (abs(nx) > maxNoise) {
		maxNoise = abs(nx);
	}
	if (abs(ny) > maxNoise) {
		maxNoise = abs(ny);
	}
	return createVector(nx / maxNoise, ny / maxNoise).mult(intensity);
}

function dragSegment(i, xin, yin) {
	var dx = xin - pts[i].x;
	var dy = yin - pts[i].y;
	var angle = atan2(dy, dx);
	pts[i].x = xin - cos(angle) * segLength;
	pts[i].y = yin - sin(angle) * segLength;
	segment(pts[i].x, pts[i].y, angle);
}

function segment(x, y, a) {
	setColor(map(x - pts[0].x, -maxLen, maxLen, 0, 255), map(y - pts[0].y, -maxLen, maxLen, 0, 255));
	push();
	translate(x, y);
	rotate(a);
	line(0, 0, segLength, 0);
	//point(0, 0);
	pop();
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
}
