Atue como um desenvolvedor Front-end sênior. Vamos construir o jogo **"Cruzadinha de Arquitetura Computacional"** em etapas (2 dias de desenvolvimento). 

Nesta **Etapa 1 (Dia 1)**, crie apenas a base estrutural, o layout visual e a renderização estática/inicial do tabuleiro e das pistas usando **HTML5, CSS3 e JavaScript puro (Vanilla JS)**. **Não implemente ainda** a lógica de validação de respostas (botão Conferir), contador dinâmico de acertos, reinicialização ou documentação (`README.md`) — isso ficará para a Etapa 2.

### 1. Arquivos a serem criados na raiz
- `index.html`
- `style.css`
- `script.js`

### 2. Requisitos do `index.html`
- Estrutura semântica contendo:
  - Cabeçalho com o título `"Cruzadinha de Arquitetura Computacional"`.
  - Área de status com um placeholder para o contador (`"0 de 12 palavras"`).
  - Container principal dividindo o tabuleiro à esquerda e as listas de pistas (**Horizontais** e **Verticais**) à direita.
  - Área de controles com os botões **Conferir** e **Reiniciar** já posicionados no HTML (ainda sem funcionalidade no JS).

### 3. Requisitos do `style.css`
- Design limpo, moderno e responsivo com tema de hardware/tecnologia.
- Estilização do grid da cruzadinha:
  - Células inativas/bloqueadas com fundo escuro sólido.
  - Células ativas com borda definida, suporte a um número pequeno no canto superior esquerdo e campo de texto centralizado em caixa alta (`text-transform: uppercase`).
- Layout flexível ou CSS Grid para exibir o tabuleiro ao lado das colunas **Horizontais** e **Verticais**.

### 4. Requisitos do `script.js` (Apenas dados e renderização)
- Crie a estrutura de dados (array de objetos) contendo **pelo menos 12 palavras** da lista oficial abaixo, todas **cruzadas entre si** (cada palavra intercepta pelo menos uma outra) em uma matriz válida sem conflitos de letras:
  1. `CPU` — "Cérebro do computador que busca e executa instruções; reúne ULA, UC e registradores."
  2. `ULA` — "Parte da CPU que realiza cálculos matemáticos e operações lógicas."
  3. `UC` — "Componente da CPU que interpreta instruções e envia ordens às demais partes."
  4. `REGISTRADORES` — "Pequenas memórias ultrarrápidas dentro da CPU que guardam dados em uso imediato."
  5. `RAM` — "Memória de trabalho volátil que guarda programas em execução e suas variáveis."
  6. `ROM` — "Memória não volátil que armazena o firmware de inicialização do equipamento."
  7. `EEPROM` — "Pequena memória não volátil do Arduino que guarda configurações após desligar."
  8. `FLASH` — "Memória não volátil e regravável onde fica salvo o programa do Arduino."
  9. `CACHE` — "Memória rápida dentro do processador com cópias de dados usados recentemente."
  10. `MEMORIADEMASSA` — "Armazenamento permanente de arquivos e programas, como SSD ou HD."
  11. `DMA` — "Técnica que transfere dados entre dispositivos e RAM sem ocupar a CPU."
  12. `ADDRESSBUS` — "Fios que saem da CPU indicando o local exato da memória a acessar."
  13. `DATABUS` — "Caminho bidirecional por onde trafegam instruções e valores lidos ou escritos."
  14. `MICROCONTROLADOR` — "Chip único que integra CPU, memória e pinos de entrada e saída."
  15. `DUALCORE` — "Processador que possui dois núcleos independentes de processamento no mesmo chip."
  16. `QUADCORE` — "Processador equipado com quatro núcleos físicos para executar tarefas simultaneamente."
- Implemente apenas a função que monta a matriz, renderiza as células (`<input maxlength="1">`) com os números iniciais no tabuleiro e preenche as listas numeradas de **Horizontais** e **Verticais** no HTML.
- Inclua apenas a conversão automática para maiúscula ao digitar na célula.

Valide matematicamente as coordenadas `(linha, coluna)` de cada palavra antes de gerar o `script.js` para garantir que todos os cruzamentos batam exatamente na mesma letra.
