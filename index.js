const readline = require('readline');
const fs = require('fs');
const forcaEstagios = require('./art.js');


const rl = readline.createInterface(
{
    input: process.stdin,
    output: process.stdout
});

/* ========================================================
   BANCO DE DADOS
   ======================================================== */
const banco = [
    // FÁCEIS (até 4 letras) - 20 palavras
    { palavra: 'GATO', categoria: 'Animais' }, { palavra: 'PATO', categoria: 'Animais' },
    { palavra: 'URSO', categoria: 'Animais' }, { palavra: 'LOBO', categoria: 'Animais' },
    { palavra: 'UVA', categoria: 'Frutas' }, { palavra: 'KIWI', categoria: 'Frutas' },
    { palavra: 'JACA', categoria: 'Frutas' }, { palavra: 'COCO', categoria: 'Frutas' },
    { palavra: 'MESA', categoria: 'Móveis' }, { palavra: 'SOFA', categoria: 'Móveis' },
    { palavra: 'CAMA', categoria: 'Móveis' }, { palavra: 'RACK', categoria: 'Móveis' },
    { palavra: 'FACA', categoria: 'Cozinha' }, { palavra: 'POTE', categoria: 'Cozinha' },
    { palavra: 'COPO', categoria: 'Cozinha' }, { palavra: 'BOLO', categoria: 'Cozinha' },
    { palavra: 'SOL', categoria: 'Natureza' }, { palavra: 'LUA', categoria: 'Natureza' },
    { palavra: 'MAR', categoria: 'Natureza' }, { palavra: 'CEU', categoria: 'Natureza' },

    // MÉDIAS (5 a 7 letras) - 20 palavras
    { palavra: 'TIGRE', categoria: 'Animais' }, { palavra: 'ZEBRA', categoria: 'Animais' },
    { palavra: 'COELHO', categoria: 'Animais' }, { palavra: 'CAVALO', categoria: 'Animais' },
    { palavra: 'BANANA', categoria: 'Frutas' }, { palavra: 'MAMÃO', categoria: 'Frutas' },
    { palavra: 'LARANJA', categoria: 'Frutas' }, { palavra: 'ABACAXI', categoria: 'Frutas' },
    { palavra: 'CADEIRA', categoria: 'Móveis' }, { palavra: 'ESTANTE', categoria: 'Móveis' },
    { palavra: 'ARMÁRIO', categoria: 'Móveis' }, { palavra: 'GAVETA', categoria: 'Móveis' },
    { palavra: 'TALHER', categoria: 'Cozinha' }, { palavra: 'PANELA', categoria: 'Cozinha' },
    { palavra: 'FRIGIDE', categoria: 'Cozinha' }, { palavra: 'CHALEIRA', categoria: 'Cozinha' },
    { palavra: 'NUVEM', categoria: 'Natureza' }, { palavra: 'TROVÃO', categoria: 'Natureza' },
    { palavra: 'VULCÃO', categoria: 'Natureza' }, { palavra: 'DESERTO', categoria: 'Natureza' },

    // DIFÍCEIS (8 ou mais letras) - 10 palavras
    { palavra: 'ELEFANTE', categoria: 'Animais' }, { palavra: 'ESQUILO', categoria: 'Animais' },
    { palavra: 'MORANGO', categoria: 'Frutas' }, { palavra: 'TANGERINA', categoria: 'Frutas' },
    { palavra: 'GUARDA-ROUPA', categoria: 'Móveis' }, { palavra: 'POLTRONA', categoria: 'Móveis' },
    { palavra: 'MICROONDAS', categoria: 'Cozinha' }, { palavra: 'GELADEIRA', categoria: 'Cozinha' },
    { palavra: 'TEMPESTADE', categoria: 'Natureza' }, { palavra: 'CACHOEIRA', categoria: 'Natureza' }
];

//============================================================

let palavraSecreta = '', letrasDescobertas = [], letrasTentadas = [], erros = 0, jogador = '';
let ranking = []; 
const maxErros = 6;

function mostrarRanking() {
    console.log('\n--- RANKING GERAL ---');
    
    // Carrega o ranking atual do arquivo (o arquivo deve existir ou a função cria um vazio)
    const rankingAtual = carregarRanking();
    
    if (rankingAtual.length === 0) {
        console.log('Nenhum jogo registrado ainda.');
    } else {
        rankingAtual.forEach((r, index) => {
            console.log(`${index + 1}. ${r.nome} - ${r.pontos} pts`);
        });
    }
    console.log('---------------------');
}


function carregarRanking() 
{
    if (!fs.existsSync('ranking.json')) {
        fs.writeFileSync('ranking.json', '[]');
        return [];
    }
    const dados = fs.readFileSync('ranking.json', 'utf8');
    return JSON.parse(dados);
}

function salvarRanking(ranking) 
{
    fs.writeFileSync('ranking.json', JSON.stringify(ranking, null, 2));
}

function iniciarJogo() 
{
    console.log('--- BEM-VINDO AO JOGO DA FORCA ---');
    rl.question('Digite seu nome: ', (nome) => 
    {
        jogador = nome;
        
        console.log(`\nOlá, ${jogador}!`);
        console.log('--- COMO FUNCIONA A PONTUAÇÃO ---');
        console.log('1. Palavras maiores valem mais (10 pts por letra).');
        console.log('2. Cada erro subtrai 5 pontos.');
        console.log('3. O objetivo é vencer com o menor número de erros possível!');
        console.log('---------------------------------');
        
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
        else 
        {
            console.log('Opção inválida!');
            return escolherDificuldade();
        }

        const sorteio = filtro[Math.floor(Math.random() * filtro.length)];
        palavraSecreta = sorteio.palavra;
        categoria = sorteio.categoria; // Salva a categoria na variável global
        letrasDescobertas = Array(palavraSecreta.length).fill('_');
        
        jogar(); // Chama o jogar, que cuidará de exibir a categoria na tela limpa
    });
}

function jogar() 
{
    console.clear();
    console.log(forcaEstagios[erros]);
    
    // Exibe a categoria sempre que a tela for redesenhada
    console.log(`\nCategoria: ${categoria}`); 
    console.log(`Palavra: ${letrasDescobertas.join(' ')} | Erros: ${erros}/${maxErros}`);
    console.log(`Letras tentadas: ${letrasTentadas.join(', ')}`);
    
    rl.question('Digite uma letra: ', (letra) => {
        letra = letra.toUpperCase();
        
        if (letrasTentadas.includes(letra)) { 
            console.log('Você já tentou essa letra!'); 
            return jogar(); 
        }
        
        letrasTentadas.push(letra);

        if (palavraSecreta.includes(letra)) {
            palavraSecreta.split('').forEach((l, i) => { if (l === letra) letrasDescobertas[i] = letra; });
        } else { 
            erros++; 
            console.log(`\nOpção errada! A letra ${letra} não existe na palavra.`);
        }

        if (erros >= maxErros) { 
            console.clear();
            console.log(forcaEstagios[erros]);
            console.log(`\nFim de jogo! Você perdeu. A palavra era: ${palavraSecreta}`);
            perguntarNovamente(); 
        }
        else if (!letrasDescobertas.includes('_')) { 
            let ptsFinais = (palavraSecreta.length * 10) - (erros * 5);
            ptsFinais = ptsFinais > 0 ? ptsFinais : 0;
            
            let ranking = carregarRanking();
            let jogadorExistente = ranking.find(r => r.nome.toUpperCase() === jogador.toUpperCase());

            if (jogadorExistente) {
                jogadorExistente.pontos += ptsFinais;
            } else {
                ranking.push({ nome: jogador, pontos: ptsFinais });
            }

            ranking.sort((a, b) => b.pontos - a.pontos);
            salvarRanking(ranking);
            
            console.log(`\nParabéns! Você venceu e somou ${ptsFinais} pontos.`);
            mostrarRanking();
            perguntarNovamente(); 
        }
        else { 
            jogar(); 
        }
    });
}

function perguntarNovamente() 
{
    rl.question('\nJogar de novo? (s/n): ', (resp) => 
    {
        if (resp.toLowerCase() === 's') 
        { 
            erros = 0; 
            letrasTentadas = []; 
            escolherDificuldade(); 
        }
        else 
        { 
            console.log('Até mais!');
            rl.close(); 
        }
    });
}

iniciarJogo();
