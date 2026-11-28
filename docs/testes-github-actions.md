# Testes e GitHub Actions

O projeto combina testes automatizados em diferentes níveis com verificações de
formatação, análise estática e build. Os workflows do GitHub Actions executam
essas validações em pushes e pull requests.

## Backend

Os testes usam Pytest e estão separados em:

- `tests/unit/`: valida regras de negócio de forma isolada;
- `tests/integration/`: exercita endpoints e persistência com PostgreSQL.

O Ruff realiza a análise estática e verifica a formatação:

```bash
cd backend
poetry run pytest tests -v
poetry run ruff check .
poetry run ruff format --check .
```

No workflow `ci-backend.yml`, o job de testes cria um PostgreSQL 17, aguarda o
healthcheck, aplica as migrations e executa separadamente os testes unitários e
de integração. Outro job executa o Ruff.

## Frontend

A suíte está organizada em:

- `tests/unit/`: funções, serviços e componentes isolados;
- `tests/integration/`: integração entre componentes da aplicação;
- `tests/e2e/`: fluxo do usuário em um navegador com Playwright.

```bash
cd frontend
npm run format:check
npm run check
npm test
npm run build
npm run test:e2e
```

O workflow `ci-frontend.yml` sobe o banco e a API com Docker Compose, aguarda a
API responder, configura Node.js 24 e executa Biome, Vitest, build e Playwright.
O relatório do Playwright é publicado como artefato por sete dias, inclusive
quando há falha, facilitando o diagnóstico.

## Objetivo da pipeline

A integração contínua impede que alterações incompatíveis sejam aceitas sem
verificação. Ela confirma que:

- o código respeita o padrão de qualidade definido;
- as regras isoladas continuam funcionando;
- frontend, API e banco permanecem integrados;
- o frontend gera um build válido;
- os principais fluxos funcionam em navegador real.

Os atalhos equivalentes também estão disponíveis no `Makefile` da raiz.
