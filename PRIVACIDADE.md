# Privacidade e dados — versão 1.2

Atualização: 31/10/2026.

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

O provedor de hospedagem pode registrar informações técnicas de acesso. Links externos levam a serviços com suas próprias políticas. A área de transferência e a pasta Downloads pertencem ao sistema do visitante. Em dispositivo compartilhado, não guarde escolhas e proteja qualquer arquivo que decida baixar.

O armazenamento do navegador não é uma conta e não sincroniza escolhas entre aparelhos. Exclusão de dados do navegador, modo privado ou restrições do dispositivo podem impedir persistência. O código trata esse caso mantendo o uso em memória durante a sessão.

## Próxima versão com participantes

Exigirá uma política específica, responsável operacional, minimização de dados, controles de acesso, retenção e exclusão, além de moderação e atendimento a denúncias. Esse serviço ainda não existe na v1. Evite enviar informações pessoais por issues públicas do GitHub.
