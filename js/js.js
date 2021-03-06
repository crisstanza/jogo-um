(function() {

	var jogo = undefined;

	function init() {
		jogo = Jogo.instance;
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
		var telas = document.querySelectorAll('div[id^=tela-]:not([class*=Bt])');
		var length = telas.length;
		for (var i = 0 ; i < length ; i++) {
			var tela = telas[i];
			Utils.swapClass(tela, 'Show', 'Hide');
		}
	}

	function show(id) {
		var element = document.getElementById(id);
		Utils.swapClass(element, 'Hide', 'Show');
	}

	window.addEventListener('load', init, false);

})();
