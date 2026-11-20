/*
  script.js
  - monta uma matriz de cruzadinha a partir de uma lista de palavras + dicas
  - valida conflitos de letras matematicamente
  - renderiza o tabuleiro (inputs) e as listas de pistas horizontais/verticais
  Observação: não implementa lógica de conferir ou reiniciar (apenas botões estáticos)
*/

(function(){
  const WORDS = [
    {word: 'MEMORIADEMASSA', clue: 'Armazenamento permanente de arquivos e programas, como SSD ou HD.'},
    {word: 'REGISTRADORES', clue: 'Pequenas memórias ultrarrápidas dentro da CPU que guardam dados em uso imediato.'},
    {word: 'ADDRESSBUS', clue: 'Fios que saem da CPU indicando o local exato da memória a acessar.'},
    {word: 'DATABUS', clue: 'Caminho bidirecional por onde trafegam instruções e valores lidos ou escritos.'},
    {word: 'EEPROM', clue: 'Pequena memória não volátil do Arduino que guarda configurações após desligar.'},
    {word: 'FLASH', clue: 'Memória não volátil e regravável onde fica salvo o programa do Arduino.'},
    {word: 'CACHE', clue: 'Memória rápida dentro do processador com cópias de dados usados recentemente.'},
    {word: 'DUALCORE', clue: 'Processador que possui dois núcleos independentes de processamento no mesmo chip.'},
    {word: 'QUADCORE', clue: 'Processador equipado com quatro núcleos físicos para executar tarefas simultaneamente.'},
    {word: 'CPU', clue: 'Cérebro do computador que busca e executa instruções; reúne ULA, UC e registradores.'},
    {word: 'RAM', clue: 'Memória de trabalho volátil que guarda programas em execução e suas variáveis.'},
    {word: 'DMA', clue: 'Técnica que transfere dados entre dispositivos e RAM sem ocupar a CPU.'}
  ];

  const ROWS = 15;
  const COLS = 15;

  // build empty grid
  function createEmptyGrid(r,c){
    const grid = [];
    for(let i=0;i<r;i++){
      const row = new Array(c).fill(null);
      grid.push(row);
    }
    return grid;
  }

  // attempt to place words with intersections
  function placeWords(words){
    const grid = createEmptyGrid(ROWS,COLS);
    const placements = [];

    // sort by length desc to place long words first
    const list = words.slice().sort((a,b)=>b.word.length - a.word.length);

    // helper to check fit
    function canPlaceAcross(r,c,word){
      if(c<0 || c+word.length>COLS) return false;
      for(let i=0;i<word.length;i++){
        const ch = grid[r][c+i];
        if(ch !== null && ch !== word[i]) return false;
      }
      return true;
    }
    function canPlaceDown(r,c,word){
      if(r<0 || r+word.length>ROWS) return false;
      for(let i=0;i<word.length;i++){
        const ch = grid[r+i][c];
        if(ch !== null && ch !== word[i]) return false;
      }
      return true;
    }

    // place first word in the middle row centered
    const first = list.shift();
    const startCol = Math.max(0, Math.floor((COLS - first.word.length)/2));
    const startRow = Math.floor(ROWS/2) - 2; // a bit above center
    for(let i=0;i<first.word.length;i++) grid[startRow][startCol+i] = first.word[i];
    placements.push({...first, row:startRow, col:startCol, dir:'across'});

    // for each remaining word, try to find an intersection with already placed letters
    for(const w of list){
      let placed = false;
      const word = w.word;
      // scan grid for any matching letter
      for(let r=0;r<ROWS && !placed;r++){
        for(let c=0;c<COLS && !placed;c++){
          const ch = grid[r][c];
          if(ch === null) continue;
          // try to align word letter j with grid[r][c]
          for(let j=0;j<word.length && !placed;j++){
            if(word[j] !== ch) continue;
            // try place across with j matched at (r,c)
            const startC = c - j;
            if(canPlaceAcross(r,startC,word)){
              for(let k=0;k<word.length;k++) grid[r][startC+k] = word[k];
              placements.push({...w, row:r, col:startC, dir:'across'});
              placed = true; break;
            }
            // try place down with j matched at (r,c)
            const startR = r - j;
            if(canPlaceDown(startR,c,word)){
              for(let k=0;k<word.length;k++) grid[startR+k][c] = word[k];
              placements.push({...w, row:startR, col:c, dir:'down'});
              placed = true; break;
            }
          }
        }
      }

      if(!placed){
        // fallback: try any position without intersection (avoid if possible)
        outer:
        for(let r=0;r<ROWS && !placed;r++){
          for(let c=0;c<COLS && !placed;c++){
            if(canPlaceAcross(r,c,word)){
              for(let k=0;k<word.length;k++) grid[r][c+k] = word[k];
              placements.push({...w,row:r,col:c,dir:'across'});
              placed = true; break outer;
            }
            if(canPlaceDown(r,c,word)){
              for(let k=0;k<word.length;k++) grid[r+k][c] = word[k];
              placements.push({...w,row:r,col:c,dir:'down'});
              placed = true; break outer;
            }
          }
        }
      }

      if(!placed){
        console.error('Não foi possível posicionar a palavra:', w.word);
        throw new Error('Falha ao posicionar todas as palavras');
      }
    }

    return {grid, placements};
  }

  // validate that every intersection has same letter and that each word intersects at least one other
  function validate(grid, placements){
    // check intersections consistency already enforced during placement
    // ensure each placement has at least one crossing (except maybe the first)
    const posMap = {};
    for(const p of placements){
      for(let i=0;i<p.word.length;i++){
        const r = p.row + (p.dir==='down'?i:0);
        const c = p.col + (p.dir==='across'?i:0);
        const key = r+','+c;
        posMap[key] = (posMap[key]||0) + 1;
      }
    }
    // count words with at least one cell that is shared
    let withCross=0;
    for(const p of placements){
      let crosses=false;
      for(let i=0;i<p.word.length;i++){
        const r = p.row + (p.dir==='down'?i:0);
        const c = p.col + (p.dir==='across'?i:0);
        if(posMap[r+','+c] > 1){ crosses=true; break; }
      }
      if(crosses) withCross++;
    }
    if(withCross < placements.length){
      console.warn('Algumas palavras não cruzam com outras. Palavras com cruzamento:', withCross, '/', placements.length);
    }
  }

  // create visual board: blocked cells where grid is null
  function render(grid, placements){
    const boardEl = document.getElementById('board');
    const acrossList = document.getElementById('acrossList');
    const downList = document.getElementById('downList');
    const statusEl = document.getElementById('status');

    // set grid template based on size
    boardEl.style.gridTemplateColumns = `repeat(${COLS}, 44px)`;

    // compute starting numbers: cell where a word starts receives a number
    const numberMap = {};
    let nextNumber = 1;
    for(const p of placements){
      const key = p.row + ',' + p.col;
      if(!numberMap[key]) numberMap[key] = nextNumber++;
    }

    // render cells
    for(let r=0;r<ROWS;r++){
      for(let c=0;c<COLS;c++){
        const ch = grid[r][c];
        const cell = document.createElement('div');
        if(ch === null){
          cell.className = 'cell blocked';
        } else {
          cell.className = 'cell';
          // number if present
          const key = r+','+c;
          if(numberMap[key]){
            const span = document.createElement('span');
            span.className = 'cell-number';
            span.textContent = numberMap[key];
            cell.appendChild(span);
          }
          const input = document.createElement('input');
          input.maxLength = 1;
          input.dataset.row = r; input.dataset.col = c;
          // uppercase conversion
          input.addEventListener('input', (e)=>{
            e.target.value = (e.target.value || '').toUpperCase().slice(0,1);
          });
          cell.appendChild(input);
        }
        boardEl.appendChild(cell);
      }
    }

    // build clues lists: assign numbers to placements (use same numbering map for starts)
    const across = placements.filter(p=>p.dir==='across').map(p=>({
      number: numberMap[p.row+','+p.col],
      clue: p.clue,
      word: p.word
    }));
    const down = placements.filter(p=>p.dir==='down').map(p=>({
      number: numberMap[p.row+','+p.col],
      clue: p.clue,
      word: p.word
    }));

    // sort by number
    across.sort((a,b)=>a.number - b.number);
    down.sort((a,b)=>a.number - b.number);

    across.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.number}. ${item.clue}`;
      acrossList.appendChild(li);
    });
    down.forEach(item => {
      const li = document.createElement('li');
      li.textContent = `${item.number}. ${item.clue}`;
      downList.appendChild(li);
    });

    // status update
    statusEl.textContent = `0 de ${placements.length} palavras`;

    // (buttons are present but non funcionais at this stage)
    document.getElementById('checkBtn').addEventListener('click', ()=>{
      // intentionally left unimplemented for Etapa 1
      console.log('Conferir clicado — funcionalidade a ser implementada na Etapa 2');
    });
    document.getElementById('resetBtn').addEventListener('click', ()=>{
      console.log('Reiniciar clicado — funcionalidade a ser implementada na Etapa 2');
    });
  }

  // run placement, validation, rendering
  try{
    const {grid, placements} = placeWords(WORDS);
    validate(grid, placements);
    render(grid, placements);
    // export placements to console for inspection
    console.log('Placements:', placements);
  }catch(err){
    console.error('Erro ao montar a cruzadinha:', err);
  }

})();
