# Privacidade e dados — versão 1.3

Atualização: 03/11/2026.

O Namoro360X v1 é um guia estático. Não recebe inscrições nem mantém uma base de participantes.

## O que o código faz

- Processa filtros, mensagens e convites dentro do navegador.
- Guarda somente etapas, favoritas e modo foco se a pessoa ativar a opção correspondente. Chave: `namoro360x.preferences.v1`.
- O plano em `plano.html` tem adesão separada, desativada por padrão: guarda apenas os IDs dos passos concluídos, etapa aberta e ritmo na chave `namoro360x.plan.v1`. Não há campos para registrar pessoas ou conversas.
- Desativar o salvamento do plano remove sua cópia local e mantém o estado apenas na aba atual. Recomeçar exige confirmação e apaga o progresso do plano, sem modificar as escolhas do guia original.
- Se o navegador impedir o armazenamento ou a remoção, o aplicativo informa a falha; a persistência de arquivos abertos por `file://` depende do navegador.
- Não guarda automaticamente convites ou rascunhos, nem os inclui em links ou parâmetros de URL.
- Permite copiar o texto e baixar arquivos por solicitação do visitante. Esses arquivos ficam no dispositivo e podem continuar existindo após limpar os dados do site.
- Oferece exclusão das escolhas armazenadas e limpeza dos rascunhos da sessão.

## O que depende do ambiente

O Estúdio360X não persiste a escolha de situação, alternativa ou roteiro: após recarregar, volta à primeira opção. Os roteiros baixados ou impressos ficam sob controle de quem os salvou. Não há formulário de inscrição comercial ou captura de email.

### Instalação e cópia offline

Instalar pela interface do navegador e guardar uma cópia offline são escolhas diferentes. O botão **Ativar cópia offline** registra um service worker e armazena uma lista fechada de arquivos gerais do aplicativo em Cache Storage, incluindo guias, ilustração e exemplos. Isso requer navegador compatível e HTTPS ou localhost. Nenhum campo preenchido, resposta do ensaio, dado de pagamento ou resposta de API entra nessa lista. Os arquivos HTML portáteis não registram service worker.

**Remover cópia offline** desregistra somente o worker desta instalação e exclui somente os caches Namoro360X deste escopo. Fechar abas pode ser necessário para encerrar um controlador anterior. Isso não apaga as preferências locais do plano/guia, arquivos baixados ou o ícone instalado: cada um tem seu controle próprio. A exclusão do cache não deve recriá-lo em uma aba antiga sem nova ativação.

A cópia offline contém conteúdo geral, também disponível no código público. O acesso privado da hospedagem protege a visita online; não é DRM, não protege um produto pago e não impede leitura de conteúdo geral já baixado. O worker não substitui respostas de login ou acesso negado por um conteúdo salvo. Os caches não sincronizam entre dispositivos e podem ser apagados pelo navegador.

Não há gateway de pagamento nesta versão. Uma futura cobrança terá informações específicas sobre vendedor, tratamento de dados, pagamento, entrega e suporte, antes de sua ativação.

O provedor de hospedagem pode registrar informações técnicas de acesso. Links externos levam a serviços com suas próprias políticas. A área de transferência e a pasta Downloads pertencem ao sistema do visitante. Em dispositivo compartilhado, não guarde escolhas e proteja qualquer arquivo que decida baixar.

O armazenamento do navegador não é uma conta e não sincroniza escolhas entre aparelhos. Exclusão de dados do navegador, modo privado ou restrições do dispositivo podem impedir persistência. O código trata esse caso mantendo o uso em memória durante a sessão.

## Próxima versão com participantes

Exigirá uma política específica, responsável operacional, minimização de dados, controles de acesso, retenção e exclusão, além de moderação e atendimento a denúncias. Esse serviço ainda não existe na v1. Evite enviar informações pessoais por issues públicas do GitHub.
