const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Banco de palavras (Mínimo de 20 palavras e 3 categorias como pedido)
const banco = [
    { palavra: 'COMPUTADOR', categoria: 'Tecnologia' },
    { palavra: 'MOUSE', categoria: 'Tecnologia' },
    { palavra: 'TECLADO', categoria: 'Tecnologia' },
    { palavra: 'MONITOR', categoria: 'Tecnologia' },
    { palavra: 'INTERNET', categoria: 'Tecnologia' },
    { palavra: 'CACHORRO', categoria: 'Animais' },
    { palavra: 'GATO', categoria: 'Animais' },
    { palavra: 'LEAO', categoria: 'Animais' },
    { palavra: 'TIGRE', categoria: 'Animais' },
    { palavra: 'PATO', categoria: 'Animais' },
    { palavra: 'BANANA', categoria: 'Frutas' },
    { palavra: 'MACA', categoria: 'Frutas' },
    { palavra: 'UVA', categoria: 'Frutas' },
    { palavra: 'PERA', categoria: 'Frutas' },
    { palavra: 'KIWI', categoria: 'Frutas' },
    { palavra: 'CADEIRA', categoria: 'Objetos' },
    { palavra: 'MESA', categoria: 'Objetos' },
    { palavra: 'CANETA', categoria: 'Objetos' },
    { palavra: 'LIVRO', categoria: 'Objetos' },
    { palavra: 'BOLSA', categoria: 'Objetos' }
];

let jogador = '';
let palavraSecreta = '';
let letrasDescobertas = [];
let letrasTentadas = [];
let erros = 0;
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
