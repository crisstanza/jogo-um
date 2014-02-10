function Jogo() {
	this.fase = undefined;
	this.sizeX = undefined;
	this.sizeY = undefined;
	this.colorDeltaX = undefined;
	this.colorDeltaY = undefined;
	this.sizeSquare = undefined;
	this.space = undefined;
	//
	this.timerStart = undefined;
	this.timer = undefined;
	this.timerEnd = undefined;
}

Jogo.ID_MAIN_TABLE = "main-table";
Jogo.ID_MAIN_BOARD = "main-board";
Jogo.ID_TEMPO = "tempo";

Jogo.prototype.init = function() {
	this.setFase(1);
	//
	var sb = [];
	sb.push('<table id="'+Jogo.ID_MAIN_TABLE+'" cellspacing="'+this.space+'" cellpadding="0">');
	for ( var i = 0 ; i < this.sizeX ; i++ ) {
		sb.push('<tr>');
		for ( var j = 0 ; j < this.sizeY ; j++ ) {
			var color = 'rgb(' + Math.floor(255 - this.colorDeltaX*i) + ',' + Math.floor(255 - this.colorDeltaY*j) + ', 0)';
			sb.push('<td style="background-color: '+color+'" width="'+this.sizeSquare+'" height="'+this.sizeSquare+'" data-i="'+i+'" data-j="'+j+'">');
			sb.push('</td>');
		}
		sb.push('</tr>');
	}
	sb.push('</table>');
	var mainBoard = document.getElementById(Jogo.ID_MAIN_BOARD);
	mainBoard.innerHTML = sb.join('');
	//
	this.addClickListeners();
	//
	this.startTimer();
}

Jogo.prototype.end = function() {
	this.stopTimer();
	this.removeClickListeners();
}

Jogo.prototype.setFase = function(fase) {
	this.fase = fase;
	this.sizeX = 2 + this.fase;
	this.sizeY = 2 + this.fase;
	this.colorDeltaX = 255 / this.sizeX;
	this.colorDeltaY = 255 / this.sizeY;
	this.sizeSquare = 30;
	this.space = 5;
}

Jogo.prototype.startTimer = function() {
	this.timerStart = new Date().getTime();
	var _this = this;
	this.timer = setInterval(function() { _this.incTimer(); }, 1000);
}

Jogo.prototype.stopTimer = function() {
	this.timerEnd = new Date();
	clearInterval(this.timer);
	this.timer = undefined;
}

Jogo.prototype.incTimer = function() {
	var now = new Date().getTime();
	var delta = now - this.timerStart;
	var deltaInSeconds = delta / 1000;
	var tempo = document.getElementById(Jogo.ID_TEMPO);
	tempo.innerHTML = Utils.formatHour(deltaInSeconds);
	if (tempo.innerHTML == '99:59') {
		this.end();
	}
}

Jogo.prototype.addClickListeners = function() {
	var clicaveis = document.querySelectorAll('table[id='+Jogo.ID_MAIN_TABLE+'] td');
	var length = clicaveis.length;
	for (var i = 0 ; i < length ; i++) {
		var clicavel = clicaveis[i];
		clicavel.addEventListener('click', this.mainClick, false);
	}
}

Jogo.prototype.removeClickListeners = function() {
	var clicaveis = document.querySelectorAll('table[id='+Jogo.ID_MAIN_TABLE+'] td');
	var length = clicaveis.length;
	for (var i = 0 ; i < length ; i++) {
		var clicavel = clicaveis[i];
		clicavel.removeEventListener('click', this.mainClick, false);
	}
}

Jogo.prototype.mainClick = function(event) {
	var element = event.target;
	var i = element.getAttribute('data-i');
	var j = element.getAttribute('data-j');
	{
		console.log('click: ' + i + ", " + j)
	}
}
