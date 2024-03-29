(function(window){	
	var define ={}, mainPath = 'game_sample/';
	Object.defineProperties(define, {
		'mainPath': {
			value: mainPath,
			writable: false
		},
		'jsPath': {
			value: mainPath + 'js/',
			writable: false
		},
		'musicPath': {
			value: mainPath + 'music/',
			writable: false
		},
		'imagePath': {
			value: mainPath + 'image/',
			writable: false
		},
		'itemPath': {
			value: mainPath + 'image/item/',
			writable: false
		},
		'backgroundPath': {
			value: mainPath + 'image/background/',
			writable: false
		},
		'soundPath': {
			value: mainPath + 'sound/',
			writable: false
		}

	});

	window.define = define;
})(window)