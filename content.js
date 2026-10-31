/* Namoro360X — conteúdo editorial geral. Interface 1.1: 2026-10-30. Fontes consultadas em 2026-10-29. */
window.N360_CONTENT = {
  paths: [
    { id: "tranquilo", icon: "☕", title: "Prefiro algo tranquilo", description: "Uma atividade leve e espaço para conversar com poucas palavras.", resultTitle: "Comece por um ambiente confortável.", result: "Explore um café, uma exposição ou uma troca de livros. Você pode comentar algo à sua frente, fazer uma pergunta e deixar a conversa respirar.", energy: "baixa", category: "", scriptId: "branco", primary: "Ver ideias tranquilas", target: "atividades" },
    { id: "curiosidade", icon: "✧", title: "Quero uma boa conversa", description: "Ciência, livros e descobertas podem dar um assunto em comum.", resultTitle: "Escolha uma pergunta que interesse a você.", result: "Uma atividade de divulgação científica ou cultural pode oferecer assunto. Compartilhe uma ideia e pergunte como a outra pessoa enxerga o tema; vocês não precisam concordar em tudo.", energy: "", category: "Ciência e descobertas", scriptId: "online", primary: "Explorar ciência e descobertas", target: "atividades" },
    { id: "encontro", icon: "↗", title: "Quero combinar um encontro", description: "Já existe uma troca? Transforme uma ideia em um convite simples.", resultTitle: "Proponha algo que caiba na vida dos dois.", result: "Escolha uma atividade, um lugar público e um tempo confortável. Prepare o convite e ajuste a proposta junto com a outra pessoa, se houver interesse recíproco.", energy: "", category: "", scriptId: "cafe", primary: "Preparar um convite", target: "encontro" }
  ],
  stages: [
    {
      id: "intencao",
      title: "Comece pelo que faz sentido para você",
      eyebrow: "01 · Seu ponto de partida",
      summary: "Você pode querer amizade, conhecer alguém com calma ou buscar um relacionamento sério. Diga isso com honestidade e escolha contextos em que as duas pessoas tenham liberdade para decidir.",
      action: "Escolha uma atividade de que você realmente gosta e uma condição que deixa o encontro confortável.",
      tip: "Curiosidade, honestidade e maturidade aparecem em atitudes ao longo do tempo. Um perfil ou uma credencial não comprova essas qualidades.",
      prompt: "O que eu gostaria de compartilhar com alguém nesta fase da minha vida?",
      avoid: "Use somente informações que a própria pessoa escolheu compartilhar. Preserve vínculos de cuidado, avaliação e supervisão: procure conhecer pessoas fora dessas relações de autoridade."
    },
    {
      id: "aproximacao",
      title: "Abra uma conversa pequena",
      eyebrow: "02 · Um assunto verdadeiro",
      summary: "Um livro, uma atividade ou um comentário no contexto do encontro já pode oferecer uma abertura. Faça uma pergunta que você gostaria de ouvir respondida.",
      action: "Comente um detalhe real e faça uma pergunta simples. Depois, dê espaço para a resposta.",
      tip: "Você pode adaptar uma frase pronta para o seu jeito. O objetivo é facilitar a troca, sem interpretar um personagem.",
      prompt: "Você já conhecia esse lugar ou veio experimentar também?",
      avoid: "Evite copiar a mesma mensagem para várias pessoas, inventar coincidências ou começar com intimidade que ainda não existe."
    },
    {
      id: "escuta",
      title: "Descubra como a conversa funciona entre vocês",
      eyebrow: "03 · Escuta e reciprocidade",
      summary: "Escutar, comentar algo da resposta e compartilhar um pouco de você permite descobrir afinidades. Observe a troca ao longo do tempo, sem transformar cada mensagem em um teste.",
      action: "Experimente: uma pergunta, escutar, comentar em uma ou duas frases e fazer uma pausa.",
      tip: "Tempo de resposta varia com trabalho, saúde, rotina e preferência. Procure clareza quando necessário; o relógio sozinho não revela interesse.",
      prompt: "Você falou que gosta disso. O que te fez começar?",
      avoid: "Evite interrogatórios, cronômetros para a fala e interpretações de personalidade baseadas em uma resposta curta."
    },
    {
      id: "convite",
      title: "Proponha algo simples para fazer juntos",
      eyebrow: "04 · Um convite concreto",
      summary: "Escolha uma atividade compatível com os interesses e a energia das duas pessoas. Combine um local público, duração aproximada e custo que caiba para ambos.",
      action: "Ofereça uma ideia e pergunte se a outra pessoa quer participar. Deixe espaço para recusar ou sugerir outra opção.",
      tip: "Cada pessoa pode organizar seu transporte. Compartilhe o combinado com alguém de confiança, sem expor dados pessoais da outra pessoa.",
      prompt: "Quer tomar um café no sábado à tarde? Podemos escolher um lugar tranquilo e ficar um pouco.",
      avoid: "Não trate silêncio como confirmação. Sem aceitação clara, o encontro ainda não está combinado."
    },
    {
      id: "constancia",
      title: "Façam acordos que caibam na vida real",
      eyebrow: "05 · Presença possível",
      summary: "Depois de um encontro bom, contem o que gostaram e o que desejam para a próxima vez. Perguntem sobre contato, disponibilidade e necessidades práticas.",
      action: "Combinem uma forma de confirmar encontros e avisar quando precisarem mudar os planos.",
      tip: "Um lembrete escolhido pela própria pessoa pode ajudar. Ninguém precisa assumir o papel de fiscal da rotina ou de responsável pelo tratamento do outro.",
      prompt: "Gosto de conversar com você. Como prefere manter contato durante a semana?",
      avoid: "Evite prometer presença que você não consegue sustentar, cobrar disponibilidade permanente ou assumir exclusividade sem uma conversa."
    },
    {
      id: "vinculo",
      title: "Observem se a relação faz bem aos dois",
      eyebrow: "06 · Escolhas compartilhadas",
      summary: "Ao longo dos encontros, conversem sobre o que cada um busca e observem respeito, responsabilidade e capacidade de reparar desencontros. Vocês podem continuar, ajustar ou encerrar.",
      action: "Pergunte como a outra pessoa vive a relação e conte também suas necessidades, sem buscar uma resposta predeterminada.",
      tip: "Consentimento é livre, contínuo e pode mudar. Proximidade anterior não dispensa comunicação no presente.",
      prompt: "Estou gostando de te conhecer. O que você procura e como está se sentindo com a gente?",
      avoid: "Respeite um não e uma mudança de ideia. Humilhação, ameaças, vigilância ou pressão financeira pedem limites e apoio, sem tentar consertar tudo sozinho."
    }
  ],
  activities: [
    {
      id: "cafe-livro", title: "Café e uma boa indicação de livro", category: "Livros e conversa", energy: "baixa", budget: "economico", duration: "30–60 min",
      description: "Escolham um café tranquilo ou uma biblioteca com espaço de convivência. Cada pessoa leva uma indicação que gostaria de compartilhar.",
      conversation: "Qual livro mudou uma ideia sua ou simplesmente te fez companhia?",
      accessibility: "Verifiquem acesso, assentos e volume do ambiente. Leitura não precisa virar prova de repertório."
    },
    {
      id: "caminhada", title: "Um passeio curto em lugar público", category: "Natureza e movimento", energy: "media", budget: "gratis", duration: "30–45 min",
      description: "Combinem um parque ou praça movimentada, horário confortável e um trajeto curto. Sentar para conversar também faz parte do passeio.",
      conversation: "Tem algum lugar da cidade que você gosta de revisitar?",
      accessibility: "Confiram sombra, calçadas, bancos e mobilidade. Adaptem o ritmo e interrompam quando quiserem."
    },
    {
      id: "museu", title: "Uma exposição para explorar juntos", category: "Arte e cultura", energy: "baixa", budget: "economico", duration: "45–90 min",
      description: "Procurem uma exposição aberta ao público e escolham apenas uma parte para visitar. A programação e os preços precisam ser conferidos no local.",
      conversation: "Qual obra te fez parar por mais tempo?",
      accessibility: "Consultem elevadores, acessibilidade e horários menos cheios. É possível conversar depois, se a sala pedir silêncio."
    },
    {
      id: "jogos", title: "Um jogo cooperativo em espaço de convivência", category: "Jogos e criatividade", energy: "media", budget: "economico", duration: "45–75 min",
      description: "Escolham uma luderia, biblioteca ou encontro público de jogos. Prefiram regras simples e uma partida que possa terminar cedo.",
      conversation: "Você prefere construir uma estratégia ou descobrir as regras jogando?",
      accessibility: "Expliquem as regras com calma e consultem opções com letras grandes. Competição é opcional; diversão não exige desempenho."
    },
    {
      id: "ciencia", title: "Uma conversa sobre ciência para curiosos", category: "Ciência e descobertas", energy: "baixa", budget: "gratis", duration: "40–60 min",
      description: "Procurem uma palestra de divulgação científica aberta ao público ou escolham um assunto para conversar em um espaço tranquilo.",
      conversation: "Que pergunta sobre o mundo você adoraria ver respondida?",
      accessibility: "Verifiquem inscrições e recursos de acesso. Ninguém precisa dominar o tema; vale dizer que ainda não sabe."
    },
    {
      id: "feira", title: "Um passeio pela feira", category: "Comida e cotidiano", energy: "media", budget: "economico", duration: "30–60 min",
      description: "Visitem uma feira pública em horário menos cheio. Explorem os alimentos e, se ambos quiserem, escolham algo simples para provar.",
      conversation: "Qual comida te lembra um momento bom?",
      accessibility: "Combinem um ponto fácil de encontrar e confiram restrições alimentares. Comprar é opcional."
    },
    {
      id: "oficina", title: "Uma oficina curta de culinária", category: "Comida e cotidiano", energy: "media", budget: "economico", duration: "60–120 min",
      description: "Busquem uma aula aberta ao público em um estabelecimento ou espaço comunitário. Confirmem preço, materiais e duração antes de reservar.",
      conversation: "O que você gostaria de aprender a preparar?",
      accessibility: "Perguntem sobre alergias, assentos e ferramentas adaptadas. Escolham juntos, sem atribuir papéis pelo gênero."
    },
    {
      id: "voluntariado", title: "Participar de uma ação comunitária", category: "Comunidade e cuidado", energy: "media", budget: "gratis", duration: "60–120 min",
      description: "Procurem uma iniciativa pública ou organização conhecida que aceite voluntários. A participação deve servir à atividade e às pessoas atendidas.",
      conversation: "Que causa você gostaria de conhecer melhor?",
      accessibility: "Confirmem orientação, tarefas possíveis e condições de acesso. Não fotografem nem usem pessoas atendidas como cenário para o encontro."
    },
    {
      id: "desenho", title: "Desenhar o que estiver ao redor", category: "Jogos e criatividade", energy: "baixa", budget: "gratis", duration: "30–60 min",
      description: "Levem papel para uma praça, biblioteca ou café. Escolham um objeto e desenhem por alguns minutos, com liberdade para brincar e conversar.",
      conversation: "O que você percebeu enquanto olhava esse detalhe?",
      accessibility: "Podem escrever, fotografar objetos ou só observar. Escolham um formato confortável, sem comparar habilidade."
    },
    {
      id: "musica", title: "Trocar músicas num café tranquilo", category: "Música e histórias", energy: "baixa", budget: "economico", duration: "30–60 min",
      description: "Cada pessoa indica algumas músicas e conta o que gosta nelas. Um lugar de baixo ruído deixa espaço para ouvir as histórias.",
      conversation: "Que música você voltaria a ouvir pela primeira vez?",
      accessibility: "Combinar volume e respeitar sensibilidades faz parte. Não é preciso usar fones compartilhados nem ouvir tudo na hora."
    },
    {
      id: "fotografia", title: "Um olhar diferente para a cidade", category: "Arte e cultura", energy: "media", budget: "gratis", duration: "30–60 min",
      description: "Escolham um espaço público e procurem detalhes interessantes: cores, arquitetura ou plantas. A câmera do celular é suficiente e fotografar é opcional.",
      conversation: "Qual detalhe daqui você acha que quase ninguém percebe?",
      accessibility: "Planejem um trecho acessível. Peçam autorização antes de fotografar pessoas e antes de publicar imagens do encontro."
    },
    {
      id: "clube", title: "Conhecer um grupo de interesse", category: "Comunidade e cuidado", energy: "media", budget: "gratis", duration: "45–90 min",
      description: "Procurem um clube de leitura, observação da natureza, idiomas ou outro grupo aberto a adultos. Participem pela atividade, com respeito às regras locais.",
      conversation: "O que te trouxe para esse grupo?",
      accessibility: "Perguntem sobre tamanho do grupo, ruído e acolhimento a iniciantes. Fazer amizade já é um resultado válido."
    }
  ],
  scripts: [
    { id: "online", context: "Primeira conversa", title: "Começar a partir de um interesse", text: "Oi! Vi sua indicação de livro e fiquei curioso. O que você mais gostou nele?", note: "Troque o assunto por algo que a pessoa realmente compartilhou e que também desperte sua curiosidade." },
    { id: "presencial", context: "Primeira conversa", title: "Uma abertura no mesmo contexto", text: "Oi! É sua primeira vez nessa atividade? Estou conhecendo o espaço hoje.", note: "Use apenas se for verdadeiro. A outra pessoa pode preferir continuar a atividade em silêncio." },
    { id: "pausa", context: "Timidez e TDAH", title: "Retomar a escuta", text: "Me empolguei contando isso. Quero ouvir você também: como foi para você?", note: "Você pode reparar uma interrupção e devolver a palavra. Essa frase é uma opção editorial, sem promessa de resultado." },
    { id: "branco", context: "Timidez e TDAH", title: "Quando der um branco", text: "Fiquei um pouco tímido agora. Vou tomar uma água e já volto para a conversa.", note: "Adapte o gênero e o tom. Pedir um momento é permitido; você não precisa explicar um diagnóstico." },
    { id: "retomada", context: "Depois da conversa", title: "Retomar com clareza", text: "Oi! Gostei da nossa conversa sobre aquele assunto. Como você está?", note: "Use quando houve uma troca anterior. Se um convite ficar sem resposta, deixe espaço; não crie uma sequência de cobranças." },
    { id: "cafe", context: "Convite", title: "Um encontro simples", text: "Gostei de conversar com você. Quer tomar um café no sábado à tarde? Podemos escolher um lugar tranquilo.", note: "Definam local, horário e custo juntos, somente depois de a pessoa aceitar o convite." },
    { id: "confirmacao", context: "Convite", title: "Confirmar o combinado", text: "Nosso encontro de amanhã às 16h continua bom para você? Se precisar mudar, me avise.", note: "Envie perto do encontro, conforme o combinado. Mudar de plano não cria obrigação de compensação afetiva." },
    { id: "recusar", context: "Limites e cuidado", title: "Recusar sem hostilidade", text: "Obrigado pelo convite. Não quero seguir numa aproximação romântica. Desejo que você fique bem.", note: "Adapte à situação. Clareza e respeito são suficientes; você não deve uma justificativa íntima." },
    { id: "consentimento", context: "Limites e cuidado", title: "Perguntar antes de um beijo", text: "Estou com vontade de te beijar. Você também quer?", note: "Espere concordância livre e clara. Pare se houver recusa, hesitação, afastamento ou mudança de ideia." },
    { id: "sensorial", context: "Timidez e TDAH", title: "Pedir um ambiente confortável", text: "Eu aproveito melhor a conversa em lugares mais tranquilos. Você toparia um lugar com menos barulho?", note: "A outra pessoa pode ter necessidades diferentes. Procurem uma alternativa que funcione para ambas." },
    { id: "sem-reciprocidade", context: "Limites e cuidado", title: "Aceitar que o interesse não foi mútuo", text: "Entendi. Obrigado por falar com clareza. Vou respeitar seu espaço.", note: "Recusa pede respeito. Não procure uma nova estratégia para convencer a pessoa nem mude de canal para insistir." },
    { id: "encerrar", context: "Depois da conversa", title: "Encerrar uma aproximação", text: "Gostei de te conhecer, mas percebi que não quero continuar romanticamente. Prefiro te dizer isso com respeito e clareza.", note: "Em situações de ameaça ou violência, priorize sua segurança e apoio de pessoas ou serviços de confiança." }
  ],
  guides: [
    {
      id: "timidez", title: "Timidez: comece num tamanho confortável",
      body: "Você pode participar de um encontro sendo uma pessoa tímida. Escolha uma situação em que consiga permanecer por um tempo confortável e tenha liberdade para fazer uma pausa. Um café curto, uma atividade em grupo ou uma conversa sobre algo à sua frente são possibilidades para experimentar. Não é necessário transformar o encontro em uma apresentação sobre quem você é.\n\nAntes de sair, escolha um assunto que desperte curiosidade. Durante a conversa, uma observação simples pode bastar para começar. Se vier um silêncio, você pode olhar ao redor, beber água ou deixar a outra pessoa pensar. Depois, procure recordar o que de fato aconteceu, em vez de decidir que um gesto isolado revelou tudo sobre o encontro.\n\nTimidez e transtorno de ansiedade social não são equivalentes. Quando o medo de avaliação provoca sofrimento persistente ou limita sua vida, vale procurar avaliação profissional. As propostas do Namoro360X são sugestões de uso cotidiano e não constituem tratamento. Referência: NIMH, ansiedade social.",
      exercise: "Se quiser experimentar: escolha uma situação pequena e escreva uma pergunta que você faria por curiosidade, sem obrigação de usá-la."
    },
    {
      id: "conversa-tdah", title: "TDAH: abrir espaço para as duas vozes",
      body: "TDAH significa transtorno do déficit de atenção com hiperatividade. Algumas pessoas com TDAH relatam falar muito, interromper ou perder o fio de uma conversa; essas experiências variam entre indivíduos. Dificuldades de comunicação merecem atenção, e não definem seu caráter.\n\nUma experiência possível é usar a sequência: perguntar, ouvir, comentar brevemente e pausar. Se uma ideia surgir enquanto a outra pessoa fala, veja se consegue guardá-la por um momento. Quando fizer sentido, peça licença para anotar uma palavra, sem registrar informações pessoais da outra pessoa. Se interromper, uma reparação curta costuma ser mais útil do que um longo pedido de desculpas: “Pode terminar; quero te ouvir”.\n\nEscolham também condições práticas: volume do lugar, duração do encontro e intervalos. Conte necessidades que queira compartilhar; você decide quando falar de um diagnóstico. Se os sintomas prejudicam relacionamentos, converse com o profissional que acompanha seu cuidado. Nenhuma dica do site indica ajuste de medicamento. Referências: NHS e CHADD.",
      exercise: "Experimento opcional: numa conversa cotidiana, faça uma pergunta e espere a pessoa concluir antes de comentar. Observe como foi, sem dar uma nota para si."
    },
    {
      id: "curiosidade", title: "Afinidade se descobre na convivência",
      body: "Gostar de aprender, conversar com curiosidade e agir com honestidade são desejos legítimos para um relacionamento. O Namoro360X transforma esses desejos em assuntos para conversar e comportamentos para observar. Formação, profissão, renda, aparência ou número de seguidores não comprovam inteligência, maturidade ou integridade.\n\nProcure conhecer o que a pessoa gosta de fazer, como apresenta uma opinião e como lida quando vocês discordam. Compartilhe também um pouco de você. Vocês podem se interessar por temas diferentes e ainda apreciar a companhia. Ninguém precisa passar por um teste de repertório para participar.\n\nUse atividades para explorar afinidades: visitar uma exposição, comentar um livro ou aprender algo lado a lado. É possível descobrir que vocês combinam como amigos, que há curiosidade romântica ou que os interesses não se encontram. Essas descobertas têm valor e podem acontecer em ritmos diferentes. O catálogo de atividades é uma proposta editorial; não há garantia de atração ou formação de casal. Referência de contexto: NHS, convivência e bem-estar.",
      exercise: "Se ajudar, escolha um interesse para compartilhar e um assunto sobre o qual gostaria de aprender com outra pessoa."
    },
    {
      id: "consentimento", title: "Liberdade para querer, recusar e mudar",
      body: "A aproximação deve permitir que ambas as pessoas escolham livremente. Consentimento precisa ser claro, específico e continuar presente. Um sim para uma atividade não autoriza outras; ele também pode mudar. Silêncio, imobilidade ou ausência de resistência não estabelecem concordância. Pare diante de hesitação ou afastamento e não avance se a pessoa estiver incapaz de decidir. Referência: RAINN.\n\nAlgumas situações também pedem preservar limites profissionais: cuidado clínico, avaliação, supervisão e dependência podem dificultar uma recusa livre. Este projeto propõe conhecer pessoas fora dessas relações de autoridade.\n\nPara encontros iniciais, combinem um espaço público e uma atividade que possa terminar sem dificuldade. Cada pessoa pode organizar seu transporte e escolher o que compartilhar sobre sua vida. Informar um limite merece respeito. Você também pode dizer que não quer, pedir uma pausa e procurar apoio quando uma interação se tornar desconfortável ou insegura.",
      exercise: "Ensaio opcional: diga em voz alta uma pergunta curta de consentimento e uma frase para comunicar seu próprio limite."
    },
    {
      id: "rejeicao", title: "Quando a troca não continua",
      body: "Uma aproximação pode não avançar, mesmo depois de uma conversa agradável. Você pode sentir tristeza, frustração ou vergonha. Dê espaço para esses sentimentos e procure companhia de confiança quando desejar. A resposta de uma pessoa não mede o valor de toda a sua vida.\n\nAo rever a situação, separe o que foi dito ou feito daquilo que você está imaginando. “Ela recusou o convite” descreve um fato. “Ninguém vai gostar de mim” é uma conclusão muito mais ampla, que aquele encontro não permite estabelecer. Evite procurar uma explicação em cada curtida, fotografia ou horário de acesso.\n\nSe houve recusa, respeite o espaço da pessoa e siga para atividades que façam sentido para você. Persistência não é uma prova de afeto. Se o medo de rejeição começa a limitar o cotidiano ou gera sofrimento intenso, buscar ajuda profissional é uma possibilidade de cuidado. Referência: NIMH, medo de avaliação e apoio profissional. Esta leitura não oferece diagnóstico.",
      exercise: "Se for útil: anote uma observação concreta, um sentimento e uma interpretação que ainda não pode confirmar. Guarde o registro somente para você."
    },
    {
      id: "acordos", title: "Constância com espaço para a vida real",
      body: "A frequência de mensagens e encontros pode mudar conforme trabalho, descanso, saúde e preferências. Conversem sobre o que é possível para cada pessoa. Ter um acordo explícito pode ser mais simples do que tentar descobrir a regra pela quantidade de respostas.\n\nVocê pode dizer que gosta de confirmar o encontro no dia anterior, que nem sempre acompanha o celular ou que precisa de um local menos ruidoso. Pergunte o que ajuda a outra pessoa também. Um lembrete, uma combinação escrita ou uma mudança de horário só fazem sentido quando são escolhidos por quem vai usá-los.\n\nQuando houver um desencontro, reconheça o efeito e proponha uma reparação possível: avisar melhor, remarcar ou explicar uma limitação. TDAH pode fazer parte da conversa sobre necessidades, mas não cria obrigação de aceitar desrespeito. Ambos podem rever os combinados. Este é um roteiro editorial de comunicação; o cuidado clínico de TDAH deve considerar necessidades individuais com profissionais habilitados. Referências: NHS e NICE NG87.",
      exercise: "Conversa opcional: cada pessoa completa “Uma coisa que facilita nossos encontros é…” e “Quando um plano mudar, prefiro que…”."
    }
  ],
  sources: [
    { title: "NHS · TDAH em adultos", url: "https://www.nhs.uk/conditions/adhd-adults/", note: "Sintomas variáveis, impacto na vida diária e cuidado individual. Revisado em 19/03/2025; consultado em 29/10/2026." },
    { title: "NIMH · Ansiedade social", url: "https://www.nimh.nih.gov/health/publications/social-anxiety-disorder-more-than-just-shyness", note: "Diferença entre timidez e sofrimento persistente; avaliação e tratamentos. Revisado em 2025; consultado em 29/10/2026." },
    { title: "RAINN · Consentimento", url: "https://rainn.org/share-the-facts/consent-101-respect-boundaries-and-building-trust/", note: "Concordância livre e contínua, limites e direito de mudar de ideia. Atualizado em 31/05/2026; consultado em 29/10/2026." },
    { title: "NHS · Convivência e bem-estar", url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/five-steps-to-mental-wellbeing/", note: "Conexões sociais, aprendizagem e atividades comunitárias. Revisado em 14/10/2026; consultado em 29/10/2026." },
    { title: "CHADD · Relações e habilidades sociais", url: "https://chadd.org/for-adults/relationships-social-skills/", note: "Informação educacional de associação de TDAH sobre trocas sociais. Consultado em 29/10/2026; não é ensaio clínico." },
    { title: "NICE NG87 · Cuidado em TDAH", url: "https://www.nice.org.uk/guidance/ng87", note: "Diretriz de diagnóstico e manejo por profissionais. Resumo público consultado em 29/10/2026; ver limites de acesso em FONTES.md." }
  ]
};
