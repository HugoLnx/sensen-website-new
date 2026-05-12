# Documentação Completa do Ecossistema Sensen Games

## 1. Visão Geral do Produto

O Ecossistema Sensen Games é uma aplicação web desenvolvida para o estúdio de jogos "Sensen Games". Seu objetivo é apresentar o catálogo de jogos do estúdio e servir como um hub de informações para a comunidade, imprensa e criadores de conteúdo.

O produto é composto por:

* **`sensen-games`**: O Frontend Público, o site voltado para os usuários finais. Ele exibe o catálogo de jogos, informações sobre o estúdio, formulários de contato e de inscrição em lista de e-mails, além de servir como portfólio.

## 2. História do Produto

O projeto Sensen Games começou como uma solução de **frontend estático**, simples e direta, focada unicamente em apresentar um portfólio de jogos. Essa abordagem, embora rápida para um MVP (Produto Mínimo Viável), apresentava limitações significativas.

Com isso, foi pensado em uma preparação para um e-commerce, com um sistema de catálogo, com filtros de acordo com o gênero do jogo, de modo que seja possível adicionar os jogos desejados a uma Lista de Desejos e também ao Carrinho de compras, para caso o estúdio almeje  realizar as vendas por conta própria, em um futuro próximo, sem depender de serviços de distribuição.

Essa evolução transformou o Sensen Games de um simples site estático de exibição dos jogos em um **ecossistema completo e dinâmico**, pronto para crescer e se adaptar às futuras necessidades do estúdio.

## 3. Tecnologias Utilizadas

### Frontend Público (`sensen-games`)

* **Framework**: [React.js](https://react.dev/) (com [Vite.js](https://vitejs.dev/) para desenvolvimento rápido e builds otimizados).
* **Estilização**: [Tailwind CSS](https://tailwindcss.com/) (para utilitários CSS e design responsivo) e CSS puro.
* **Roteamento**: [React Router DOM](https://reactrouter.com/en/main) (para navegação entre páginas).
* **Requisições HTTP**: [Axios](https://axios-http.com/) (para comunicação com o `sensen-backend`).
* **Gerenciamento de Estado Global**: [React Context API](https://react.dev/learn/passing-props-with-context) (utilizado para gerenciar configurações globais do site).
* **Ícones**: [React Icons](https://react-icons.github.io/react-icons/) (para fácil inclusão de ícones populares).

## 4. Estrutura da Aplicação (Visão Geral)

* **`sensen-games`**: Atualmente, consome dados mockados, do arquivo mockData.ts, para exibir o catálogo de jogos e informações do estúdio.
* Próximos passos: Gerar um backend que possa fornecer os dados dinamicamente e conectá-lo ao frontend. Pode-se, inclusive, ser gerada uma nova aplicação de gestão das informações do site, permitindo ao estúdio gerenciar as informações através de uma plataforma, sem a necessidade de nenhuma intervenção direta no código.

A comunicação entre os frontends e o backend é realizada via requisições HTTP (RESTful).

## 5. Como Rodar o Produto Completo

Para iniciar e testar o ecossistema Sensen Games em seu ambiente local, siga os passos abaixo:

### Pré-requisitos

* **Node.js**: Versão 18 ou superior.
* **npm**: Gerenciador de pacotes do Node.js.

### Passos para Inicialização

#### a. Configuração e Inicialização do Frontend Público (`sensen-games`)

1. **Instale as dependências**:

```bash
npm install
```

2. **Inicie o frontend público**:

```bash
npm run dev
```

O site público será iniciado e estará acessível, por padrão, em `http://localhost:5173`.

## 6. Objetivos e Funcionalidades Atuais

### Frontend Público (`sensen-games`)

* **Catálogo de Jogos**: Exibição dinâmica de todos os jogos disponíveis no catálogo, com cards interativos.
* **Páginas de Detalhes do Jogo**: Cada jogo possui uma página dedicada com informações detalhadas, imagem de capa e vídeo de preview.
* **Página Inicial (Home)**: Seção hero com jogos em destaque, carrosel de streamers parceiros com filtro de idioma, seções "Sobre o Estúdio" e "Lista de E-mails" configuráveis via admin.
* **Formulário de Contato**: Permite aos visitantes enviar mensagens ao estúdio.
* **Mailing List**: Formulário para inscrição na lista de e-mails do estúdio.
* **Exibição de Mídias**: Imagens e vídeos de jogos são carregados do backend e exibidos corretamente.
