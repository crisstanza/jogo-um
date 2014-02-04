(function() {

	var sizeX = 3;
	var sizeY = 3;
	var colorDeltaX = 255 / sizeX;
	var colorDeltaY = 255 / sizeY;
	var sizeSquare = 60;
	var space = 2;

	function init() {
		var sb = [];
		sb.push('<table cellspacing="'+space+'" cellpadding="0">');
		for ( var i = 0 ; i < sizeX ; i++ ) {
			sb.push('<tr>');
			for ( var j = 0 ; j < sizeY ; j++ ) {
				var color = 'rgb(' + Math.floor(255 - colorDeltaX*i) + ',' + Math.floor(255 - colorDeltaY*j) + ', 0)';
				sb.push('<td style="background-color: '+color+'" width="'+sizeSquare+'" height="'+sizeSquare+'" data-i="'+i+'" data-j="'+j+'">');
				sb.push('</td>');
			}
			sb.push('</tr>');
		}
		sb.push('</table>');
		var mainBoard = document.getElementById('main-board');
		mainBoard.innerHTML = sb.join('');
	}

	window.addEventListener('load', init, false);

})();

