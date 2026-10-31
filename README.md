# Namoro360X

**Conhecer. Compartilhar. Construir.**

Site HTML educativo e interativo para adultos de 18 anos ou mais construírem vínculos saudáveis. Acolhe diferentes estilos de comunicação, com atenção à timidez e ao transtorno do déficit de atenção com hiperatividade (TDAH).

## Versão 1.1 — 30/10/2026

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

Para uso offline após o build, abra `dist/namoro360x.html` diretamente no navegador. Esse arquivo reúne HTML, CSS e JavaScript; links de referências continuam exigindo internet. A cópia automática pode depender das permissões do navegador; existe seleção manual como alternativa.

## Privacidade

Os formulários não enviam conteúdo para um servidor. Por padrão, as escolhas duram apenas a sessão. Se o visitante autorizar, etapas, favoritas e modo foco são salvos em `localStorage`. Convites e rascunhos não são persistidos. O botão de exclusão limpa as escolhas e os rascunhos. O dispositivo e eventuais arquivos baixados precisam ser protegidos pelo próprio visitante.

Consulte [PRIVACIDADE.md](PRIVACIDADE.md). A hospedagem pode manter registros técnicos, conforme suas políticas. Não há cookies de análise, pixels, rastreadores ou integração com redes sociais no código desta versão.

## Conteúdo e princípios

Curiosidade, coerência e maturidade são traduzidas em atitudes observáveis: escuta, honestidade, respeito à recusa, liberdade para mudar de ideia e responsabilidade pelos acordos. Educação, renda e diagnóstico não são critérios de merecimento de afeto.

As propostas são educativas, sem validação como método terapêutico. Consulte [FONTES.md](FONTES.md) para referências, datas e limitações. Timidez não implica necessariamente ansiedade social. O material não substitui avaliação profissional quando existe sofrimento persistente.

## Evolução

O [PROJETO.md](PROJETO.md) descreve o escopo e a futura comunidade voluntária, que depende de autenticação, proteção de dados, consentimento de adultos, moderação, denúncia e bloqueio. Nenhum desses recursos é apresentado como ativo.

O [ESTRATEGIA.md](ESTRATEGIA.md) apresenta três prioridades de desenvolvimento, o piloto por interesses e critérios para decidir quando uma comunidade com contas faz sentido. Comece com encontros reais e voluntários, usando as ferramentas para apoiar a interação.

Autor do projeto: Aldenir Rocha. Código público em `aldenirfilho/namoro360x`. A visibilidade pública do repositório não concede, por si, uma licença adicional de uso.
