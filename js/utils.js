function Utils() {
}

Utils.addClass = function(element, className) {
	var classNames = element.getAttribute('class');
	var classes = classNames.split(' ');
	var length = classes.length;
	for (var i = 0 ; i < length ; i++) {
		var clazz = classes[i];
		if (clazz == className) {
			return;
		}
	}
	var newClassNames = classNames + ' ' + className;
	element.setAttribute('class', newClassNames);
}


Utils.removeClass = function(element, className) {
	var classNames = element.getAttribute('class');
	var classes = classNames.split(' ');
	var length = classes.length;
	for (var i = 0 ; i < length ; i++) {
		var clazz = classes[i];
		if (clazz == className) {
			classes[i] = '';
			break;
		}
	}
	var newClassNames = classes.join(' ');
	element.setAttribute('class', newClassNames);
}

Utils.formatHour = function(seconds) {
	var minutes = Math.floor(seconds / 60);
	var seconds = Math.floor(seconds % 60);
	return Utils.format2(minutes) + ':' + Utils.format2(seconds);
}

Utils.format2 = function(number) {
	if (number < 10) {
		return '0' + number;
	}
	return number;
}
