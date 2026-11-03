/* Namoro360X · Estúdio de conversas e Kit360X · propostas editoriais, 2026-11-03. */
(function (root) {
  'use strict';
  root.N360_STUDIO_DATA = {
    version: '1.3.0',
    updatedAt: '2026-11-03',
    scenarios: [
      {
        id: 'interesse-comum',
        title: 'Um interesse em comum',
        context: 'Vocês estão numa atividade aberta a adultos. A outra pessoa comenta um livro que você também conhece e permanece na conversa.',
        question: 'Como você gostaria de abrir espaço para essa troca?',
        options: [
          { id: 'perguntar', text: 'Fazer uma pergunta sobre a experiência dela com o livro.', feedback: 'Uma pergunta ligada ao que acabou de ser dito oferece um assunto concreto. Espere a resposta antes de acrescentar sua própria leitura.', takeaway: 'Curiosidade pode começar com uma pergunta pequena.' },
          { id: 'compartilhar', text: 'Contar brevemente o que chamou minha atenção e devolver a palavra.', feedback: 'Compartilhar uma impressão também participa da conversa. Uma ou duas frases podem deixar espaço para ouvir uma opinião diferente.', takeaway: 'Troca inclui revelar um pouco de você e escutar.' },
          { id: 'acompanhar', text: 'Ouvir por enquanto e comentar quando houver uma abertura.', feedback: 'Você pode observar o ritmo da conversa e participar quando se sentir confortável. Sua presença não precisa virar uma apresentação.', takeaway: 'Você escolhe o momento de participar.' }
        ],
        example: 'Também fiquei pensando nesse capítulo. O que mais chamou sua atenção nele?'
      },
      {
        id: 'branco',
        title: 'Deu um branco',
        context: 'O assunto termina durante uma conversa agradável. Você não sabe o que dizer em seguida e sente vontade de preencher o silêncio.',
        question: 'Qual gesto seria confortável para você agora?',
        options: [
          { id: 'pausar', text: 'Tomar uma água e deixar a pausa existir.', feedback: 'Uma pausa pode fazer parte da conversa. Você não precisa encontrar imediatamente uma pergunta brilhante nem explicar tudo o que está sentindo.', takeaway: 'Silêncio breve não é uma avaliação do seu valor.' },
          { id: 'contexto', text: 'Voltar a um detalhe verdadeiro do lugar ou da atividade.', feedback: 'O ambiente pode oferecer um assunto: uma obra, uma música ou a atividade que vocês escolheram. Evite inventar uma opinião apenas para manter a fala.', takeaway: 'Um contexto compartilhado oferece assunto suficiente.' },
          { id: 'nomear', text: 'Dizer, se eu quiser, que fiquei um pouco tímido e pedir um momento.', feedback: 'Você decide o quanto quer compartilhar. É possível nomear uma dificuldade sem expor um diagnóstico ou pedir que a pessoa resolva seu desconforto.', takeaway: 'Pedir um momento é uma forma de se comunicar.' }
        ],
        example: 'Fiquei um pouco tímido agora. Vou tomar uma água. O que você achou dessa última parte da atividade?'
      },
      {
        id: 'fala-longa',
        title: 'Me empolguei falando',
        context: 'Você percebe que contou uma história longa e quase não deixou a outra pessoa participar. Não precisa concluir o que ela está pensando para ajustar a conversa.',
        question: 'Como você prefere devolver espaço para a outra pessoa?',
        options: [
          { id: 'devolver', text: 'Parar a história e fazer uma pergunta ligada ao que ela tinha contado.', feedback: 'Você pode reconhecer que se empolgou e devolver a palavra com uma frase curta. Escute a resposta, sem preparar a continuação da sua história enquanto isso.', takeaway: 'Uma reparação pequena já muda o próximo momento.' },
          { id: 'resumir', text: 'Resumir meu ponto em uma frase e fazer uma pausa.', feedback: 'Um resumo oferece um encerramento para sua ideia. A pausa seguinte permite que a outra pessoa escolha participar, mudar de assunto ou ficar em silêncio.', takeaway: 'Você pode encerrar uma ideia sem esgotar o assunto.' },
          { id: 'checar', text: 'Perguntar se ela quer ouvir mais ou mudar de assunto.', feedback: 'Perguntar permite combinar o ritmo sem presumir tédio ou interesse. Qualquer uma das respostas merece espaço e respeito.', takeaway: 'O ritmo pode ser combinado pelas duas pessoas.' }
        ],
        example: 'Me empolguei contando isso. Quero ouvir você também: como foi essa experiência para você?'
      },
      {
        id: 'convite',
        title: 'Transformar a conversa em convite',
        context: 'Vocês vêm participando da conversa e você quer conhecer a pessoa fora daquele contexto. Ainda não existe um encontro combinado.',
        question: 'Que tipo de convite representa melhor sua intenção?',
        options: [
          { id: 'cafe', text: 'Convidar para um café em local público, esclarecendo a intenção.', feedback: 'Uma ideia concreta facilita a decisão. Se a intenção for romântica, você pode dizer “como um encontro”, sem antecipar compromisso ou intimidade.', takeaway: 'Um convite claro deixa a decisão com a outra pessoa.' },
          { id: 'atividade', text: 'Propor uma atividade que apareceu na conversa.', feedback: 'Retomar um interesse verdadeiro dá contexto ao convite. Confirme disponibilidade, custo e conforto antes de reservar ou comprar algo.', takeaway: 'Uma afinidade pode virar uma proposta prática.' },
          { id: 'grupo', text: 'Sugerir uma atividade em grupo, dizendo que esse é o formato.', feedback: 'Conhecer pessoas em grupo também é uma escolha válida. Seja transparente sobre o formato; não apresente um encontro a dois como se fosse uma atividade coletiva.', takeaway: 'O formato combinado precisa corresponder à proposta.' }
        ],
        example: 'Estou gostando de conversar com você. Topa um café comigo no sábado à tarde, como um encontro? Podemos escolher um lugar tranquilo.'
      },
      {
        id: 'recusa',
        title: 'Receber uma recusa',
        context: 'Depois de um convite, a pessoa diz que não quer uma aproximação romântica. Ela não precisa apresentar uma justificativa para esse limite.',
        question: 'Como você quer reconhecer a resposta e encerrar a investida?',
        options: [
          { id: 'agradecer', text: 'Agradecer pela clareza e respeitar o espaço dela.', feedback: 'Uma resposta curta é suficiente. Depois, encerre a aproximação romântica, sem negociar ou esperar que a pessoa cuide da sua frustração.', takeaway: 'Aceitar uma recusa é uma ação que depende de você.' },
          { id: 'encerrar', text: 'Responder com respeito e retomar outras partes do meu dia.', feedback: 'Você pode sentir tristeza e ainda respeitar o limite. Procurar companhia de confiança ou uma atividade sua pode ajudar a atravessar esse momento.', takeaway: 'Seu sentimento merece cuidado sem criar obrigação para o outro.' },
          { id: 'espaco', text: 'Não acrescentar outra mensagem e manter o limite recebido.', feedback: 'Não é obrigatório prolongar a conversa. Se a troca já está encerrada, respeitar o espaço inclui não buscar novas contas, canais ou intermediários.', takeaway: 'Encerrar também pode significar deixar a conversa terminar.' }
        ],
        example: 'Entendi. Obrigado por me dizer com clareza. Vou respeitar seu espaço.'
      },
      {
        id: 'silencio',
        title: 'O convite ficou sem resposta',
        context: 'Você enviou um convite e não recebeu confirmação. Não há informação suficiente para saber a razão, e nenhum encontro está marcado.',
        question: 'O que você pode fazer sem tentar controlar a resposta?',
        options: [
          { id: 'iniciativa', text: 'Deixar a iniciativa com a pessoa e seguir meus compromissos.', feedback: 'A falta de confirmação não precisa ser investigada para que você dê espaço. Não reserve algo em nome dos dois nem trate o convite como aceito.', takeaway: 'Sem confirmação, não há encontro combinado.' },
          { id: 'observar', text: 'Separar o que aconteceu da interpretação que estou fazendo.', feedback: '“Não houve resposta” é uma observação. Conclusões sobre seu valor ou o caráter da pessoa vão além desse fato. Você pode notar a interpretação sem tratá-la como certeza.', takeaway: 'Uma informação incompleta continua incompleta.' },
          { id: 'pausa', text: 'Fechar o aplicativo por um tempo e voltar a uma atividade minha.', feedback: 'Você pode escolher quando usar o celular. Isso não precisa ser um teste para provocar uma resposta nem uma forma de punir a pessoa.', takeaway: 'Sua atenção pode voltar ao que está ao seu alcance.' }
        ],
        example: 'Para lembrar a si: eu fiz um convite; ele ainda não foi aceito. Posso dar espaço e continuar meu dia.'
      },
      {
        id: 'reciprocidade',
        title: 'A conversa está boa. E agora?',
        context: 'A pessoa também inicia assuntos, pergunta sobre você e participa da troca. Isso mostra envolvimento na conversa, mas não esclarece sozinho se o interesse é romântico.',
        question: 'Como você gostaria de descobrir o que faz sentido para os dois?',
        options: [
          { id: 'intencao', text: 'Contar minha intenção e perguntar o que ela procura.', feedback: 'Você pode compartilhar o que deseja sem exigir a mesma resposta. Intenções diferentes são informações para decidir, não um desafio para convencer alguém.', takeaway: 'Clareza permite descobrir expectativas reais.' },
          { id: 'encontro', text: 'Fazer um convite romântico claro e deixar espaço para a resposta.', feedback: 'Um convite pode esclarecer o contexto de forma simples. Um sim vale para aquele encontro; não confirma exclusividade ou consentimento para contato físico.', takeaway: 'Cada combinação tem seu próprio alcance.' },
          { id: 'conhecer', text: 'Continuar conhecendo a pessoa, sem decidir ainda.', feedback: 'Você também pode precisar de tempo. Continue participando com honestidade, sem tratar simpatia como promessa e sem criar uma expectativa que não deseja corresponder.', takeaway: 'Você pode escolher um ritmo compatível com sua intenção.' }
        ],
        example: 'Estou gostando de te conhecer e tenho interesse em um encontro. Como você se sente com essa ideia?'
      },
      {
        id: 'limite-profissional',
        title: 'Existe uma relação de autoridade',
        context: 'Você sente atração por uma pessoa que está atualmente sob sua supervisão, avaliação ou cuidado. Gentileza nesse contexto não confirma atração.',
        question: 'Como preservar a liberdade e os limites dessa relação?',
        options: [
          { id: 'profissional', text: 'Manter o contato restrito ao vínculo profissional.', feedback: 'A relação de autoridade pode dificultar uma recusa livre. Nesta situação, preserve o vínculo de supervisão, avaliação ou cuidado e não faça a abordagem romântica.', takeaway: 'Sentir atração não obriga a agir sobre ela.' },
          { id: 'outros-contextos', text: 'Buscar oportunidades sociais fora das minhas relações de autoridade.', feedback: 'Você pode escolher atividades em que os participantes tenham liberdade para decidir sobre uma aproximação, sem depender de você profissionalmente.', takeaway: 'O contexto importa para a liberdade de escolha.' },
          { id: 'rever', text: 'Rever minhas interpretações e consultar as regras profissionais aplicáveis.', feedback: 'Cordialidade pode fazer parte do trabalho. Orientação institucional ajuda a preservar limites; não deve ser usada para encontrar um atalho para a aproximação.', takeaway: 'Preserve o contexto profissional e a privacidade das pessoas.' }
        ],
        example: 'Para orientar sua conduta: esta relação envolve supervisão, avaliação ou cuidado. Vou mantê-la profissional e procurar conexões fora desse vínculo.'
      },
      {
        id: 'retomar',
        title: 'Retomar uma conexão que você interrompeu',
        context: 'Houve uma conversa agradável, e você deixou de responder por causa dos próprios compromissos. A pessoa não recusou uma aproximação, pediu distância ou bloqueou você. Este cenário não se aplica a esses limites.',
        question: 'Que retomada breve seria verdadeira para você?',
        options: [
          { id: 'reconhecer', text: 'Reconhecer a demora brevemente e perguntar como ela está.', feedback: 'Você pode assumir a interrupção sem uma longa defesa. A pessoa continua livre para responder ou não; uma retomada não cria uma dívida de atenção.', takeaway: 'Responsabilidade pode caber em poucas palavras.' },
          { id: 'assunto', text: 'Retomar um assunto verdadeiro que os dois estavam compartilhando.', feedback: 'Um detalhe da conversa anterior oferece contexto. Evite fingir que algo aconteceu ou usar uma necessidade urgente como pretexto para obter resposta.', takeaway: 'Um assunto real ajuda a dar continuidade.' },
          { id: 'permissao', text: 'Perguntar se ainda faz sentido retomar a conversa.', feedback: 'Essa pergunta comunica intenção e deixa espaço para a escolha. Se não houver resposta ou se vier uma recusa, não envie novas tentativas nem mude de canal.', takeaway: 'A continuidade precisa continuar sendo uma escolha dos dois.' }
        ],
        example: 'Oi! Acabei me enrolando e deixei nossa conversa parar. Gostei de falar com você. Ainda faz sentido retomarmos?'
      }
    ],
    bundles: [
      {
        id: 'cafe-leitura',
        title: 'Café, leitura e uma boa pergunta',
        objective: 'Conhecer um pouco dos interesses e das histórias de cada pessoa num encontro curto, com um assunto concreto para começar.',
        steps: [
          'Antes: escolham uma cafeteria ou biblioteca com espaço de convivência, acesso confortável e pouco ruído. Combinem uma janela aproximada, como 40 minutos, o custo possível e o transporte de cada pessoa. Levar um livro é opcional.',
          'Durante: cada pessoa pode indicar uma leitura, um filme ou uma ideia que despertou curiosidade. Compartilhem uma impressão e façam uma pergunta. Pausas para beber água ou olhar ao redor fazem parte; ninguém precisa demonstrar repertório.',
          'Depois: se quiserem, contem algo que gostaram da conversa. Perguntem sobre repetir o encontro somente se houver vontade; a resposta pode ser sim, não ou uma escolha de pensar com calma. Guardem ou compartilhem registros apenas com autorização.'
        ],
        conversation: [
          'Que história ficou com você depois de terminar?',
          'Tem algum assunto sobre o qual você mudou de ideia recentemente?',
          'O que você gostaria de aprender só por curiosidade?'
        ],
        comfort: 'Confirmem assentos, ruído, acesso e restrições alimentares. É possível usar áudio, filme ou um assunto cotidiano no lugar de um livro. O tempo é uma sugestão que ambos podem ajustar.',
        limits: 'A atividade não é um teste de inteligência nem exige compras. Um encontro aceito não autoriza intimidade; recusa e mudança de ideia precisam ser respeitadas.'
      },
      {
        id: 'cultura-observacao',
        title: 'Uma exposição e dois olhares',
        objective: 'Descobrir como cada pessoa observa e interpreta algo, com liberdade para opiniões diferentes e para conversar aos poucos.',
        steps: [
          'Antes: procurem uma exposição ou espaço cultural aberto ao público. Confirmem programação, ingresso, acessibilidade e regras com o organizador. Escolham uma parte pequena da visita e um ponto de encontro fácil de identificar.',
          'Durante: cada pessoa escolhe uma obra ou detalhe que queira comentar. Primeiro observem, depois contem o que chamou atenção. Se o espaço exigir silêncio ou estiver cheio, deixem a conversa para uma área apropriada. Mudar o roteiro é permitido.',
          'Depois: procurem um banco ou espaço público de convivência, se ambos quiserem continuar. Compartilhem uma pergunta que a visita trouxe. Despeçam-se com clareza; uma nova atividade pode ser sugerida quando houver interesse mútuo.'
        ],
        conversation: [
          'Qual detalhe fez você parar por mais tempo?',
          'Você viu algo aqui de um jeito diferente do meu?',
          'Se pudesse perguntar uma coisa para quem criou isso, o que seria?'
        ],
        comfort: 'Verifiquem elevadores, percursos, iluminação e locais para sentar. Visita curta e conversa posterior são opções. Discordar sobre uma obra não precisa virar um debate para vencer.',
        limits: 'Não fotografem pessoas ou publiquem imagens do encontro sem autorização. O roteiro não confirma eventos reais nem oferece garantia de afinidade ou formação de casal.'
      },
      {
        id: 'grupo-curioso',
        title: 'Pequena roda de curiosidades',
        objective: 'Apoiar um encontro voluntário de adultos em torno de um interesse, permitindo participar, escutar e fazer amizades sem exposição íntima obrigatória.',
        steps: [
          'Antes: uma pessoa organizadora define um tema simples, como um jogo cooperativo ou uma pergunta de divulgação científica, e confirma um espaço público apropriado. O convite deve informar formato de grupo, duração aproximada, custo e como pedir ajuda ou sair da atividade.',
          'Durante: apresentem a proposta e as regras de convivência. Cada participante escolhe falar ou apenas escutar; ninguém é chamado a explicar diagnóstico, história afetiva ou intenção romântica para o grupo. Façam a atividade com pausas e regras acessíveis.',
          'Depois: ofereçam uma forma opcional de comentar o conforto e a clareza da experiência. Novos encontros podem ser propostos pelo interesse compartilhado. A organização não distribui contatos pessoais; trocas de contato dependem da autorização das pessoas envolvidas.'
        ],
        conversation: [
          'Que pergunta desse tema você gostaria de explorar?',
          'Alguém conhece uma outra maneira de olhar para essa ideia?',
          'O que deixaria uma próxima atividade mais confortável?'
        ],
        comfort: 'Prefiram um grupo que a organização consiga acolher, com assentos e volume confortável. Expliquem regras por escrito quando útil e deixem uma alternativa para quem não quiser falar.',
        limits: 'O roteiro é material de organização, não uma inscrição ou evento ativo. É necessário responsável real, participação voluntária de adultos e condições de acolhimento; ninguém é adicionado a grupos ou listas sem escolha própria.'
      }
    ]
  };
})(typeof window !== 'undefined' ? window : globalThis);
