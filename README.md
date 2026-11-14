# Catálogo de Oficinas

Aplicação web fullstack para cadastro e gerenciamento de oficinas de treinamento. O projeto foi desenvolvido como avaliação prática da disciplina Desenvolvimento Backend I, usando renderização de páginas no servidor.

## Funcionalidades

- Listagem de oficinas e resumo do catálogo: total, inscrições abertas, inscrições encerradas e carga horária das oficinas abertas.
- Visualização de todas as oficinas ou somente das que estão com inscrições abertas.
- Cadastro e edição de oficinas, com validação dos campos obrigatórios e da carga horária de 1 a 40 horas.
- Consulta aos detalhes, inclusive a descrição com suas quebras de linha.
- Abertura e encerramento de inscrições.
- Exclusão com confirmação em uma janela modal do Bootstrap.
- Pesquisa de oficinas por título, sem diferenciar letras maiúsculas de minúsculas.
- Página Sobre com o autor e o objetivo da aplicação.

Os registros são guardados **em memória**. O catálogo começa vazio e os dados são perdidos quando o servidor é encerrado ou reiniciado.

## Tecnologias

- Node.js
- Express 4
- Handlebars com `express-handlebars`
- Bootstrap 5.3.3, servido localmente (sem dependência de CDN)
- JavaScript, HTML e CSS
- Express Generator para a estrutura inicial do projeto

A interface usa o tema escuro por padrão e oferece um controle para alternar entre os temas escuro e claro. A preferência fica salva no navegador.

## Requisitos

- Node.js e npm instalados.
- Porta `3000` disponível, ou outra porta definida pela variável de ambiente `PORT`.

## Como executar

Na pasta do projeto, instale as dependências:

```bash
npm install
```

Inicie o servidor:

```bash
npm start
```

Abra [http://localhost:3000](http://localhost:3000) no navegador. Para encerrar o servidor, pressione `Ctrl+C` no terminal.

## Fluxo da aplicação

1. A página inicial mostra os indicadores do catálogo e lista as oficinas. O catálogo vazio apresenta um link para o cadastro.
2. Em **Nova Oficina**, preencha título, responsável, descrição e carga horária. Uma nova oficina começa com inscrições abertas.
3. Use **Consultar** para ver todos os atributos. A partir dessa página, é possível abrir a edição.
4. Ao editar, são alterados os quatro campos do formulário; o ID e a situação das inscrições são mantidos.
5. Na listagem, é possível alternar inscrições entre abertas e encerradas. O resumo é recalculado ao exibir a página.
6. **Excluir** abre uma confirmação. O registro só é removido após confirmar.
7. **Inscrições Abertas** filtra as linhas da tabela, mantendo o resumo referente ao catálogo completo.
8. **Pesquisa** permite buscar por parte do título e acessar a consulta de cada resultado.

## Rotas principais

| Método | Rota | Ação |
|---|---|---|
| GET | `/` | Lista todas as oficinas e mostra o resumo |
| GET | `/oficina/abertas` | Lista somente as oficinas abertas |
| GET | `/sobre` | Exibe as informações sobre a aplicação |
| GET | `/oficina/nova` | Exibe o cadastro |
| POST | `/oficina/nova` | Cadastra uma oficina |
| GET | `/oficina/consulta/:id` | Exibe os detalhes de uma oficina |
| GET | `/oficina/edita/:id` | Exibe a edição de uma oficina |
| POST | `/oficina/edita/:id` | Salva as alterações |
| POST | `/oficina/status/:id` | Alterna a situação das inscrições |
| POST | `/oficina/exclui/:id` | Confirma e executa a exclusão |
| GET | `/pesquisa` | Exibe a pesquisa |
| POST | `/pesquisa` | Pesquisa por título e exibe os resultados |

## Critérios adicionais de avaliação

| Critério | Evidências na aplicação | Atendimento |
|---|---|---|
| Estrutura de pastas conforme as aulas | Separação entre inicialização em `app.js`, rotas em `routes/`, controladores em `controller/`, modelo em `model/`, telas em `views/` e arquivos estáticos em `public/`. | Atende à organização MVC demonstrada. |
| Padrões e organização do código | As rotas encaminham as requisições ao controlador, que acessa os dados pelo modelo. As operações do modelo são assíncronas e os registros são objetos mantidos em memória. | Atende aos padrões centrais vistos na disciplina. |
| Funcionamento dos fluxos | Cadastro, consulta, edição, alternância das inscrições, exclusão confirmada e pesquisa estão implementados. A carga horária é validada entre 1 e 40 horas. | Atende; os fluxos foram exercitados por HTTP e no navegador. |
| Correção dos indicadores e do filtro de inscrições abertas | O resumo é calculado com base no catálogo completo; o filtro mostra apenas oficinas abertas e contempla os casos sem oficinas abertas. | Atende. |
| Uso dos componentes Bootstrap | Menu `nav-fill` com item ativo, formulários, botões, tabela `table-hover` com cabeçalho `table-primary text-center` e modal de exclusão. Os arquivos Bootstrap são servidos localmente. | Atende; cadastro e confirmação/cancelamento do modal foram testados no navegador. |
| Uso dos recursos estudados até a aula de Bootstrap | O projeto utiliza Node.js, Express, Handlebars, MVC e Bootstrap conforme o escopo do trabalho. | Atende aos recursos centrais utilizados na disciplina. Uma ressalva abaixo sobre o uso do `hbs`.|

**Ressalva:** Os exemplos das aulas utilizam o pacote `hbs`, porém para mitigar dependências vulneráveis, o projeto passou a usar `express-handlebars`, que também renderiza templates Handlebars, mas é um adaptador diferente do mostrado nos exemplos. Isso não muda os fluxos nem o visual da aplicação.

## Organização do projeto

```text
app.js                         Configura o Express, o Handlebars e os arquivos estáticos
bin/www                        Inicia o servidor HTTP
routes/index.js                Associa as rotas às ações do controlador
controller/controllerOficinas.js
                               Processa as requisições e prepara os dados das telas
model/modelOficinas.js         Gerencia os registros em memória
views/layout.hbs               Layout compartilhado e menu principal
views/partials/menu.hbs         Menu de navegação
views/index.hbs                Listagem, indicadores e modal de exclusão
views/sobre.hbs                Página Sobre
views/pesquisa.hbs             Formulário e resultados da pesquisa
views/oficina/                 Formulários e consulta de oficinas
public/stylesheets/            CSS da aplicação e Bootstrap offline
public/javascripts/            JavaScript da aplicação e Bootstrap offline
```
