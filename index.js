
// Execução do código

window.onload = () => {

    //Seção de declaração de variáveis

    const cartas =
        [{
            name: 'casinha3',
            img: 'images-2/3.png'
        },
        {
            name: 'casinha4',
            img: 'images-2/4.png'
        },
        {
            name: 'casinha5',
            img: 'images-2/5.png'
        },
        {
            name: 'casinha6',
            img: 'images-2/6.png'
        },
        {
            name: 'casinha7',
            img: 'images-2/7.png'
        },
        {
            name: 'casinha8',
            img: 'images-2/8.png'
        },
        {
            name: 'casinha3',
            img: 'images-2/3.png'
        },
        {
            name: 'casinha4',
            img: 'images-2/4.png'
        },
        {
            name: 'casinha5',
            img: 'images-2/5.png'
        },
        {
            name: 'casinha6',
            img: 'images-2/6.png'
        },
        {
            name: 'casinha7',
            img: 'images-2/7.png'
        },
        {
            name: 'casinha8',
            img: 'images-2/8.png'
        }]

    const titleView = document.querySelector('.title');
    const subtitleView = document.querySelector('.subtitle');
    const explicacaoView = document.querySelector('.explica')
    const tabuleiro = document.querySelector('.tabuleiro');
    const placarView = document.querySelector('.placar');
    const repeticaoView = document.querySelector('.repeticao');
    const avisosView = document.querySelector('.avisos');

    let gameOver = false;
    let cartasEscolhidas = [];
    let cartasEscolhidasId = [];
    let combinacaoFeita = [];
    let erros = 0;
    const maxErros = 4;

    //Título, subtítulo e explicação
    titleView.textContent = 'Predinhos Porto Alegre';
    subtitleView.textContent = 'Jogo da Memória';
    explicacaoView.textContent = 'Descubra as combinações corretas dos predinhos de Porto Alegre! Se você errar 4 vezes, o jogo será finalizado.';

    cartas.sort(() => 0.5 - Math.random())

    //Seção de funções

    function createButtons() {
        const botaoSim = document.createElement('button');
        botaoSim.textContent = 'Sim';
        document.getElementById('buttons').appendChild(botaoSim);
        botaoSim.addEventListener('click', () => {
            novoJogo();
        });
        const botaoNao = document.createElement('button');
        botaoNao.textContent = 'Não';
        document.getElementById('buttons').appendChild(botaoNao);
        botaoNao.addEventListener('click', () => {
            window.close();

        });
    }


    function novoJogo() {
        location.reload();
    }


    function checarCombinacao() {
        const cartas = document.querySelectorAll('img');
        const escolhaUmId = cartasEscolhidasId[0];
        const escolhaDoisId = cartasEscolhidasId[1];

        //clique na mesma imagem
        if (escolhaUmId === escolhaDoisId) {
            cartas[escolhaUmId].setAttribute('src', 'images-2/QuestionMark.png')
            cartas[escolhaDoisId].setAttribute('src', 'images-2/QuestionMark.png')
            avisosView.textContent = 'Mesma Carta!';
            //combinação feita    
        } else if (cartasEscolhidas[0] === cartasEscolhidas[1]) {
            cartas[escolhaUmId].setAttribute('src', 'images-2/Check.png');
            cartas[escolhaDoisId].setAttribute('src', 'images-2/Check.png');
            cartas[escolhaUmId].removeEventListener('click', viraCarta);
            cartas[escolhaDoisId].removeEventListener('click', viraCarta);
            combinacaoFeita.push(cartasEscolhidas);
            //combinação não feita    
        } else {
            cartas[escolhaUmId].setAttribute('src', 'images-2/QuestionMark.png');
            cartas[escolhaDoisId].setAttribute('src', 'images-2/QuestionMark.png');
            erros++;
        }
        cartasEscolhidas = [];
        cartasEscolhidasId = [];

        //Mostrar o Placar
        if (combinacaoFeita.length > 0) {
            placarView.textContent = 'Você fez ' + combinacaoFeita.length + '/6 combinações!';
        }
        //Mostrar erros
        repeticaoView.textContent = 'Erros: ' + erros + '/4';

        //jogador venceu!

        if (combinacaoFeita.length === cartas.length / 2) {
            gameOver = true;
            repeticaoView.remove();
            placarView.textContent = 'Parabéns! Você deseja jogar outra vez?';
            createButtons();
        }
        //deletar repetiçõesView

        //finalização do jogo por erros
        if (erros === maxErros) {
            gameOver = true;
            repeticaoView.textContent = "Game Over! Você deseja jogar outra vez?";
            tabuleiro.style.pointerEvents = "none";
            createButtons();
        }
        tabuleiro.style.pointerEvents = "auto";
    }

    function montaTabuleiro() {
        for (let i = 0; i < cartas.length; i++) {
            const carta = document.createElement('img')
            carta.classList.add('cartas')
            carta.setAttribute('src', 'images-2/QuestionMark.png')
            carta.setAttribute('data-id', i)
            carta.addEventListener('click', viraCarta)
            tabuleiro.appendChild(carta)
        }
    }

    function viraCarta() {
        if(gameOver){
            return;
        }

        let cartaId = this.getAttribute('data-id');
        cartasEscolhidas.push(cartas[cartaId].name);
        cartasEscolhidasId.push(cartaId);
        this.setAttribute('src', cartas[cartaId].img);
        if (cartasEscolhidas.length === 2) {
            tabuleiro.style.pointerEvents = "none";
            setTimeout(checarCombinacao, 800);

        }
    }
    montaTabuleiro()
}
