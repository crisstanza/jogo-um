function Jogo() {
	this.fase = undefined;
	this.sizeX = undefined;
	this.sizeY = undefined;
	this.colorDeltaX = undefined;
	this.colorDeltaY = undefined;
	//
	this.sizeSquare = undefined;
	this.space = undefined;
	//
	this.timerStart = undefined;
	this.timer = undefined;
	this.timerEnd = undefined;
	//
	this.clicks = undefined;
	this.goal = undefined;
}

Jogo.instance = new Jogo();

Jogo.LOG = false;

Jogo.log = function(msg) {
	if(Jogo.LOG) {
		console.log(msg);
	}
}

Jogo.ID_MAIN_TABLE = "main-table";
Jogo.ID_MAIN_BOARD = "main-board";
Jogo.ID_DISPLAY_TEMPO = "display-tempo";
Jogo.ID_DISPLAY_FASE = "display-fase";

Jogo.SHOW_SINGLE_GOAL_DURATION = 500;

Jogo.prototype.init = function() {
	this.setFase(1);
	this.startTimer();
}

Jogo.prototype.end = function() {
	this.stopTimer();
	this.removeClickListeners();
}

Jogo.prototype.showGoal = function() {
	this.showSingleGoal(null, 0);
}

Jogo.prototype.showSingleGoal = function(oldClicavel, i) {
	if (i < this.goal.length) {
		var singleGoal = this.goal[i];
		i++;
		var clicavel = document.querySelector('table[id='+Jogo.ID_MAIN_TABLE+'] td[data-i="'+singleGoal.x+'"][data-j="'+singleGoal.y+'"]');
		clicavel.innerHTML = i;
		var _this = this;
		setTimeout(function() { _this.showSingleGoal(clicavel, i); }, Jogo.SHOW_SINGLE_GOAL_DURATION);
	} else {
		this.addClickListeners();
	}
	if(oldClicavel != null) {
		oldClicavel.innerHTML = '';
	}
}

Jogo.prototype.setFase = function(fase) {
	this.fase = fase;
	this.sizeX = 1 + this.fase;
	this.sizeY = 1 + this.fase;
	this.colorDeltaX = 255 / this.sizeX;
	this.colorDeltaY = 255 / this.sizeY;
	//
	this.sizeSquare = 60;
	this.space = 5;
	//
	this.goal = this.createGoal(this.fase);
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
	var displayFase = document.getElementById(Jogo.ID_DISPLAY_FASE);
	displayFase.innerHTML = this.fase;
	//
	this.showGoal();
}

Jogo.prototype.createGoal = function(fase) {
	var goalSize = fase + 0;
	var goal = [];
	for (var i = 0 ; i < goalSize ; i++) {
		var singleClick = { x: Utils.random(0, this.sizeX), y: Utils.random(0, this.sizeY) };
		if (!Utils.containsSingleClick(goal, singleClick)) {
			goal.push(singleClick);
		}
	}
	return goal;
}

Jogo.prototype.startTimer = function() {
	var tempo = document.getElementById(Jogo.ID_DISPLAY_TEMPO);
	tempo.innerHTML = '00:00';
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
	var tempo = document.getElementById(Jogo.ID_DISPLAY_TEMPO);
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
		Utils.addClass(clicavel, 'Clicavel');
	}
	this.clicks = [];
}

Jogo.prototype.removeClickListeners = function() {
	var clicaveis = document.querySelectorAll('table[id='+Jogo.ID_MAIN_TABLE+'] td');
	var length = clicaveis.length;
	for (var i = 0 ; i < length ; i++) {
		var clicavel = clicaveis[i];
		clicavel.removeEventListener('click', this.mainClick, false);
		Utils.removeClass(clicavel, 'Clicavel');
	}
	this.clicks = undefined;
}

Jogo.prototype.mainClick = function(event) {
	var element = event.target;
	var i = element.getAttribute('data-i');
	var j = element.getAttribute('data-j');
	{
		Jogo.log('click: ' + i + ", " + j);
	}
	var _this = Jogo.instance;
	_this.clicks.push({ x: i, y: j });
	_this.mainFakeGameLoop();
}

Jogo.prototype.mainFakeGameLoop = function() {
	if ( this.clicks.length == this.goal.length ) {
		if( Utils.equalsSingleClick(this.clicks, this.goal) ) {
			this.removeClickListeners();
			this.setFase(this.fase + 1);
		} else {
			alert('Movimento incorreto, fim do jogo!!!');
			this.end();
		}
	}
}
