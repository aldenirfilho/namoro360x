# Plano de relacionamento sério — 1.5.1

Entrada: `plano.html`, conectada ao menu, botão principal e rodapé do guia `index.html`.

Na tela Hoje, o próximo passo prioriza a etapa selecionada e depois percorre as etapas seguintes, voltando ao começo quando necessário. O limite escolhido é respeitado: 5 minutos ou até 15 minutos. Se não houver tarefa curta pendente, o painel distingue essa situação da conclusão de todo o plano e permite ampliar o tempo explicitamente. A última marcação feita pelo painel pode ser desfeita na sessão atual.

## Arquivos

| Arquivo | Responsabilidade |
| --- | --- |
| `plano.html` | Estrutura semântica, conteúdo geral, fontes e links |
| `plano.css` | Layout adaptável, menu lateral/rodapé móvel, foco visível e impressão |
| `plano-data.js` | Etapas, tarefas, situações e mensagens editoriais |
| `plano-engine.js` | Estado, validação de dados salvos, próximo passo e marcações |
| `plano.js` | Navegação, controles, cópia e armazenamento opcional |
| `assets/conversa-no-cafe.png` | Ilustração de adultos fictícios gerada por IA |

Não há autenticação no código estático, backend, rastreadores, análise de perfis ou envio de mensagens. O controle de acesso do endereço hospedado pertence ao provedor Sites. O código público contém apenas conteúdo educativo geral.

## Versão portátil

`npm run build` produz `dist/plano-relacionamento.html`, com CSS, scripts e imagem incorporados. As cinco áreas e os controles funcionam sem rede. Guia, plano e Estúdio portáteis devem permanecer juntos na mesma pasta para a navegação entre ferramentas. Referências externas exigem internet. A persistência em `file://` depende do navegador; copiar tem alternativa manual. O progresso também pode ser exportado e restaurado manualmente pelo formato JSON da versão 1.5.

## Histórico e recuperação

O histórico do GitHub e o histórico anterior do Sites tinham o mesmo conteúdo em commits distintos. Foram conciliados por merge preservando ambos os históricos. A versão 1.1 permanece no commit `db9bdf4`.

Para corrigir ou reverter uma versão publicada, crie um novo commit com a correção/reversão, teste e publique pelo mesmo projeto Sites. Não reescreva os históricos remotos.
