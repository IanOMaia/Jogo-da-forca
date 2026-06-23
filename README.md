# Jogo-da-forca
Jogo da Forca desenvolvido em JavaScript (Node.js) como atividade avaliativa da disciplina de Web-I do professor Arthur Faria Porto do instituto federal do norte de minas gerais (IFNMG).
##### Autor
Desenvolvido por Ian oliveira Maia 
***
​Um jogo da forca clássico desenvolvido em Node.js, com sistema de ranking persistente, interface visual via terminal (ASCII Art) e banco de palavras categorizado.
### ​Estrutura do Projeto
​O projeto foi modularizado para facilitar a manutenção e a legibilidade:
* ​index.js: O "coração" do jogo. Contém toda a lógica de execução, processamento de entradas, cálculo de pontuação, sorteio de palavras e integração com os demais arquivos.
* ​art.js: Arquivo dedicado apenas à parte visual. Contém os estágios do boneco da forca em formato ASCII, mantendo o index.js limpo.
* ​ranking.json: O banco de dados do jogo. Armazena as pontuações dos usuários em formato JSON, permitindo que o progresso seja salvo mesmo após fechar o terminal.
* package.json: Arquivo de configuração do projeto Node.js. Gerencia as dependências e as metainformações da aplicação.
### ​Como executar
* ​Certifique-se de ter o Node.js instalado em sua máquina.
* ​Clone este repositório ou baixe os arquivos para uma pasta.
* ​No seu terminal, navegue até a pasta do projeto.
​Execute o comando:
node index.js
### Funcionalidades
* ​Dificuldade Variável: Escolha entre Fácil, Médio ou Difícil.
* ​Ranking Persistente: O jogo salva e acumula sua pontuação total. Se você jogar novamente, seus pontos serão somados no ranking geral.
* Feedback Visual: Acompanhe o progresso do boneco conforme você comete erros.
* ​Sistema de Pontuação: Cálculos baseados no tamanho da palavra e na quantidade de erros cometidos.
#### Tecnologias
​Node.js - Ambiente de execução JavaScript.
