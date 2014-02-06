(function() {

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

	Jogo.prototype.init = function() {
		this.setFase(1);
		//
		var sb = [];
		sb.push('<table cellspacing="'+this.space+'" cellpadding="0">');
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
		var mainBoard = document.getElementById('main-board');
		mainBoard.innerHTML = sb.join('');
		//
		this.startTimer();
	}

	Jogo.prototype.setFase = function(fase) {
		this.fase = fase;
		this.sizeX = 2 + this.fase;
		this.sizeY = 2 + this.fase;
		this.colorDeltaX = 255 / this.sizeX;
		this.colorDeltaY = 255 / this.sizeY;
		this.sizeSquare = 60;
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
		var tempo = document.getElementById('tempo');
		tempo.innerHTML = formatHour(deltaInSeconds);
		if (tempo.innerHTML == '99:59') {
			this.stopTimer();
		}
	}

	var jogo = new Jogo();

	function init() {
		initTelaInicial();
		initTelaInstrucoes();
		initTelaJogo();
	}

	function initTelaInicial() {
		var btJogar = document.getElementById('tela-inicial-bt-jogar');
		btJogar.addEventListener('click', goToTelaJogo, false);
		var btInstrucoes = document.getElementById('tela-inicial-bt-instrucoes');
		btInstrucoes.addEventListener('click', goToTelaInstrucoes, false);
	}

	function initTelaInstrucoes() {
		var btVoltar = document.getElementById('tela-instrucoes-bt-voltar');
		btVoltar.addEventListener('click', goToTelaInicial, false);
	}

	function initTelaJogo() {
	}

	function initTelaInstrucoes() {
		var btVoltar = document.getElementById('tela-instrucoes-bt-voltar');
		btVoltar.addEventListener('click', goToTelaInicial, false);
	}

	function goToTelaInicial() {
		hideTelas();
		show('tela-inicial');
	}

	function goToTelaInstrucoes() {
		hideTelas();
		show('tela-instrucoes');
	}

	function goToTelaJogo() {
		hideTelas();
		show('tela-jogo');
		jogo.init();
	}

	function hideTelas() {
		var telas = document.querySelectorAll("div[id^=tela-]:not([class*=Bt])");
		var length = telas.length;
		for (var i = 0 ; i < length ; i++) {
			var tela = telas[i];
			removeClass(tela, 'Show');
			addClass(tela, 'Hide');
		}
	}

	function show(id) {
		var element = document.getElementById(id);
		removeClass(element, 'Hide');
		addClass(element, 'Show');
	}

	function addClass(element, className) {
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


	function removeClass(element, className) {
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

	function formatHour(seconds) {
		var minutes = Math.floor(seconds / 60);
		var seconds = Math.floor(seconds % 60);
		return format2(minutes) + ':' + format2(seconds);
	}

	function format2(number) {
		if (number < 10) {
			return '0' + number;
		}
		return number;
	}

	window.addEventListener('load', init, false);

})();
