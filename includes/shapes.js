function star(startX, startY, outerRadius, innerRadius, points) {
	outerRadius = outerRadius || 150;
	innerRadius = innerRadius || (outerRadius * 0.375);
	points = (points || 5) * 2;
	beginShape();
	for (var i = 0; i <= points; i++) {
		var pt = p5.Vector.fromAngle((TWO_PI / points * i) - HALF_PI);
		pt.mult((i % 2) ? innerRadius : outerRadius);
		vertex(pt.x + startX, pt.y + startY);
	}
	endShape();
}

function heart(startX, startY, radius, pointHeight) {
	beginShape();
	vertex(startX, startY + pointHeight);
	__varc(startX - radius, startY - radius, radius, -220, -10, 15);
	__varc(startX + radius, startY - radius, radius, -170, 40, 15);
	vertex(startX, startY + pointHeight);
	endShape();
}

function __varc(x, y, radius, start, end, segments) {
	for (var a = start; a <= end; a += (end - start) / segments) {
		var pt = p5.Vector.fromAngle(radians(a));
		pt.mult(radius);
		vertex(pt.x + x, pt.y + y);
	}
}
