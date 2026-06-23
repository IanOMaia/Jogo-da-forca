const readline = require('readline');

const rl = readline.createInterface(
{
    input: process.stdin,
    output: process.stdout
});

/* ========================================================
   BANCO DE DADOS (Expandido)
   ======================================================== */
const banco = [
    // Fácil (até 4 letras)
    { palavra: 'GATO', categoria: 'Animais' }, { palavra: 'UVA', categoria: 'Frutas' },
    { palavra: 'PATO', categoria: 'Animais' }, { palavra: 'KIWI', categoria: 'Frutas' },
    { palavra: 'MESA', categoria: 'Objetos' }, { palavra: 'REI', categoria: 'Geral' },
    { palavra: 'BOLA', categoria: 'Objetos' },

    // Médio (5 a 7 letras)
    { palavra: 'MOUSE', categoria: 'Tecnologia' }, { palavra: 'BANANA', categoria: 'Frutas' },
    { palavra: 'LIVRO', categoria: 'Objetos' }, { palavra: 'TIGRE', categoria: 'Animais' },
    { palavra: 'CANETA', categoria: 'Objetos' }, { palavra: 'CHAVE', categoria: 'Objetos' },
    { palavra: 'BOLSA', categoria: 'Objetos' }, { palavra: 'MACA', categoria: 'Frutas' },

    // Difícil (8 ou mais letras)
    { palavra: 'COMPUTADOR', categoria: 'Tecnologia' }, { palavra: 'ELEFANTE', categoria: 'Animais' },
    { palavra: 'TECLADO', categoria: 'Tecnologia' }, { palavra: 'INTERNET', categoria: 'Tecnologia' },
    { palavra: 'CADEIRA', categoria: 'Objetos' }, { palavra: 'MORANGO', categoria: 'Frutas' }
];

let palavraSecreta = '', letrasDescobertas = [], letrasTentadas = [], erros = 0, jogador = '';

function iniciarJogo() 
{
    console.log('--- BEM-VINDO AO JOGO DA FORCA ---');
    rl.question('Digite seu nome: ', (nome) => {
        jogador = nome;
        escolherDificuldade();
    });
}

function escolherDificuldade() 
{
    console.log('\nEscolha a dificuldade:');
    console.log('1 - Fácil (até 4 letras)');
    console.log('2 - Médio (5 a 7 letras)');
    console.log('3 - Difícil (8 ou mais letras)');
    
    rl.question('Opção: ', (opcao) => 
    {
        let filtro = [];
        if (opcao === '1') filtro = banco.filter(p => p.palavra.length <= 4);
        else if (opcao === '2') filtro = banco.filter(p => p.palavra.length >= 5 && p.palavra.length <= 7);
        else if (opcao === '3') filtro = banco.filter(p => p.palavra.length >= 8);
        else {
            console.log('Opção inválida!');
            return escolherDificuldade();
        }

        const sorteio = filtro[Math.floor(Math.random() * filtro.length)];
        palavraSecreta = sorteio.palavra;
        letrasDescobertas = Array(palavraSecreta.length).fill('_');
        console.log(`\nCategoria sorteada: ${sorteio.categoria}`);
        jogar();
    });
}

function jogar() 
{
    console.log(`\nPalavra: ${letrasDescobertas.join(' ')} | Erros: ${erros}/6`);
    rl.question('Digite uma letra: ', (letra) => {
        letra = letra.toUpperCase();
        if (letrasTentadas.includes(letra)) { console.log('Já tentou essa!'); return jogar(); }
        letrasTentadas.push(letra);

        if (palavraSecreta.includes(letra)) {
            palavraSecreta.split('').forEach((l, i) => { if (l === letra) letrasDescobertas[i] = letra; });
        } else { erros++; }

        if (erros >= 6) { console.log(`Perdeu! Era ${palavraSecreta}`); perguntarNovamente(); }
        else if (!letrasDescobertas.includes('_')) { console.log('Você venceu!'); perguntarNovamente(); }
        else jogar();
    });
}

function perguntarNovamente() 
{
    rl.question('Jogar de novo? (s/n): ', (resp) => {
        if (resp.toLowerCase() === 's') { erros = 0; letrasTentadas = []; escolherDificuldade(); }
        else rl.close();
    });
}

iniciarJogo();
const maxErros = 6;

function iniciarJogo() 
{
    console.log('--- JOGO DA FORCA ---');
    rl.question('Digite seu nome: ', (nome) => {
        jogador = nome;
        sortearPalavra();
    });
}

function sortearPalavra() 
{
    const sorteio = banco[Math.floor(Math.random() * banco.length)];
    palavraSecreta = sorteio.palavra;
    letrasDescobertas = Array(palavraSecreta.length).fill('_');
    
    console.log(`\nBem-vindo(a), ${jogador}! A categoria é: ${sorteio.categoria}`);
    jogar();
}

function jogar() 
{
    console.log(`\nPalavra: ${letrasDescobertas.join(' ')}`);
    console.log(`Tentativas erradas: ${erros}/${maxErros}`);
    console.log(`Letras tentadas: ${letrasTentadas.join(', ')}`);

    rl.question('Escolha uma letra: ', (letra) => {
        letra = letra.toUpperCase();

        if (letrasTentadas.includes(letra)) {
            console.log('Você já tentou essa letra!');
            return jogar();
        }

        letrasTentadas.push(letra);

        if (palavraSecreta.includes(letra)) {
            for (let i = 0; i < palavraSecreta.length; i++) {
                if (palavraSecreta[i] === letra) letrasDescobertas[i] = letra;
            }
        } else {
            erros++;
        }

        verificarFimDeJogo();
    });
}

function verificarFimDeJogo() 
{
    if (!letrasDescobertas.includes('_')) {
        console.log(`\nParabéns ${jogador}, você venceu! A palavra era: ${palavraSecreta}`);
        perguntarNovamente();
    } else if (erros >= maxErros) {
        console.log(`\nFim de jogo! Você perdeu. A palavra era: ${palavraSecreta}`);
        perguntarNovamente();
    } else {
        jogar();
    }
}

function perguntarNovamente() 
{
    rl.question('\nDeseja jogar novamente? (s/n): ', (resp) => {
        if (resp.toLowerCase() === 's') {
            erros = 0;
            letrasTentadas = [];
            sortearPalavra();
        } else {
            console.log('Até mais!');
            rl.close();
        }
    });
}

iniciarJogo();
