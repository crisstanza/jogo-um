function Utils() {
}

Utils.swapClass = function(element, oldClassName, newClassName) {
	Utils.removeClass(element, oldClassName);
	Utils.addClass(element, newClassName);
}

Utils.addClass = function(element, className) {
	var classNames = element.getAttribute('class');
	if (classNames == null) {
		element.setAttribute('class', className);	
	} else {
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
}

Utils.removeClass = function(element, className) {
	var classNames = element.getAttribute('class');
	if (classNames != null) {
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

Utils.random = function(inf, sup) {
	return Math.floor((Math.random()*sup) + inf);
}

Utils.containsSingleClick = function(array, singleClick) {
	var length = array.length;
	for(var i = 0 ; i < length ; i++) {
		var element = array[i];
		if (element.x == singleClick.x && element.y == singleClick.y) {
			return true;
		}
	}
	return false;
}

Utils.equalsSingleClick = function(array1, array2) {
	var length1 = array1.length;
	var length2 = array2.length;
	if ( length1 != length2 ) {
		return false;
	}
	for(var i = 0 ; i < length1 ; i++) {
		var element1 = array1[i];
		var element2 = array2[i];
		if (element1.x != element2.x || element1.y != element2.y) {
			return false;
		}
	}
	return true;
}
