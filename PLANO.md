# Plano de relacionamento sério — 1.2

Entrada: `plano.html`, conectada ao menu, botão principal e rodapé do guia `index.html`.

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

`npm run build` produz `dist/plano-relacionamento.html`, com CSS, scripts e imagem incorporados. As cinco áreas e os controles funcionam sem rede. Referências e o planejador complementar são links online identificados. A persistência em `file://` depende do navegador; copiar tem alternativa manual.

## Histórico e recuperação

O histórico do GitHub e o histórico anterior do Sites tinham o mesmo conteúdo em commits distintos. Foram conciliados por merge preservando ambos os históricos. A versão 1.1 permanece no commit `db9bdf4`.

Para corrigir ou reverter uma versão publicada, crie um novo commit com a correção/reversão, teste e publique pelo mesmo projeto Sites. Não reescreva os históricos remotos.
