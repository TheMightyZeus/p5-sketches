function require(name) {
	includes[name].required = true;
}

function addInclude(path) {
	if (!(~path.indexOf(':')) && path[0] !== ".") {
		path = 'http://www.unclejasonteachesprogramming.com/gitjs/p5-sketches/master/' + path;
	}
	var script = document.createElement("script");
	script.src = path;
	document.head.appendChild(script);
}

var p5Version = '0.5.15';
var includes = {
	"shapes": {
		"path": "includes/shapes.js",
		"description": "Creates functions for generating simple but not trivial geometric shapes, such as stars and hearts.",
		"required": false
	},
	"particle": {
		"path": "includes/Particle.js",
		"description": "Custom simple UJTP particle class.",
		"required": false
	},
	"p5.play": {
		"path": "https://cdn.rawgit.com/molleindustria/p5.play/master/lib/p5.play.js",
		"description": "p5.play provides sprites, animations, input and collision functions for games and gamelike applications. Created by Paolo Pedercini.",
		"required": "false"
	}
};

(function () {
	function addEvent(element, eventName, fn) {
		if (element.addEventListener) {
			element.addEventListener(eventName, fn, false);
		} else if (element.attachEvent) {
			element.attachEvent('on' + eventName, fn);
		}
	}
	addEvent(window, 'load', function () {
		if (window.preInit && typeof window.preInit == 'function') {
			window.preInit();
		}
		addInclude('https://cdnjs.cloudflare.com/ajax/libs/p5.js/' + p5Version + '/p5.min.js');
		for (var lib in includes) {
			if (includes[lib].required) {
				if (typeof includes[lib].path == 'function') {
					addInclude(includes[lib].path());
				} else {
					addInclude(includes[lib].path);
				}
			}
		}
	});
}());
