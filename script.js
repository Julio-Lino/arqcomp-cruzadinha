'use strict';

/*
 * NEXUS OS — Operação Zero-Day
 * Cruzadinha educativa em um desktop fictício estilo Windows.
 * Não acessa redes, sistemas reais nem dados pessoais.
 * Cada acerto libera uma pasta com dica da próxima palavra.
 * Pedir ajuda deixa logs e aumenta o rastreamento; abrir pastas é gratuito.
 */

// As 16 palavras são exatamente as do caderno da atividade.
// Coordenadas usam índices de base zero. H = horizontal; V = vertical.
const palavras = [
  { resposta: 'CPU', linha: 4, coluna: 13, direcao: 'H', pista: 'Peça principal que executa as instruções do computador.', facil: 'É o cérebro do computador e tem três letras.', extra: 'Fica no encaixe principal da placa-mãe e executa programas.' },
  { resposta: 'ULA', linha: 4, coluna: 15, direcao: 'V', pista: 'Circuito responsável por cálculos e comparações lógicas.', facil: 'É a parte que soma números e faz comparações. Três letras.', extra: 'Pense na parte que trabalha com contas matemáticas dentro do processador.' },
  { resposta: 'UC', linha: 3, coluna: 13, direcao: 'V', pista: 'Organiza operações e envia comandos às demais partes do processador.', facil: 'Duas letras. Essa parte organiza e dá comandos às outras partes.', extra: 'É como o maestro do processador: decide a sequência das tarefas.' },
  { resposta: 'REGISTRADORES', linha: 0, coluna: 9, direcao: 'V', pista: 'Pequenos espaços internos que guardam valores usados imediatamente no processamento.', facil: 'São espaços minúsculos e muito rápidos dentro do processador.', extra: 'Guardam resultados temporários diretamente no processador.' },
  { resposta: 'RAM', linha: 8, coluna: 17, direcao: 'H', pista: 'Guarda temporariamente dados usados pelos aplicativos abertos.', facil: 'Três letras. Quando você desliga o PC, seu conteúdo desaparece.', extra: 'Quanto mais aplicativos abertos, mais dessa memória é usada.' },
  { resposta: 'ROM', linha: 0, coluna: 9, direcao: 'H', pista: 'Guarda instruções permanentes mesmo depois de desligar o aparelho.', facil: 'Três letras. Ao contrário da memória de trabalho, não esquece tudo ao desligar.', extra: 'Costuma guardar instruções básicas de inicialização.' },
  { resposta: 'EEPROM', linha: 1, coluna: 5, direcao: 'V', pista: 'Memória não volátil apagada e regravada com eletricidade.', facil: 'Sete letras. Armazena dados sem energia e permite regravação elétrica.', extra: 'É comum em ajustes pequenos que precisam continuar salvos sem energia.' },
  { resposta: 'FLASH', linha: 11, coluna: 15, direcao: 'H', pista: 'Tecnologia de armazenamento regravável presente em pendrives.', facil: 'Cinco letras. É a tecnologia usada em pendrives e muitos SSDs.', extra: 'Você a encontra em cartões de memória e unidades USB.' },
  { resposta: 'CACHE', linha: 5, coluna: 11, direcao: 'V', pista: 'Guarda cópias de dados frequentes para acelerar o acesso.', facil: 'Cinco letras. Memória muito rápida que evita buscar os mesmos dados novamente.', extra: 'Fica perto do processador e economiza tempo em acessos repetidos.' },
  { resposta: 'MEMORIADEMASSA', linha: 6, coluna: 5, direcao: 'H', pista: 'Armazena muitos arquivos por longo prazo, como fotos e vídeos.', facil: 'Quinze letras, sem espaços. HD e SSD são exemplos desse tipo de armazenamento.', extra: 'É onde ficam jogos, fotos, documentos e arquivos mesmo depois de desligar.' },
  { resposta: 'DMA', linha: 5, coluna: 7, direcao: 'V', pista: 'Permite transferência direta entre periféricos e memória com menos trabalho do processador.', facil: 'Três letras. Permite que dispositivos enviem dados diretamente para a memória.', extra: 'Essa técnica evita que o processador acompanhe cada pedacinho da transferência.' },
  { resposta: 'ADDRESSBUS', linha: 12, coluna: 3, direcao: 'H', pista: 'Indica a localização onde componentes devem ler ou gravar dados.', facil: 'Dez letras. É o caminho que informa o endereço do local desejado.', extra: 'Uma via diz ONDE acessar e outra leva O QUE será transferido.' },
  { resposta: 'DATABUS', linha: 5, coluna: 18, direcao: 'V', pista: 'Transporta valores binários entre partes de um computador.', facil: 'Sete letras. É a via que transporta os próprios dados entre componentes.', extra: 'Ao contrário da via de endereços, esta carrega os valores transferidos.' },
  { resposta: 'MICROCONTROLADOR', linha: 10, coluna: 0, direcao: 'H', pista: 'Pequeno circuito programável que reúne processamento, memória e entradas ou saídas.', facil: 'Dezesseis letras. É o chip programável usado em muitos projetos com Arduino.', extra: 'Pode controlar sensores, LEDs e pequenos aparelhos sozinho.' },
  { resposta: 'DUALCORE', linha: 3, coluna: 12, direcao: 'H', pista: 'Configuração de processamento com dois núcleos.', facil: 'Oito letras, sem espaço. Pense em um processador com dois núcleos.', extra: 'O termo em inglês começa com uma palavra que indica dois.' },
  { resposta: 'QUADCORE', linha: 9, coluna: 4, direcao: 'H', pista: 'Configuração de processamento com quatro núcleos.', facil: 'Oito letras, sem espaço. Pense em um processador com quatro núcleos.', extra: 'O nome em inglês começa com uma palavra relacionada a quatro.' }
];

// Explicações para pessoas que nunca estudaram hardware.
const exemplosChrome = ['É como o cérebro do PC: executa o que você manda, como abrir jogos e aplicativos.',
  'É a parte que faz continhas, como 2 + 2, e compara resultados.',
  'É como o maestro de uma banda: manda cada peça trabalhar na hora certa.',
  'São pequenos espaços dentro do processador, usados para guardar números por instantes.',
  'É a memória que ajuda o computador a manter muitos aplicativos abertos ao mesmo tempo.',
  'É a memória que guarda instruções mesmo depois que o aparelho é desligado.',
  'É uma memória cujo conteúdo pode ser apagado e regravado com sinais elétricos.',
  'É o tipo de memória usado no seu pendrive e em muitos cartões de memória.',
  'É uma memória super rápida que guarda coisas usadas várias vezes, acelerando o PC.',
  'É onde seus arquivos ficam guardados por anos: pense no HD ou SSD.',
  'É uma sigla de três letras para transferir dados sem ocupar tanto o processador.',
  'É a via que indica PARA ONDE os dados vão, como um endereço de entrega.',
  'É a via por onde os dados VIAJAM, como carros numa estrada.',
  'É um pequeno computador dentro de um único chip, usado para controlar sensores e robôs.',
  'É o nome em inglês para processador com DOIS núcleos.',
  'É o nome em inglês para processador com QUATRO núcleos.'];

const arquivos = [
  '01_inicializacao', '02_calculadora', '03_ordens', '04_arquitetura',
  '05_execucao', '06_firmware', '07_configuracoes', '08_pendrive',
  '09_desempenho', '10_armazenamento', '11_transferencias', '12_enderecos',
  '13_barramentos', '14_eletronica', '15_nucleos', '16_dossie_final'
];

const $ = seletor => document.querySelector(seletor);
const percurso = palavra => [...palavra.resposta].map((_, i) => [
  palavra.linha + (palavra.direcao === 'V' ? i : 0),
  palavra.coluna + (palavra.direcao === 'H' ? i : 0)
]);
const idCasa = (l, c) => `${l}-${c}`;
const entradas = new Map();
const participacoes = new Map();
const pistas = new Map();
const pastas = [];
const concluidas = new Set();
let etapa = 0;
let selecionada = 0;
let rastreamento = 0;
let somAtivado = true;
let contextoAudio = null;
let maiorZ = 12;
const pastasLidas = new Set();
const dicasUsadas = new Map();

// A numeração é única (01 a 16), na ordem de desbloqueio das pastas.
// Quando duas palavras começam na mesma casa, mostramos os dois números juntos.
palavras.forEach((palavra, indice) => { palavra.numero = indice + 1; });
const numerosInicio = new Map();
palavras.forEach(p => {
  const inicio = idCasa(p.linha, p.coluna);
  if (!numerosInicio.has(inicio)) numerosInicio.set(inicio, []);
  numerosInicio.get(inicio).push(p.numero);
});
const identificacao = p => `Pista ${String(p.numero).padStart(2, '0')} • ${p.direcao === 'H' ? 'HORIZONTAL' : 'VERTICAL'}`;
const posicaoInicial = p => `linha ${p.linha + 1}, coluna ${p.coluna + 1}`;
let perdeu = false;
let bootIniciado = false;
let vpnConectada = false;
const dicasChrome = new Set();

// Simula a inicialização de um computador sem acessar arquivos ou redes reais.
function iniciarBoot() {
  if (bootIniciado) return;
  bootIniciado = true;
  const mensagens = [
    'Iniciando NexusOS...',
    'Carregando área de trabalho...',
    'Montando unidade fictícia N:...',
    'Conectando ao terminal educacional...',
    'Sistema pronto.'
  ];
  let passo = 0;
  let encerrado = false;
  const barra = $('#bootProgress');
  const mensagem = $('#bootMessage');
  const concluir = () => {
    if (encerrado) return;
    encerrado = true;
    clearInterval(intervalo);
    $('#bootScreen').classList.add('boot-finished');
    setTimeout(() => {
      $('#bootScreen').classList.add('hidden');
      // O Bloco de Notas é o único aplicativo aberto automaticamente após o boot.
      document.querySelectorAll('.os-window').forEach(janela => janela.classList.add('hidden-window'));
      abrirJanela('notes');
      mostrarAviso('Leia as regras em Instruções.txt. Depois, abra o Explorador para iniciar a missão.');
    }, 350);
  };
  const intervalo = setInterval(() => {
    passo++;
    barra.style.width = `${Math.min(100, passo * 20)}%`;
    mensagem.textContent = mensagens[Math.min(passo, mensagens.length - 1)];
    if (passo >= 5) concluir();
  }, 440);
  $('#skipBoot').addEventListener('click', concluir, {once: true});
}

// Validações internas para detectar alterações incorretas nas coordenadas.
function validarGrade() {
  const mapeamento = new Map();
  palavras.forEach((palavra, i) => {
    percurso(palavra).forEach(([l, c], pos) => {
      const chave = idCasa(l, c);
      const atual = mapeamento.get(chave) || [];
      if (atual.some(item => item.letra !== palavra.resposta[pos] || item.direcao === palavra.direcao)) {
        throw new Error(`Conflito na grade: ${chave}`);
      }
      atual.push({ indice: i, letra: palavra.resposta[pos], direcao: palavra.direcao });
      mapeamento.set(chave, atual);
    });
  });
  palavras.forEach((p, i) => {
    if (!percurso(p).some(([l, c]) => mapeamento.get(idCasa(l, c)).length > 1)) {
      throw new Error(`Palavra sem cruzamento: ${p.resposta}`);
    }
    if (p.pista.trim().split(/\s+/).length > 15) {
      throw new Error(`Pista acima do limite: ${p.resposta}`);
    }
  });
  return mapeamento;
}
const grade = validarGrade();

// ---------- SIMULAÇÃO DE SISTEMA OPERACIONAL ----------
function trazerFrente(nome) {
  const janela = $(`#window-${nome}`);
  janela.style.zIndex = String(++maiorZ);
}
function abrirJanela(nome) {
  const janela = $(`#window-${nome}`);
  if (nome === 'browser') atualizarBrowser();
  janela.classList.remove('hidden-window');
  trazerFrente(nome);
  $('#startMenu').classList.add('hidden');
}
function fecharJanela(nome) {
  $(`#window-${nome}`).classList.add('hidden-window');
}
function maximizar(nome) {
  const janela = $(`#window-${nome}`);
  janela.classList.toggle('maximized');
  if (janela.classList.contains('maximized')) {
    janela.style.left = '';
    janela.style.top = '';
  }
  trazerFrente(nome);
}

document.querySelectorAll('[data-open]').forEach(b => b.addEventListener('click', () => abrirJanela(b.dataset.open)));
document.querySelectorAll('[data-close]').forEach(b => b.addEventListener('click', () => fecharJanela(b.dataset.close)));
document.querySelectorAll('[data-min]').forEach(b => b.addEventListener('click', () => fecharJanela(b.dataset.min)));
document.querySelectorAll('[data-max]').forEach(b => b.addEventListener('click', () => maximizar(b.dataset.max)));
document.querySelectorAll('.os-window').forEach(j => j.addEventListener('pointerdown', () => trazerFrente(j.dataset.window)));
document.querySelectorAll('[data-drag]').forEach(barra => {
  barra.addEventListener('pointerdown', evento => {
    if (evento.button !== 0 || evento.target.closest('button') || matchMedia('(max-width:780px)').matches) return;
    const nome = barra.dataset.drag;
    const janela = $(`#window-${nome}`);
    if (janela.classList.contains('maximized')) return;
    const retangulo = janela.getBoundingClientRect();
    const deslocamentoX = evento.clientX - retangulo.left;
    const deslocamentoY = evento.clientY - retangulo.top;
    barra.setPointerCapture(evento.pointerId);
    trazerFrente(nome);
    const mover = e => {
      const esquerda = Math.max(0, Math.min(innerWidth - janela.offsetWidth, e.clientX - deslocamentoX));
      const topo = Math.max(0, Math.min(innerHeight - 60 - janela.offsetHeight, e.clientY - deslocamentoY));
      janela.style.left = `${esquerda}px`;
      janela.style.top = `${topo}px`;
      janela.style.right = 'auto';
    };
    const parar = () => {
      barra.removeEventListener('pointermove', mover);
      barra.removeEventListener('pointerup', parar);
      barra.removeEventListener('pointercancel', parar);
    };
    barra.addEventListener('pointermove', mover);
    barra.addEventListener('pointerup', parar);
    barra.addEventListener('pointercancel', parar);
  });
});
$('#startButton').addEventListener('click', () => $('#startMenu').classList.toggle('hidden'));
document.addEventListener('pointerdown', e => {
  if (!e.target.closest('#startButton') && !e.target.closest('#startMenu')) $('#startMenu').classList.add('hidden');
});
function atualizarRelogio() {
  const agora = new Date();
  $('#clock').innerHTML = `${agora.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'})}<br>${agora.toLocaleDateString('pt-BR')}`;
}
atualizarRelogio();
setInterval(atualizarRelogio, 30000);

// ---------- LOGS, RASTREAMENTO E EFEITOS SONOROS ----------
function registrar(mensagem, nivel = 'info') {
  const linha = document.createElement('div');
  linha.className = nivel;
  const prefixo = document.createElement('span');
  prefixo.textContent = nivel === 'warning' ? '[ALERTA] ' : nivel === 'success' ? '[ACESSO] ' : '[LOG] ';
  const hora = new Date().toLocaleTimeString('pt-BR');
  linha.append(prefixo, document.createTextNode(`${hora} ${mensagem}`));
  $('#logs').appendChild(linha);
  while ($('#logs').children.length > 65) $('#logs').firstElementChild.remove();
  $('#logs').scrollTop = $('#logs').scrollHeight;
}
function atualizarRastreamento(valor, motivo) {
  rastreamento = Math.min(100, Math.max(0, rastreamento + valor));
  $('#trackingText').textContent = `${rastreamento}%`;
  $('#trackingFill').style.width = `${rastreamento}%`;
  $('#trackingBar').setAttribute('aria-valuenow', String(rastreamento));
  if (valor > 0) registrar(`${motivo}. Rastreamento: ${rastreamento}%.`, 'warning');
  if (rastreamento === 100 && valor > 0 && !perdeu) {
    perderPartida();
  }
}
function tocar(tipo) {
  if (!somAtivado) return;
  try {
    const API = window.AudioContext || window.webkitAudioContext;
    if (!API) return;
    if (!contextoAudio) contextoAudio = new API();
    if (contextoAudio.state === 'suspended') contextoAudio.resume();
    const frequencias = tipo === 'acerto' ? [630, 790, 990] : tipo === 'erro' ? [210, 140] : [560];
    frequencias.forEach((freq, i) => {
      const osc = contextoAudio.createOscillator();
      const ganho = contextoAudio.createGain();
      const inicio = contextoAudio.currentTime + i * 0.095;
      const duracao = tipo === 'letra' ? 0.035 : 0.12;
      osc.type = tipo === 'erro' ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, inicio);
      ganho.gain.setValueAtTime(0.025, inicio);
      ganho.gain.exponentialRampToValueAtTime(0.0001, inicio + duracao);
      osc.connect(ganho).connect(contextoAudio.destination);
      osc.start(inicio);
      osc.stop(inicio + duracao);
    });
  } catch (_) { /* Os efeitos são opcionais. */ }
}
let avisoTimer = null;
function mostrarAviso(texto) {
  $('#toast').textContent = texto;
  $('#toast').classList.remove('hidden');
  clearTimeout(avisoTimer);
  avisoTimer = setTimeout(() => $('#toast').classList.add('hidden'), 4200);
}

// ---------- TABULEIRO ----------
const linhas = Math.max(...palavras.flatMap(p => percurso(p).map(([l]) => l))) + 1;
const colunas = Math.max(...palavras.flatMap(p => percurso(p).map(([, c]) => c))) + 1;
const tabuleiro = $('#crossword');
tabuleiro.style.gridTemplateColumns = `repeat(${colunas}, var(--cell))`;
for (let l = 0; l < linhas; l++) {
  for (let c = 0; c < colunas; c++) {
    const id = idCasa(l, c);
    const celula = document.createElement('div');
    celula.className = 'cell';
    if (!grade.has(id)) {
      celula.classList.add('blocked');
      tabuleiro.appendChild(celula);
      continue;
    }
    participacoes.set(id, grade.get(id).map(item => item.indice));
    const comeco = palavras.find(p => p.linha === l && p.coluna === c);
    if (comeco) {
      const numero = document.createElement('span');
      numero.className = 'cell-number';
      numero.textContent = numerosInicio.get(id).map(v => String(v).padStart(2, '0')).join('/');
      celula.appendChild(numero);
    }
    const campo = document.createElement('input');
    campo.type = 'text';
    campo.maxLength = 1;
    campo.autocomplete = 'off';
    campo.autocapitalize = 'characters';
    campo.spellcheck = false;
    campo.setAttribute('aria-label', `Casa linha ${l + 1}, coluna ${c + 1}`);
    campo.addEventListener('focus', () => selecionarCasa(id, false));
    campo.addEventListener('click', () => selecionarCasa(id, true));
    campo.addEventListener('input', () => {
      if (perdeu || campo.readOnly) { campo.value = campo.dataset.lastValue || ''; return; }
      campo.value = campo.value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z]/g, '').slice(-1).toUpperCase();
      limparFeedback();
      campo.dataset.lastValue = campo.value;
      if (campo.value) { tocar('letra'); moverNaPalavra(id, 1); }
    });
    campo.addEventListener('keydown', evento => {
      if (perdeu) { evento.preventDefault(); return; }
      if (evento.key === 'Backspace') {
        evento.preventDefault();
        if (!campo.readOnly && campo.value) { campo.value = ''; campo.dataset.lastValue = ''; }
        else moverNaPalavra(id, -1);
        limparFeedback();
      }
      const direcoes = {ArrowLeft: [0,-1], ArrowRight: [0,1], ArrowUp: [-1,0], ArrowDown: [1,0]};
      if (direcoes[evento.key]) {
        evento.preventDefault();
        const [dl, dc] = direcoes[evento.key];
        const proxima = entradas.get(idCasa(l + dl, c + dc));
        if (proxima) proxima.campo.focus();
      }
      if (evento.key === ' ' && participacoes.get(id).length > 1) {
        evento.preventDefault();
        selecionarCasa(id, true);
      }
    });
    celula.appendChild(campo);
    entradas.set(id, {celula, campo});
    tabuleiro.appendChild(celula);
  }
}

function idsPalavra(p) { return percurso(p).map(([l, c]) => idCasa(l, c)); }
function selecionarPalavra(indice, focar = true) {
  if (perdeu) return;
  selecionada = indice;
  entradas.forEach(({celula}) => celula.classList.remove('selected'));
  pistas.forEach(botao => botao.classList.remove('selected'));
  idsPalavra(palavras[indice]).forEach(id => entradas.get(id).celula.classList.add('selected'));
  pistas.get(indice).classList.add('selected');
  const p = palavras[indice];
  const aviso = indice === etapa ? 'PALAVRA DA MISSÃO ATUAL' : concluidas.has(indice) ? 'CHAVE JÁ VALIDADA' : 'CHAVE DE ETAPA FUTURA';
  $('#activeHint').textContent = `${aviso} · ${identificacao(p)} · ${posicaoInicial(p)} — ${p.pista}`;
  if (focar) {
    const caminho = idsPalavra(p);
    const alvo = caminho.find(id => !entradas.get(id).campo.readOnly && !entradas.get(id).campo.value) || caminho.find(id => !entradas.get(id).campo.readOnly) || caminho[0];
    entradas.get(alvo).campo.focus();
  }
}
function selecionarCasa(id, alternar) {
  const candidatos = participacoes.get(id);
  if (!candidatos) return;
  let indice = candidatos.includes(selecionada) ? selecionada : candidatos[0];
  if (alternar && candidatos.length > 1 && candidatos.includes(selecionada)) indice = candidatos[(candidatos.indexOf(selecionada) + 1) % candidatos.length];
  selecionarPalavra(indice, false);
}
function moverNaPalavra(id, sentido) {
  const ids = idsPalavra(palavras[selecionada]);
  let indice = ids.indexOf(id) + sentido;
  while (indice >= 0 && indice < ids.length) {
    if (!entradas.get(ids[indice]).campo.readOnly) { entradas.get(ids[indice]).campo.focus(); break; }
    indice += sentido;
  }
}
function limparFeedback() {
  entradas.forEach(({celula}) => celula.classList.remove('wrong'));
  pistas.forEach(botao => botao.classList.remove('wrong'));
}

palavras.forEach((p, i) => {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'clue';
  const n = document.createElement('span');
  n.className = 'clue-number';
  n.textContent = `${String(p.numero).padStart(2, '0')}.`;
  const txt = document.createElement('span');
  txt.textContent = `${p.pista} (${p.resposta.length} letras)`;
  botao.append(n, txt);
  botao.addEventListener('click', () => { abrirJanela('game'); selecionarPalavra(i); });
  (p.direcao === 'H' ? $('#horizontalClues') : $('#verticalClues')).appendChild(botao);
  pistas.set(i, botao);
});

// ---------- EXPLORADOR, DICAS E SEQUÊNCIA DE MISSÕES ----------
function textoPasta(indice) {
  if (indice === 16) return 'ARQUIVO MESTRE — ACESSO TOTAL\n\nA fraude fictícia de R$ 12.480.000,00 foi identificada.\nVocê encontrou as 16 chaves.\n\nSISTEMA: INVASÃO SIMULADA CONCLUÍDA.\nNenhum banco real foi acessado.';
  const p = palavras[indice];
  const cabecalho = indice === 0 ? 'BOAS-VINDAS AO BANCO NEXUS' : 'ACESSO CONCEDIDO — NOVA PISTA';
  return `${cabecalho}\n\nMISSÃO ${String(indice + 1).padStart(2, '0')} DE 16\n${identificacao(p)}\nINÍCIO NO TABULEIRO: ${posicaoInicial(p).toUpperCase()}\nQUANTIDADE DE LETRAS: ${p.resposta.length}\n\nDICA FÁCIL:\n${p.facil}\n\nCOMO RESOLVER:\n1. Clique no botão Resolver esta pista.\n2. Digite nas casas destacadas da cruzadinha.\n3. Clique em Conferir.\n\nA pasta só cria um log informativo. Dicas EXTRAS aumentam o rastreamento.`;
}
function mostrarPasta(indice) {
  if (perdeu) return;
  const liberada = indice === 0 || concluidas.has(indice - 1);
  if (!liberada) return;
  abrirJanela('explorer');
  if (!pastasLidas.has(indice)) {
    pastasLidas.add(indice);
    registrar(`Pasta ${indice === 0 ? 'BOAS-VINDAS' : arquivos[indice - 1]} aberta. Log de leitura (sem aumento do rastreamento).`, 'info');
  }
  $('#folderPreview').innerHTML = '';
  const area = document.createElement('div');
  area.className = 'preview-doc';
  const titulo = document.createElement('h3');
  titulo.textContent = indice === 0 ? '📄 BOAS-VINDAS.txt' : `📄 ${indice === 16 ? 'dossie_final' : arquivos[indice - 1]}.txt`;
  const texto = document.createElement('pre');
  texto.textContent = textoPasta(indice);
  const acao = document.createElement('button');
  acao.type = 'button';
  acao.className = 'primary next-action-button';
  acao.textContent = indice === 16 ? 'Voltar à cruzadinha' : `Resolver ${identificacao(palavras[indice])}`;
  acao.addEventListener('click', () => {
    abrirJanela('game');
    selecionarPalavra(Math.min(indice, 15));
  });
  area.append(titulo, texto, acao);
  $('#folderPreview').appendChild(area);
  registrar(`Documento ${titulo.textContent} aberto pelo hacker.`, 'info');
}

function atualizarPastas() {
  pastas.forEach(({botao, label}, indice) => {
    const liberada = indice === 0 || concluidas.has(indice - 1);
    botao.disabled = !liberada || perdeu;
    botao.classList.toggle('active', liberada);
    botao.querySelector('.folder-emoji').textContent = liberada ? '📂' : '🔒';
    label.textContent = liberada ? 'Liberada' : 'Bloqueada';
  });
  $('#folderCount').textContent = `${concluidas.size} de 16 liberadas`;
  $('#explorerStatus').textContent = `17 itens • ${16 - concluidas.size} protegidos`;
  $('#score').textContent = `${concluidas.size} de 16 palavras`;
}

// Pasta BOAS-VINDAS + 16 pastas, uma por palavra completada.
for (let indice = 0; indice <= 16; indice++) {
  const botao = document.createElement('button');
  botao.type = 'button';
  botao.className = 'folder-tile';
  const icone = document.createElement('span');
  icone.className = 'folder-emoji';
  icone.textContent = '🔒';
  const nome = document.createElement('strong');
  nome.textContent = indice === 0 ? 'BOAS-VINDAS' : arquivos[indice - 1];
  const label = document.createElement('small');
  const orientacao = document.createElement('span');
  orientacao.className = 'folder-orientation';
  if (indice < 16) { const alvo = palavras[indice]; orientacao.textContent = `→ ${String(alvo.numero).padStart(2, '0')} ${alvo.direcao === 'H' ? 'H' : 'V'}`; }
  else orientacao.textContent = '✓ FINAL';
  botao.append(icone, nome, orientacao, label);
  /* O indicador 01 H / 02 V mostra a pista que está dentro da pasta. */
  botao.addEventListener('click', () => mostrarPasta(indice));
  $('#folders').appendChild(botao);
  pastas.push({botao, label});
}
$('#explorerHome').addEventListener('click', () => mostrarPasta(0));

// A sequência é linear para que cada pasta revele o próximo desafio.
function conferir() {
  if (perdeu) return;
  limparFeedback();
  if (etapa >= palavras.length) { mostrarAviso('Você já concluiu todas as palavras!'); return; }
  const p = palavras[etapa];
  const ids = idsPalavra(p);
  const digitada = ids.map(id => entradas.get(id).campo.value).join('');
  if (digitada === p.resposta) {
    concluidas.add(etapa);
    ids.forEach(id => {
      const entrada = entradas.get(id);
      entrada.campo.value = grade.get(id)[0].letra;
      entrada.campo.readOnly = true;
      entrada.campo.dataset.lastValue = entrada.campo.value;
      entrada.celula.classList.add('correct');
    });
    pistas.get(etapa).classList.add('correct');
    registrar(`Chave ${p.resposta} validada. Uma nova pasta foi liberada.`, 'success');
    tocar('acerto');
    etapa++;
    atualizarPastas();
    atualizarGuiaEtapa();
    atualizarBrowser();
    $('#extraHint').textContent = 'Se precisar, use a dica extra (+8% de rastreamento).';
    if (etapa === palavras.length) {
      $('#feedback').textContent = '✓ 16 de 16 palavras. O dossiê final foi desbloqueado!';
      $('#activeHint').textContent = 'Acesso total concedido! Explore o arquivo mestre no Explorador.';
      $('#victoryModal').classList.remove('hidden');
    } else {
      $('#feedback').textContent = `✓ Correto! A pasta ${arquivos[etapa - 1]} foi liberada. Abra-a para ler a próxima dica.`;
      mostrarAviso('🔓 Nova pasta liberada! Abra o Explorador para receber a próxima dica.');
      selecionarPalavra(etapa, false);
    }
  } else {
    ids.forEach((id, i) => {
      if (entradas.get(id).campo.value !== p.resposta[i]) entradas.get(id).celula.classList.add('wrong');
    });
    pistas.get(etapa).classList.add('wrong');
    atualizarRastreamento(10, `Falha na conferência da palavra ${etapa + 1}`);
    tocar('erro');
    if (perdeu) return;
    $('#feedback').textContent = `✕ Palavra ${etapa + 1} ainda não está certa. Confira as casas em vermelho ou peça uma dica.`;
  }
}

function pedirDica() {
  if (perdeu) return;
  if (etapa === palavras.length) { mostrarAviso('Todas as palavras já foram decifradas!'); return; }
  const quantidade = (dicasUsadas.get(etapa) || 0) + 1;
  dicasUsadas.set(etapa, quantidade);
  atualizarRastreamento(8, `Solicitação da dica extra ${quantidade} da palavra ${etapa + 1} gerou logs`);
  if (perdeu) return;
  const p = palavras[etapa];
  const texto = quantidade === 1 ? p.extra : quantidade === 2 ? `A resposta tem ${p.resposta.length} letras e começa com ${p.resposta[0]}.` : `Letras iniciais: ${p.resposta.slice(0, Math.min(quantidade, p.resposta.length - 1))}...`;
  $('#extraHint').textContent = `💡 DICA ${quantidade}: ${texto}`;
  registrar(`Auxílio solicitado na chave ${etapa + 1}. O registro foi armazenado no terminal.`, 'warning');
  tocar('letra');
}

function reiniciar() {
  perdeu = false;
  etapa = 0;
  rastreamento = 0;
  concluidas.clear();
  pastasLidas.clear();
  dicasUsadas.clear();
  dicasChrome.clear();
  vpnConectada = false;
  $('#vpnPort').value = '';
  $('#vpnState').textContent = '🔴 DESCONECTADA · Chrome bloqueado';
  $('#vpnState').classList.remove('vpn-connected');
  $('#vpnFeedback').textContent = 'Conecte para liberar o navegador de pesquisa.';
  atualizarBrowser();
  entradas.forEach(({campo, celula}) => {
    campo.value = '';
    campo.readOnly = false;
    campo.dataset.lastValue = '';
    celula.classList.remove('correct', 'wrong', 'selected');
  });
  pistas.forEach(botao => botao.classList.remove('correct', 'wrong', 'selected'));
  $('#trackingFill').style.width = '0%';
  $('#trackingText').textContent = '0%';
  $('#trackingBar').setAttribute('aria-valuenow', '0');
  $('#feedback').textContent = 'Missão reiniciada! Abra BOAS-VINDAS no Explorador.';
  $('#extraHint').textContent = 'A ajuda extra aparecerá aqui quando solicitada.';
  $('#folderPreview').innerHTML = '<div class="preview-empty">📄<strong>Escolha BOAS-VINDAS para começar</strong><span>Abra uma pasta para ler a dica.</span></div>';
  $('#victoryModal').classList.add('hidden');
  $('#defeatModal').classList.add('hidden');
  $('#checkButton').disabled = false;
  $('#hintButton').disabled = false;
  $('#vpnConnect').disabled = false;
  document.body.classList.remove('flash-alert');
  atualizarPastas();
  atualizarGuiaEtapa();
  selecionarPalavra(0, false);
  registrar('Sessão reiniciada. Pistas e pastas trancadas novamente.', 'info');
}

// O painel guia sempre aponta para a etapa exata que corresponde à próxima pasta.
function atualizarGuiaEtapa() {
  if (etapa >= palavras.length) {
    $('#stageGuide').textContent = 'TODAS AS 16 PISTAS CONCLUÍDAS • Dossiê final liberado.';
    return;
  }
  const p = palavras[etapa];
  $('#stageGuide').textContent = `ETAPA ${String(etapa + 1).padStart(2, '0')}/16 • ${identificacao(p)} • ${posicaoInicial(p)} • ${p.resposta.length} letras`;
}

// Aos 100% a partida realmente termina. Só Reiniciar permite outra tentativa.
function perderPartida() {
  perdeu = true;
  $('#trackingText').textContent = '100%';
  $('#feedback').textContent = 'CONEXÃO RASTREADA! Fim de jogo. Clique em Tentar novamente.';
  $('#stageGuide').textContent = 'MISSÃO FALHOU • Rastreamento concluído';
  $('#victoryModal').classList.add('hidden');
  entradas.forEach(({campo}) => { campo.readOnly = true; });
  $('#checkButton').disabled = true;
  $('#hintButton').disabled = true;
  $('#browserReveal').disabled = true;
  $('#vpnConnect').disabled = true;
  atualizarPastas();
  registrar('CONEXÃO RASTREADA — sessão bloqueada. Operação encerrada.', 'warning');
  tocar('erro');
  document.body.classList.remove('flash-alert');
  void document.body.offsetWidth;
  document.body.classList.add('flash-alert');
  $('#defeatModal').classList.remove('hidden');
  $('#retryButton').focus();
}

// ---------- VPN SIMULADA + NAVEGADOR DE DICAS ----------
// 3306 é a porta padrão do MySQL, utilizado por clientes como o MySQL Workbench.
// 8080 é uma porta frequente em servidores HTTP locais, mas localhost não tem porta fixa.
const perguntasVPN = {
  mysql: { pergunta: 'Qual é a porta padrão do MySQL, geralmente usada na conexão pelo Workbench?', porta: '3306', explicacao: '3306 é a porta padrão do servidor MySQL.' },
  http: { pergunta: 'Qual porta alternativa HTTP é muito usada em aplicações locais de desenvolvimento?', porta: '8080', explicacao: '8080 é comum para servidores web locais (não é a porta universal de localhost).' }
};
$('#vpnService').addEventListener('change', () => {
  const escolha = perguntasVPN[$('#vpnService').value];
  $('#vpnQuestion').textContent = escolha.pergunta;
  $('#vpnFeedback').textContent = 'Responda à pergunta para autenticar sua VPN fictícia.';
  $('#vpnPort').value = '';
});
function conectarVPN() {
  if (perdeu) return;
  if (vpnConectada) { abrirJanela('browser'); return; }
  const escolha = perguntasVPN[$('#vpnService').value];
  const resposta = $('#vpnPort').value.trim();
  if (resposta === escolha.porta) {
    vpnConectada = true;
    $('#vpnState').textContent = '🟢 VPN CONECTADA · Chrome liberado';
    $('#vpnState').classList.add('vpn-connected');
    $('#vpnFeedback').textContent = `✓ ${escolha.explicacao} Você pode abrir o Chrome.`;
    registrar(`Autenticação de rede simulada concluída. Serviço respondido: ${$('#vpnService').value}.`, 'success');
    tocar('acerto');
    atualizarBrowser();
    mostrarAviso('🌐 VPN conectada! Chrome desbloqueado.');
  } else {
    $('#vpnFeedback').textContent = '✕ Porta incorreta. Tente de novo. (+5% de rastreamento)';
    atualizarRastreamento(5, 'Tentativa incorreta de autenticação na VPN');
    tocar('erro');
  }
}
$('#vpnConnect').addEventListener('click', conectarVPN);
$('#vpnPort').addEventListener('keydown', evento => {
  if (evento.key === 'Enter') conectarVPN();
});
$('#browserGoVPN').addEventListener('click', () => abrirJanela('vpn'));
$('#browserSolve').addEventListener('click', () => {
  abrirJanela('game');
  selecionarPalavra(Math.min(etapa, palavras.length - 1));
});
// A pesquisa revela uma comparação familiar e o começo da resposta, mas não preenche a cruzadinha.
function montarDicaChrome(indice) {
  const resposta = palavras[indice].resposta;
  const inicio = resposta.slice(0, resposta.length <= 3 ? 1 : resposta.length <= 8 ? 2 : 3);
  return `${exemplosChrome[indice]}\n\nA palavra tem ${resposta.length} letras e começa com: ${inicio}...\nDica: escreva sem espaços e sem acentos.`;
}

function atualizarBrowser() {
  $('#browserLock').classList.toggle('hidden', vpnConectada);
  $('#browserResults').classList.toggle('hidden', !vpnConectada);
  if (!vpnConectada) return;
  if (etapa >= palavras.length) {
    $('#browserStage').textContent = 'Todas as etapas concluídas!';
    $('#browserSummary').textContent = 'Parabéns! Você encontrou os 16 componentes do computador.';
    $('#browserTipPreview').textContent = 'Invasão simulada concluída.';
    $('#browserReveal').disabled = true;
    return;
  }
  const palavra = palavras[etapa];
  $('#browserStage').textContent = `${identificacao(palavra)} · ${palavra.resposta.length} letras`;
  $('#browserSummary').textContent = `Localização na cruzadinha: ${posicaoInicial(palavra)}. ${palavra.pista}`;
  $('#browserSearchText').textContent = `Explicação fácil para a ${identificacao(palavra).toLowerCase()}`;
  const usada = dicasChrome.has(etapa);
  $('#browserTipPreview').textContent = usada ? montarDicaChrome(etapa) : 'Quer um exemplo do dia a dia e as primeiras letras da resposta? Toque no botão abaixo. Custa só 2%.';
  $('#browserReveal').disabled = usada || perdeu;
  $('#browserReveal').textContent = usada ? '✓ Dica já consultada nesta etapa' : 'Ver dica super fácil (+2% de rastreamento)';
}
$('#browserReveal').addEventListener('click', () => {
  if (perdeu || !vpnConectada || etapa >= palavras.length || dicasChrome.has(etapa)) return;
  const indice = etapa;
  dicasChrome.add(indice);
  atualizarRastreamento(2, `Pesquisa de dica facilitada da palavra ${indice + 1} no navegador deixou logs`);
  if (perdeu) return;
  registrar(`Consulta Chrome na pista ${indice + 1} registrada no histórico.`, 'warning');
  atualizarBrowser();
  tocar('letra');
});

$('#retryButton').addEventListener('click', () => { reiniciar(); abrirJanela('explorer'); mostrarPasta(0); });
$('#checkButton').addEventListener('click', conferir);
$('#hintButton').addEventListener('click', pedirDica);
$('#resetButton').addEventListener('click', reiniciar);
$('#soundButton').addEventListener('click', () => {
  somAtivado = !somAtivado;
  $('#soundButton').textContent = somAtivado ? '♫ Som ligado' : '♫ Som desligado';
  $('#soundButton').setAttribute('aria-pressed', String(somAtivado));
});
$('#closeVictory').addEventListener('click', () => $('#victoryModal').classList.add('hidden'));
$('#victoryExplorer').addEventListener('click', () => {
  $('#victoryModal').classList.add('hidden');
  abrirJanela('explorer');
  mostrarPasta(16);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && !perdeu) $('#victoryModal').classList.add('hidden');
});

// Estado inicial: apenas BOAS-VINDAS aberta para clique.
atualizarPastas();
atualizarGuiaEtapa();
selecionarPalavra(0, false);
iniciarBoot();
registrar('Firewall composto por 16 chaves de arquitetura computacional.', 'info');
registrar('Abertura de pastas não eleva o rastreamento. Dicas extras e erros elevam.', 'info');
