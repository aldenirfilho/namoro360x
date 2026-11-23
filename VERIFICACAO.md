# Verificação da versão 1.5.1 — 23/11/2026

- Base: versão 1.5 publicada, commit `434eefb`, obtida pelo helper Sites antes de editar; acesso público confirmado. O progresso antigo mantém a mesma chave e estrutura.
- `npm run check`, `npm test` e `npm run build` aprovados: 89 testes, incluindo regressões para etapa escolhida, continuação circular das etapas e limite real de 5 minutos.
- Chromium: cinco áreas exercitadas em 1440, 768, 390 e 320 px, sem rolagem horizontal inesperada. Capturas de desktop e celular inspecionadas; corpo principal com pelo menos 16 px.
- Fluxos conferidos: ação acima da introdução, marcar/desfazer, retomada da etapa correspondente, esgotamento apenas de tarefas curtas, ampliação explícita para até 15 minutos, pausa e conclusão integral.
- Persistência v1 após recarga e transferência JSON para um segundo contexto de navegador conferidas. A importação mantém o salvamento desativado quando essa é a preferência de destino e não oferece desfazer uma ação anterior à restauração.
- HTML portátil: nova marcação e desfazer funcionaram com rede desativada, sem requisições HTTP. Nenhum erro JavaScript nas telas testadas.
- Capturas e resultado de QA locais em `artifacts/v1_5_1/`, ignorados no Git. Instalação e uso em aparelhos físicos e leitores de tela não foram homologados nesta rodada.

---

# Verificação da versão 1.5 — 23/11/2026

- Base: fonte hospedada 1.4.1, commit `582e654`, aberta antes de editar. A audiência pública foi confirmada e preservada. O GitHub tinha somente a versão 1.3 e uma atualização de README; esta entrega reconcilia o código com a hospedagem atual.
- `npm run check` e `npm run build`: aprovados. `npm test`: 86 testes aprovados, incluindo 18 novos de backup do plano e a verificação de distribuição portátil da v1.4.
- Backup: exportação sem adesão ao salvamento, dados mínimos, todos os passos conhecidos, pausa, deduplicação, formato/versão/data/tipos/limites, campos extras e ausência de mutação cobertos pelos testes. O arquivo não inclui a opção de salvamento do navegador ou campos de perfil.
- Navegador real: download JSON confirmado. Arquivo de exemplo com dois passos e pausa mostrou prévia com data e etapa; cancelar preservou um passo, confirmar restaurou dois, com salvamento desativado. Um segundo teste restaurou o JSON baixado com salvamento já ativado e manteve um passo e a adesão após recarregar.
- Arquivo inválido e arquivo acima de 10.000 bytes foram recusados sem substituir o progresso. Escape fechou a prévia sem alterar as marcações. Os testes de interface usaram dados genéricos, sem informações de participantes.
- Layout conferido no navegador em larguras de 390 e 320 px, sem rolagem horizontal inesperada. Foco inicial do diálogo em “Manter meu plano atual”. O HTML portátil mantém os recursos de backup e os caminhos relativos entre as três ferramentas.
- O pacote Kit360X lê a versão do `package.json` e inclui as instruções para transferir progresso. Backups com o nome gerado pelo app são ignorados pelo Git; artefatos e testes de navegador permanecem fora do repositório.

**Limites:** transferência em iPhone/Android físicos, instalação e uso offline nesses dispositivos, leitores de tela e impressão/PDF continuam sem homologação nesta rodada. Não foi consultada a situação atual da conta Stripe; checkout continua indisponível. Não houve envio de mensagens ou divulgação em redes sociais nesta atualização.

Os registros abaixo são históricos; suas verificações e datas são preservadas.

---

# Verificação da versão 1.3 — 03/11/2026

- `npm run check`: integridade do guia, plano, Estúdio e manifesto aprovada.
- `npm test`: 67 testes aprovados. Os 38 novos cobrem dados reais do Estúdio, correspondência cenário/alternativa, exportação limitada do kit e service worker (SW): lista fechada de arquivos, instalação parcial, cota de cache, conteúdo offline, respostas de autenticação autoritativas, remoção estável e isolamento entre escopos.
- `npm run build`: três ferramentas hospedadas e três HTMLs autossuficientes. Ícones PNG 192 × 192 e 512 × 512 conferidos. SW final sem placeholders e com revisão calculada dos arquivos.
- Navegador real: tela do Estúdio em 1280 × 720, 390 × 844 e 320 × 780, sem rolagem horizontal inesperada. Alternativas, feedback, mudança de cenário, reinício por recarga e seleção de roteiros conferidos. Nenhuma resposta do ensaio foi restaurada após recarregar.
- Download real de `kit360x-grupo-curioso.txt` pelo botão do navegador confirmado. O arquivo não é um evento ou convite enviado.
- Estúdio portátil conferido em tela de 320 px: seleções e feedback funcionam; não possui scripts externos, estilos externos, manifesto ou controles de instalação. Integridade dos três arquivos portáteis também conferida após build.
- Instruções de instalação abrem e fecham corretamente. O navegador integrado não confirmou o registro do SW; a interface interrompe a espera, informa a falta de confirmação e mantém o uso online e o HTML portátil disponíveis. Os testes do SW são automatizados em ambiente controlado; não equivalem a homologação offline no dispositivo.
- Sem erros ou avisos JavaScript capturados nas telas exercitadas. Acesso da hospedagem preservado como privado para o proprietário. Preço proposto visível, com amostra gratuita; não há cobrança ativa.
- Hospedagem aberta com a sessão do proprietário: Estúdio, ensaio, reinício e link do plano conferidos. O servidor normaliza `.html` para endereços sem extensão. O SW reconhece ambos, aceitando somente redirecionamento para o endereço canônico esperado na mesma origem, com marcador de aplicação. Redirecionamentos para login, origem externa, outro caminho ou parâmetros diferentes continuam rejeitados; 22 testes específicos do SW cobrem essas regras.

**Limites:** instalação em iPhone/Android, funcionamento offline de ponta a ponta em navegador compatível e impressão/PDF no aparelho permanecem para homologação. Não houve auditoria formal com leitores de tela. Não há contas de participantes, pagamento, confirmação de compra ou moderação operacional.

O histórico abaixo registra rodadas anteriores; os resultados antigos não são novos testes desta versão.

---

# Verificação da versão 1.2 — 31/10/2026

- `npm run check`: aprovado, incluindo âncoras, referências de controles, assets, sintaxe e renderização segura do plano.
- `npm test`: 29 testes aprovados (23 existentes e 6 novos). Cobrem validação/restauração de estado, adesão explícita, entradas corrompidas, pausa, tarefas concluídas e reversão de marcações.
- `npm run build`: aprovado; guia e plano, cada um com uma versão HTML portátil.
- Navegador Chromium real: cinco áreas verificadas em larguras de 1440, 390 e 320 px, sem rolagem horizontal inesperada.
- Fluxos exercitados: progresso temporário, adesão e restauração após recarga, desativação e remoção do armazenamento, pausa, navegação por etapa, marcações, reinício com cancelar/confirmar, estado corrompido e armazenamento bloqueado.
- Reciprocidade: respostas de recusa e aceite verificadas; não há inferência individual ou pontuação.
- Conversas: cópia manual alternativa e download HTML verificados.
- Guia anterior: link para o novo plano e geração de convite continuam funcionando em viewport móvel.
- HTML portátil aberto por `file://` com rede desativada: imagem, progresso, navegação e situações funcionaram, sem requisições HTTP e sem erros JavaScript.
- Inspeção visual: painel desktop, painel móvel, etapas móveis e reciprocidade. Capturas locais em `artifacts/` (ignoradas no Git).
- Limites: esta rodada não substitui teste físico em iPhone/Safari. Armazenamento local não sincroniza aparelhos e depende do navegador. Links externos precisam de internet.

O registro anterior abaixo é preservado como histórico da versão 1.1.

---

# Verificação — Namoro360X 1.1

Data: 30/10/2026.

## Verificado

- `npm run check`: integridade de assets, IDs, âncoras, controles, sintaxe, coleções e referências dos pontos de partida.
- `npm test`: 23 testes aprovados. Incluem filtros com acentos, interseção de escolhas, restauração por adesão explícita, datas inválidas/passadas, fuso e horário de verão, convites e exportação ICS com UTC, duração, escaping e limite de 75 octetos por linha.
- `npm run build`: distribuição estática e arquivo HTML autossuficiente gerados.
- Navegador em 1280 × 720: três pontos de partida carregados, sem rolagem lateral, menu móvel oculto no desktop e nenhuma mensagem de erro de execução no console da aba de testes.
- Entrada tranquila: cinco atividades compatíveis. Entrada científica: uma atividade compatível. Ação de conversa seleciona o exemplo correspondente.
- Ação de convite de grupo seleciona o tom de grupo. O convite preserva texto livre como texto, sem interpretá-lo como HTML.
- Mudanças no plano invalidam a prévia anterior. Agenda só é habilitada quando existe data válida.
- Adesão voluntária a armazenamento: etapa e modo foco são restaurados após recarregar. Campos de convite e ensaio permanecem vazios. A limpeza remove escolhas e rascunhos.
- Exportação de exemplo ICS foi baixada pelo navegador na rodada inicial de 29/10, com estado provisório e sem notificação a participantes. A semântica do arquivo foi novamente coberta pelos testes da rodada de 30/10.

## Limites da verificação

A ferramenta de tamanho de tela não aplicou os tamanhos móveis solicitados; a leitura do navegador continuou em 1280 × 720, inclusive numa nova aba. As regras responsivas foram revisadas no CSS, mas a homologação visual em iPhone/tela estreita permanece pendente. Não foi simulada uma confirmação de encontro real.

Não houve auditoria formal de acessibilidade nem teste com leitores de tela. O projeto não possui participantes, cadastro, moderação operacional ou mensageria entre pessoas nesta versão.

## Revisão do pacote público

O pacote contém somente código e conteúdo geral do projeto. Não inclui exportações de conversa, documentos privados, convites preenchidos ou perfis de terceiros. Credenciais de publicação não devem ser gravadas no projeto. Os registros técnicos e imagens de conferência ficam fora do versionamento, em `artifacts/`.
