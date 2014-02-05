(function() {

	var sizeX = 3;
	var sizeY = 3;
	var colorDeltaX = 255 / sizeX;
	var colorDeltaY = 255 / sizeY;
	var sizeSquare = 60;
	var space = 5;

	function Jogo() {
	}

	Jogo.prototype.init = function() {
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

	window.addEventListener('load', init, false);

})();
