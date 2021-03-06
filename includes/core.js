(function (root) {
	var extraIncludes = [];
	var init = false;
	var inc = {
		p5Version: '0.5.15',
		require: function (name) {
			inc.includes[name].required = true;
		},
		addInclude: function (path) {
			if (Array.isArray(path)) {
				for (var i = 0; i < path.length; i++) {
					inc.addInclude(path[i]);
				}
			}
			if (!init) {
				extraIncludes.push(path);
				return;
			}
			if (!(~path.indexOf(':')) && path[0] !== ".") {
				path = 'http://www.unclejasonteachesprogramming.com/gitjs/p5-sketches/master/' + path;
			}
			var script = document.createElement("script");
			script.src = path;
			script.async = false;
			document.head.appendChild(script);
		},
		includes: {
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
				"required": false
			},
			"p5.gui": {
				"path": [
					"https://cdn.rawgit.com/bitcraftlab/p5.gui/master/libraries/quicksettings.js",
					"https://cdn.rawgit.com/bitcraftlab/p5.gui/master/libraries/p5.gui.js"
				],
				"description": "p5.gui generates a graphical user interface for your p5.js sketches.",
				"required": false
			}
		}
	};


	function addEvent(element, eventName, fn) {
		if (element.addEventListener) {
			element.addEventListener(eventName, fn, false);
		} else if (element.attachEvent) {
			element.attachEvent('on' + eventName, fn);
		}
	}
	if (root.preInit && typeof root.preInit == 'function') {
		root.preInit(inc);
	}
	init = true;
	inc.addInclude('https://cdnjs.cloudflare.com/ajax/libs/p5.js/' + inc.p5Version + '/p5.min.js');
	for (var lib in inc.includes) {
		if (inc.includes[lib].required) {
			if (typeof inc.includes[lib].path == 'function') {
				inc.addInclude(inc.includes[lib].path());
			} else {
				inc.addInclude(inc.includes[lib].path);
			}
		}
	}
	for (var i = 0; i < extraIncludes.length; i++) {
		inc.addInclude(extraIncludes[i]);
	}
}(this));
