// art.js

// Este array contém os desenhos para cada nível de erros (0 a 6).
// Ele é exportado para ser usado no arquivo principal.

const forcaEstagios = [
  // 0 erros: Apenas a estrutura da forca
  `
    +---+
    |   |
        |
        |
        |
        |
    =========
  `,
  // 1 erro: Cabeça
  `
    +---+
    |   |
    O   |
        |
        |
        |
    =========
  `,
  // 2 erros: Cabeça e Tronco
  `
    +---+
    |   |
    O   |
    |   |
        |
        |
    =========
  `,
  // 3 erros: Cabeça, Tronco e um Braço
  `
    +---+
    |   |
    O   |
   /|   |
        |
        |
    =========
  `,
  // 4 erros: Cabeça, Tronco e os dois Braços
  `
    +---+
    |   |
    O   |
   /|\\  |
        |
        |
    =========
  `,
  // 5 erros: Cabeça, Tronco, dois Braços e uma Perna
  `
    +---+
    |   |
    O   |
   /|\\  |
   /    |
        |
    =========
  `,
  // 6 erros: Boneco Completo (Fim de Jogo)
  `
    +---+
    |   |
    O   |
   /|\\  |
   / \\  |
        |
    =========
  `
];

// Exporta o array para que possa ser importado no index.js
module.exports = forcaEstagios;
