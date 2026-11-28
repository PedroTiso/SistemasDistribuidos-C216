# Frontend com JavaScript, React e Tailwind CSS

O frontend do LabFix é uma aplicação React construída com Vite. Tailwind CSS é
usado na interface, React Router controla a navegação e o módulo de serviços
centraliza a comunicação HTTP com o backend.

## Estrutura

```text
frontend/src/
├── components/       # Formulário, lista e elementos reutilizáveis
├── pages/            # Páginas de boas-vindas e chamados
├── services/         # Chamadas para a API
├── App.jsx            # Rotas e composição da aplicação
├── main.jsx           # Ponto de entrada do React
├── index.css          # Estilos e integração com Tailwind
└── validation.js      # Regras de validação no cliente
```

## Responsabilidades da interface

- apresentar uma tela inicial e a área de gerenciamento de chamados;
- carregar os chamados já persistidos;
- cadastrar título, descrição, local e prioridade;
- validar os campos antes do envio;
- permitir edição e exclusão;
- exibir estados de carregamento, envio e falha.

## Comunicação com a API

As funções de `src/services/maintenanceRequests.js` usam `fetch` e a variável
`VITE_API_URL`. No ambiente local, a URL padrão é
`http://localhost:8000`. As operações da interface correspondem aos métodos
`GET`, `POST`, `PATCH` e `DELETE` da API.

As respostas HTTP sem sucesso são convertidas em erros para que os componentes
possam informar o problema ao usuário.

## Validação

A validação do navegador melhora o retorno imediato ao usuário, mas não
substitui a validação do backend. A API repete as regras com schemas Pydantic,
evitando que clientes externos enviem dados inválidos diretamente.

## Desenvolvimento e qualidade

```bash
cd frontend
npm ci
npm run dev
```

Comandos de verificação:

```bash
npm run format:check
npm run check
npm test
npm run build
npm run test:e2e
```

Vitest e Testing Library cobrem componentes e integrações da interface. O
Playwright valida o comportamento completo em um navegador real, e o Biome
mantém formatação e análise estática consistentes.
