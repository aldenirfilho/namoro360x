# Namoro360X

**Conhecer. Compartilhar. Construir.**

Site HTML educativo e interativo para adultos de 18 anos ou mais construírem vínculos saudáveis. Acolhe diferentes estilos de comunicação, com atenção à timidez e ao transtorno do déficit de atenção com hiperatividade (TDAH).

## Versão 1.5.1 — 23/11/2026

A tela **Hoje** começa com a próxima ação e dá prioridade à etapa que você escolheu. **Ver este passo na etapa** abre o ponto correspondente do plano. Marcar um passo pelo painel oferece **Desfazer última marcação**, disponível nesta aba até outra conclusão ou restauração.

O ritmo de **5 minutos** sugere somente tarefas com essa duração. Quando elas terminam, o painel explica que ainda há passos mais longos e permite escolher **até 15 minutos**, sem marcar tarefas como concluídas automaticamente. A pausa continua disponível. Textos e controles do plano ficaram maiores, inclusive na navegação móvel.

O formato do progresso salvo e dos arquivos de transferência permanece compatível com a versão 1.5. Consulte [VERIFICACAO.md](VERIFICACAO.md) para os testes desta atualização.

### Transferência de progresso — versão 1.5

O **Meu plano** permite baixar um arquivo JSON com os passos concluídos, a etapa aberta e o ritmo escolhido e restaurar esse progresso manualmente em outro navegador. Não é necessário ativar o salvamento local para baixar o arquivo. A restauração apresenta uma prévia e pede confirmação antes de substituir o plano atual; preserva a opção de salvamento deste navegador.

O arquivo não inclui convites, rascunhos, informações sobre pessoas nem preferências do guia. A seleção e a leitura acontecem no dispositivo, sem envio do arquivo ao servidor do Namoro360X. Não há conta ou sincronização automática. O passo a passo está em **Transferir meu progresso**, abaixo. A transferência em iPhone físico permanece pendente de verificação.

- Apresentação: [Conheça o Namoro360X](https://namoro360x.aldenirmed.chatgpt.site/conheca.html).
- Plano: [Meu plano](https://namoro360x.aldenirmed.chatgpt.site/plano.html).
- Prática: [Estúdio360X](https://namoro360x.aldenirmed.chatgpt.site/studio.html).
- Hospedagem: pública por autorização do titular, reconfirmada em 23/11/2026. Repositório público: `aldenirfilho/namoro360x`.

### Histórico preservado — versão 1.4 e atualização 1.4.1

Atualização 1.4.1 — 17/11/2026: apresentação com imagem e texto alternativo para prévias de compartilhamento e URLs canônicas normalizadas no sitemap. O acesso público, autorizado em 03/11, foi reconfirmado em 17/11. A consulta Stripe de 17/11 exigiu reconexão; não foi possível rever a habilitação atual de pagamentos. Nenhum checkout foi ativado.

A versão 1.4, de 03/11/2026, acrescentou `conheca.html`, que apresenta o produto e a demonstração gratuita, com metadados de compartilhamento, sitemap e informação explícita de que a compra está indisponível. Histórico comercial: a conta Stripe selecionada pelo titular foi Projeto360x; a consulta de 03/11 encontrou pagamentos e repasses desabilitados, com verificação de identidade pendente. A consulta de 17/11 exigiu reconexão. O estado atual da conta não foi consultado nesta atualização de 23/11; nenhum checkout foi ativado. Nenhum dado de identidade deve ser colocado no repositório.

Os três HTMLs portáteis agora navegam entre si por caminhos relativos. Após `npm run build`, gere um pacote organizado fora de `dist` com `node scripts/package-kit.mjs /caminho/absoluto/para/kit`. O pacote acrescenta um caderno para impressão, instruções e hashes SHA-256. Não publica arquivos de entrega, não cria checkout e não comprova compra. Validação em aparelho físico permanece pendente.

### Estúdio preservado da versão 1.3 — 03/11/2026

O **Estúdio360X** (`studio.html`) acrescenta nove situações de conversa, 27 alternativas comentadas e três roteiros completos do Kit360X, com download TXT e impressão. Os exemplos são editoriais, sem chatbot, pontuação ou análise de pessoas. Tudo está em prévia gratuita.

O aplicativo tem manifesto PWA, ícones e atalhos. Em navegadores compatíveis, pode ser adicionado à tela inicial. A cópia offline exige uma escolha separada no Estúdio: guarda apenas arquivos gerais do aplicativo, nunca respostas ou rascunhos. O controle de remoção é independente das preferências do plano e do guia. Instalação física em iPhone/Android e disponibilidade na App Store/Google Play não são afirmadas por esta entrega.

**Monetização preparada como proposta:** aplicativo básico gratuito + Kit360X avulso por R$ 29,90 como preço a validar. Não existe cobrança ativa, assinatura, confirmação de pagamento ou área Premium protegida. Consulte [MONETIZACAO.md](MONETIZACAO.md) para a evolução da amostra até venda e entrega reais. Conteúdo em HTML público não é um controle de acesso pago.

- Estúdio: [ensaios e Kit360X](https://namoro360x.aldenirmed.chatgpt.site/studio.html).
- Instalação e offline: controles no final do Estúdio.
- Público da hospedagem: público desde 03/11/2026, conforme autorização do titular; o repositório também é público.

### Plano preservado da versão 1.2 — 31/10/2026

O botão **Meu plano** abre `plano.html`, um aplicativo HTML com cinco áreas: Hoje, Meu plano, Reciprocidade, Conversas e Cuidados. Inclui quatro etapas flexíveis, doze passos, sete situações de reciprocidade, seis modelos de conversa e orientações para apps, Instagram e contextos sociais/profissionais.

O painel oferece uma ação por vez, ritmo de 5 ou 15 minutos e pausa. Os tempos são sugestões de organização, não metas clínicas. As marcações medem ações do próprio visitante, sem pontuar pessoas ou prometer um relacionamento. A ilustração de cafeteria foi gerada por IA e representa adultos fictícios.

- Site: [Namoro360X](https://namoro360x.aldenirmed.chatgpt.site/).
- Aplicativo: [Meu plano](https://namoro360x.aldenirmed.chatgpt.site/plano.html).
- Acesso do site: público desde 03/11/2026. O código do repositório continua público.

### Ferramentas preservadas do guia 1.1

- Três pontos de partida: algo tranquilo, uma conversa curiosa ou um convite.
- Seis etapas opcionais, sem prazo, ranking ou cobrança.
- Doze atividades filtráveis por interesse, energia e orçamento, com favoritas.
- Doze exemplos de conversa e um espaço de ensaio privado.
- Seis guias sobre comunicação, timidez, TDAH e convivência.
- Planejador de encontros com prévia, cópia, arquivo de texto e agenda `.ics`.
- Modo foco e armazenamento opcional de escolhas no navegador.
- Arquivo HTML autossuficiente, sem dependências de execução, fontes remotas ou imagens de terceiros.

**Não há cadastro, descoberta de pessoas, mensagens entre usuários ou combinação automática nesta versão.** Os convites são compartilhados manualmente pelo visitante. O site não afirma verificar inteligência, caráter, maturidade, estado civil ou compatibilidade de ninguém.

## Abrir e usar

Com Node.js 18 ou superior, sem instalar pacotes:

```sh
npm run check
npm test
npm run build
npm run preview
```

Abra o endereço `http://127.0.0.1:4173` exibido pelo servidor. Encerre a prévia com `Ctrl+C`.

Para uso offline após o build, mantenha `dist/studio-portatil.html`, `dist/plano-relacionamento.html` e `dist/namoro360x.html` na mesma pasta. Cada arquivo reúne seu HTML, CSS, JavaScript e imagens necessárias, sem manifestos ou registro de service worker. Os links entre essas ferramentas são relativos e funcionam sem a hospedagem. Referências e instruções de instalação hospedadas exigem internet. O service worker existe somente na distribuição hospedada e só é registrado quando o visitante ativa a cópia offline no Estúdio.

## Transferir meu progresso

### Baixar no navegador de origem

1. Abra **Meu plano** e entre na área **Cuidados**.
2. Na seção **Leve seu plano com você**, escolha **Baixar meu progresso**.
3. Guarde o arquivo JSON onde conseguir encontrá-lo. O download funciona mesmo com o salvamento local desativado; nesse caso, ele copia o progresso da aba atual.
4. Para passar ao outro aparelho, use um meio de sua escolha, como AirDrop ou uma pasta no iCloud Drive. Essa transferência depende do serviço escolhido; o Namoro360X não a realiza automaticamente.

### Restaurar no navegador de destino

1. Abra **Meu plano** no aparelho de destino e vá a **Cuidados → Leve seu plano com você**.
2. Em **Restaurar um arquivo de progresso**, selecione o JSON salvo. No iPhone, localize-o pelo seletor de arquivos, por exemplo em Downloads ou iCloud Drive.
3. Confira a prévia com a quantidade de passos, a etapa e o ritmo do arquivo.
4. Escolha **Restaurar este progresso** para substituir o plano atual. Para cancelar, use **Manter meu plano atual**; cancelar não altera o progresso existente.
5. Confira o plano restaurado. A opção de guardar progresso continua como já estava neste navegador: ativa continua ativa, desativada continua desativada. O arquivo não transporta essa preferência.

**Limites:** o arquivo é validado quanto a formato, estrutura, tamanho máximo de 10 kB e referências a etapas e passos conhecidos. Um arquivo inválido é recusado sem substituir o plano. A restauração substitui os passos atuais; não mescla dois planos. Para conservar a versão anterior, baixe-a antes de restaurar outra. JSON de progresso não inclui convites, rascunhos, pessoas, favoritos ou outras preferências do guia. As cópias baixadas e as eventuais cópias no serviço usado para transferi-las permanecem sob controle do visitante.

O fluxo está disponível para uso nos navegadores compatíveis. **Transferência, seleção pelo app Arquivos e uso na tela inicial de um iPhone físico ainda precisam de verificação própria.** Não há sincronização automática, recuperação por conta ou garantia de que o navegador preserve dados locais.

## Privacidade

Os formulários não enviam conteúdo para um servidor. Por padrão, as escolhas duram apenas a sessão. Se o visitante autorizar, etapas, favoritas e modo foco do guia são salvos em `localStorage`. O plano possui uma opção independente para guardar apenas os passos concluídos, a etapa aberta e o ritmo. O arquivo de progresso é uma cópia manual desses três elementos e não altera a adesão ao salvamento ao ser restaurado. Convites e rascunhos não são persistidos nem incluídos no JSON. Cada área possui seu próprio controle de exclusão. Limpar dados do site não apaga arquivos já baixados.

Consulte [PRIVACIDADE.md](PRIVACIDADE.md). A hospedagem pode manter registros técnicos, conforme suas políticas. Não há cookies de análise, pixels, rastreadores ou integração com redes sociais no código desta versão.

## Conteúdo e princípios

Curiosidade, coerência e maturidade são traduzidas em atitudes observáveis: escuta, honestidade, respeito à recusa, liberdade para mudar de ideia e responsabilidade pelos acordos. Educação, renda e diagnóstico não são critérios de merecimento de afeto.

As propostas são educativas, sem validação como método terapêutico. Consulte [FONTES.md](FONTES.md) para referências, datas e limitações. Timidez não implica necessariamente ansiedade social. O material não substitui avaliação profissional quando existe sofrimento persistente.

## Evolução

O [PROJETO.md](PROJETO.md) descreve o escopo e a futura comunidade voluntária, que depende de autenticação, proteção de dados, consentimento de adultos, moderação, denúncia e bloqueio. Nenhum desses recursos é apresentado como ativo.

O [ESTRATEGIA.md](ESTRATEGIA.md) apresenta três prioridades de desenvolvimento, o piloto por interesses e critérios para decidir quando uma comunidade com contas faz sentido. Comece com encontros reais e voluntários, usando as ferramentas para apoiar a interação.

Autor do projeto: Aldenir Rocha. Código público em `aldenirfilho/namoro360x`. A visibilidade pública do repositório não concede, por si, uma licença adicional de uso.
