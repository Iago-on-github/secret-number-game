let tentativaRealizadas = [];
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazillian Portuguese Female', {rate: 1.2});
}

function exibirMensagemInicial() {
    exibirTexto('h1', 'Jogo do número secreto');
    exibirTexto('p', 'Escolha um número entre 1 e 10');
}

exibirTexto('h1', 'Jogo do número secreto');
exibirTexto('p', 'Escolha um número entre 1 e 10');

function verificarChute() {
    let chute = document.querySelector('input').value;
    console.log(chute == numeroSecreto);

    if (chute == numeroSecreto) {
        exibirTexto('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagensTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativa}`;
        exibirTexto('p', mensagensTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTexto('h1', 'Você errou. Tente novamente.');
            exibirTexto('p', `O número secreto é menor que ${chute}.`);
        } else {
            exibirTexto('h1', 'Você errou. Tente novamente.');
            exibirTexto('p', `O número secreto é maior que ${chute}.`);
        }
        tentativas++;
        limparCampo();
    }  
}

function gerarNumeroAleatorio() {
   let numeroEscolhido = parseInt(Math.random() * numeroMaximo + 1);
   let quantidadeElementosNaLista = tentativaRealizadas.length;
   if (quantidadeElementosNaLista == numeroMaximo) {
        tentativaRealizadas = [];
   }

   if (tentativaRealizadas.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
   } else {
    tentativaRealizadas.push(numeroEscolhido);
    return numeroEscolhido;
   }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
}