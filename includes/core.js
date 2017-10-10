function addInclude(path) {
	if (!(~path.indexOf(':'))) {
		path = 'http://www.unclejasonteachesprogramming.com/gitjs/p5-sketches/master/' + path;
	}
	var script = document.createElement("script");
	script.src = path;
	document.head.appendChild(script);
}
addInclude('includes/shapes.js');
addInclude('includes/Particle.js');
addInclude('https://cdnjs.cloudflare.com/ajax/libs/p5.js/0.5.12/p5.js');
