(function () {
	var extraIncludes = [];
	var init = false;
	var inc = {
		p5Version: '0.5.15',
		require: function (name) {
			inc.includes[name].required = true;
		},
		addInclude: function (path) {
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
				"required": "false"
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
	addEvent(window, 'load', function () {
		if (window.preInit && typeof window.preInit == 'function') {
			window.preInit(inc);
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
	});
}());
