# Projeto Relacionamento Sério → Namoro360X

Versão: 1.3 · 03/11/2026. Guia, plano pessoal, Estúdio360X e proposta de produto digital.

## Propósito

Facilitar encontros entre adultos a partir de interesses reais, atividades compartilhadas e comunicação respeitosa. Transformar inteligência em curiosidade, honra em coerência e maturidade em liberdade e responsabilidade — sem classificar o valor das pessoas.

## Decisões desta entrega

1. Site HTML com guia, atividades e convites compartilháveis, conforme escolha do solicitante.
2. Código e conteúdo gerais em repositório público `namoro360x`.
3. Nenhuma publicação de relatos íntimos, documentos, contas ou perfis de terceiros da conversa de origem.
4. Abordagem inclusiva para adultos. O site não restringe gênero, diploma, renda ou diagnóstico; não armazena dados de candidatos a relacionamento.
5. Etapas são sugestões flexíveis, sem sequência obrigatória, pontuação de desempenho, metas diárias ou penalidade por pausa.

## Etapa 1 — Guia e ferramentas

Fluxo: escolher um ponto de partida → encontrar uma atividade → adaptar uma conversa → preparar um convite → combinar com a outra pessoa → observar e conversar sobre o vínculo.

Implementação: três pontos de partida escolhíveis, seis etapas, doze atividades, doze scripts, seis guias, planejador de convites, exportação TXT/ICS, modo foco, favoritas e persistência voluntária de escolhas.

Atualização 1.1: a entrada “do seu jeito” permite escolher entre uma atividade tranquila, curiosidade científica/cultural e um convite. Cada escolha oferece uma sugestão curta e ações concretas. A preferência de entrada não é salva; a pessoa pode mudar de ideia a qualquer momento. O convite para grupos já seleciona o tom adequado no planejador. Consulte ESTRATEGIA.md para as prioridades e as próximas decisões.

## Etapa 2 — Piloto comunitário voluntário (planejada)

### Aplicativo 1.3 — implementado antes do piloto

O plano pessoal da v1.2 é preservado. A v1.3 acrescenta um Estúdio de conversas com nove situações, 27 alternativas comentadas e três roteiros de atividade, exportáveis em TXT e imprimíveis. A interface inclui manifesto e ícones para instalação por navegadores compatíveis, além de cópia offline opcional e removível do conteúdo geral. Não há chatbot remoto nem envio das escolhas.

A primeira hipótese comercial é um Kit360X digital avulso, com base gratuita e amostra aberta. R$ 29,90 é preço proposto para testar, sem vendas ou cobrança ativa. Material exclusivo, integração de pagamento, confirmação de compra, entrega e suporte dependem de uma etapa própria descrita em [MONETIZACAO.md](MONETIZACAO.md). A implementação não presume demanda nem receita.

Começar por grupos reais de interesse e pequenos encontros em espaços públicos. Definir responsável por moderação, canal de acolhimento e regras claras antes da inscrição. Nenhuma raspagem de redes sociais ou adição de pessoas sem solicitação própria.

Critérios para desenvolver: escopo acordado, política de privacidade, orçamento de manutenção, responsável operacional e revisão das obrigações de proteção de dados. Evitar armazenar diagnóstico, histórico íntimo, documentos ou localização precisa sem necessidade demonstrada.

## Etapa 3 — Contas e descoberta de participantes (planejada)

Necessidades: autenticação real, armazenamento controlado, confirmação de participação adulta, perfil voluntário, visibilidade escolhida pela pessoa, pedido de contato, bloqueio e denúncia, exclusão de conta, moderação e resposta a incidentes. Uma tela ou checkbox, isoladamente, não equivale a verificação de identidade ou idade.

Mostrar afinidades de atividades sem notas de caráter, QI, atratividade, diagnóstico ou promessas de relacionamento. Revisar acessibilidade e política de retenção antes de operar com usuários.

## Limites importantes

- Consentimento é livre, específico e reversível. Um convite aceito não é consentimento para intimidade.
- Relações atuais de supervisão, avaliação ou cuidado exigem preservação do vínculo profissional.
- Recusa, silêncio e ausência de reciprocidade não devem gerar insistência, vigilância ou campanhas de contato.
- O conteúdo não determina diagnósticos nem orienta mudanças de medicação.

## Manutenção e retomada

Fonte editorial: `content.js`. Comportamento: `app.js`. Funções verificáveis: `engine.js`. Layout: `index.html` e `styles.css`. Gere novamente `dist/` após mudanças e execute os controles descritos no README. Preserve o histórico Git e use reversão por commit se necessário.
