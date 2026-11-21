# Operação Zero-Day — NexusOS

Jogo educacional desenvolvido em HTML, CSS e JavaScript puros, para a atividade **Cruzadinha de Arquitetura Computacional**.

## Como jogar

Ao terminar a animação de inicialização, o arquivo **Instruções.txt** abre automaticamente no Bloco de Notas, em primeiro plano. Leia as regras e feche ou minimize a janela para iniciar a missão hacker.


1. Abra `index.html` diretamente no navegador.
2. Após a animação de inicialização do NexusOS, abra **BOAS-VINDAS** no Explorador para receber a primeira pista fácil.
3. No aplicativo **Descriptografador**, localize o número e a direção indicados na pasta e digite as letras diretamente na cruzadinha.
4. Clique em **Conferir**. Uma palavra correta desbloqueia a próxima pasta.
5. Abra a pasta liberada para descobrir a pista fácil da próxima resposta.
6. Use **Pedir dica** se precisar de ajuda adicional. Cada solicitação aumenta o rastreamento e registra um log no Terminal.
7. Resolva as 16 palavras para liberar o dossiê final. **Reiniciar** restaura o tabuleiro e as pastas.

**Rastreamento:** abrir pastas não aumenta o risco; cada conferência incorreta +10%; cada dica extra +8%. Quando o rastreamento chegar a 100%, o jogo termina em derrota e só pode continuar após reiniciar. Cada pasta informa o número, direção, linha, coluna e uma pista simples da próxima resposta.

## Palavras e pistas

| Palavra no tabuleiro | Pista |
|---|---|
| CPU | Peça principal que executa as instruções do computador. |
| ULA | Circuito responsável por cálculos e comparações lógicas. |
| UC | Organiza operações e envia comandos às demais partes do processador. |
| REGISTRADORES | Pequenos espaços internos que guardam valores usados imediatamente no processamento. |
| RAM | Guarda temporariamente dados usados pelos aplicativos abertos. |
| ROM | Guarda instruções permanentes mesmo depois de desligar o aparelho. |
| EEPROM | Memória não volátil apagada e regravada com eletricidade. |
| FLASH | Tecnologia de armazenamento regravável presente em pendrives. |
| CACHE | Guarda cópias de dados frequentes para acelerar o acesso. |
| MEMORIADEMASSA | Armazena muitos arquivos por longo prazo, como fotos e vídeos. |
| DMA | Permite transferência direta entre periféricos e memória com menos trabalho do processador. |
| ADDRESSBUS | Indica a localização onde componentes devem ler ou gravar dados. |
| DATABUS | Transporta valores binários entre partes de um computador. |
| MICROCONTROLADOR | Pequeno circuito programável que reúne processamento, memória e entradas ou saídas. |
| DUALCORE | Configuração de processamento com dois núcleos. |
| QUADCORE | Configuração de processamento com quatro núcleos. |

## Estrutura

- `index.html` — Desktop e aplicativos fictícios.
- `style.css` — Windows simulado, explorador, terminal e cruzadinha responsiva.
- `script.js` — Dados das 16 palavras, grade, progressão, arquivos, dicas e rastreamento.

## Publicação

Crie um repositório público `arqcomp-cruzadinha`, faça **no mínimo seis commits em pelo menos dois dias diferentes** e ative GitHub Pages em **Settings → Pages → Deploy from a branch → main → /(root)**. Depois envie apenas o link publicado no Moodle. Substitua esta seção pelo endereço efetivo do site quando ele estiver publicado.

**Projeto fictício.** Não executa ataques, não acessa sistemas bancários e não realiza transferências financeiras.


## VPN Nexus e Chrome (nova versão)

- O desktop fica vazio após o boot: abra os programas pelos atalhos ou pelo menu Iniciar.
- O aplicativo **VPN Nexus** desbloqueia o **Chrome fictício** por meio de uma pergunta de portas:
  - O jogador escolhe entre um desafio sobre o MySQL e outro sobre uma porta HTTP local. As respostas não são reveladas no `Instruções.txt` nem nesta documentação.
- Erro no desafio da VPN: **+5%** de rastreamento.
- O Chrome desbloqueado exibe a localização e a pista principal; uma **dica muito fácil** pode ser revelada por etapa e custa **+2%** de rastreamento.
- A dica tradicional da cruzadinha custa **+8%**; conferência incorreta, **+10%**.
- Chegar a **100%** encerra a partida. Toda rede, VPN e navegador do projeto são simulados, sem acesso externo.

## Melhorias de acessibilidade

- A cruzadinha agora abre acima da barra de tarefas, com rolagem interna e tamanho ajustado ao navegador.
- No Chrome, as dicas usam comparações do cotidiano e revelam as primeiras letras, sem preencher as respostas.
- Cada dica do Chrome custa apenas **2%**: consultar as 16 dicas custa **32%** no total.
- Dica adicional na cruzadinha: **8%**. Conferência incorreta: **10%**. Erro de VPN: **5%**.
- Quem não conhece informática pode usar a pasta do Explorador gratuitamente e o Chrome após liberar a VPN simulada.
