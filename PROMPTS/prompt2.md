Atue como um desenvolvedor Front-end sênior. Vamos continuar o desenvolvimento do jogo **"Cruzadinha de Arquitetura Computacional"** na **Etapa 2 (Interatividade e Validação)**, trabalhando diretamente sobre os arquivos `index.html`, `style.css` e `script.js` já existentes neste projeto.

Implemente as seguintes funcionalidades em JavaScript puro e os estilos de feedback correspondentes no CSS (ainda não crie o `README.md`):

1. **Navegação Fluida no Tabuleiro (`script.js`):**
   - Ao clicar em uma célula ou em uma pista na lista (Horizontais/Verticais), destaque toda a palavra ativa no tabuleiro e a pista correspondente.
   - Se uma célula pertence ao cruzamento de duas palavras (uma horizontal e outra vertical), clicar novamente nela deve alternar a direção ativa entre horizontal e vertical.
   - Ao digitar uma letra válida (`A-Z`), avance o foco automaticamente para a próxima célula da palavra ativa.
   - Ao pressionar `Backspace` em uma célula vazia, apague e volte o foco para a célula anterior da palavra ativa.
   - Permita mover entre células ativas usando as setas do teclado (`ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`).

2. **Botão "Conferir" e Contador de Acertos (`script.js` + `style.css`):**
   - Ao clicar no botão **Conferir**, valide todas as palavras do tabuleiro comparando com o gabarito.
   - Adicione classes CSS visuais nas células:
     - **Palavra 100% correta:** destaque em verde (ex: fundo e borda verde suave com texto legível).
     - **Palavra incorreta ou incompleta:** destaque em vermelho (ex: fundo e borda vermelha suave).
     - *Atenção:* Se uma célula fizer parte de uma palavra correta e outra incorreta ao mesmo tempo, priorize a exibição do acerto ou trate de forma clara para não confundir o jogador.
   - Atualize dinamicamente o contador de acertos na tela no formato exato: `"X de Y palavras"` (onde `Y` é o total de palavras do tabuleiro).

3. **Botão "Reiniciar" (`script.js`):**
   - Ao clicar em **Reiniciar**, limpe todas as letras digitadas nas células, remova todas as classes de acerto/erro e seleção, e resete o contador para `"0 de Y palavras"`.

Mantenha a matriz de palavras e pistas exatamente como estão configuradas no `script.js` atual.
