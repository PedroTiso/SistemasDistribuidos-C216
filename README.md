# LabFix

Sistema full stack para registro e acompanhamento de chamados de manutenção.
O usuário informa o problema, a descrição, o local e a prioridade; a aplicação
persiste os chamados em PostgreSQL e permite listá-los, editá-los e removê-los.

O projeto foi construído com a mesma stack e a mesma evolução incremental das
práticas da disciplina de Sistemas Distribuídos.

## Documentação

A documentação técnica detalhada está organizada na pasta [`docs`](docs/README.md),
com materiais sobre arquitetura, Docker, frontend, persistência, integração
full stack, testes e GitHub Actions.

## Arquitetura

```text
Navegador (React/Vite :5173)
        | HTTP/fetch + CORS
        v
API (FastAPI :8000)
        | SQLAlchemy/Alembic
        v
PostgreSQL (:5432)
```

No ambiente Docker, os serviços são `frontend`, `backend` e `database`. O
backend aplica as migrations antes de iniciar o servidor.

## Tecnologias

### Backend

- Python, Poetry e FastAPI
- SQLAlchemy e PostgreSQL
- Alembic para migrations
- Pytest para testes unitários e de integração
- Ruff para lint e formatação

### Frontend

- React com Vite
- Tailwind CSS
- Vitest e Testing Library
- Playwright para testes end-to-end
- Biome para formatação e análise do código

### Infraestrutura

- Docker e Docker Compose
- GitHub Actions para CI

## Funcionalidades

- Tela inicial de boas-vindas.
- Cadastro de chamados de manutenção.
- Validação de título, descrição, local e prioridade.
- Listagem dos chamados persistidos na API.
- Edição e exclusão de chamados.
- Estados de carregamento, envio e erro no frontend.
- API documentada automaticamente pelo Swagger.

Além das operações usadas diretamente pela interface, a API também oferece
consulta por identificador e substituição completa de um chamado:

| Método | Rota | Finalidade |
| --- | --- | --- |
| GET | `/maintenance-requests` | Lista chamados |
| POST | `/maintenance-requests` | Cria chamado |
| GET | `/maintenance-requests/{request_id}` | Busca um chamado |
| PUT | `/maintenance-requests/{request_id}` | Substitui um chamado |
| PATCH | `/maintenance-requests/{request_id}` | Atualiza parcialmente |
| DELETE | `/maintenance-requests/{request_id}` | Remove um chamado |

## Estrutura principal

```text
backend/
├── alembic/
├── app/
│   ├── api/routes/
│   ├── database/
│   ├── models/
│   ├── repositories/
│   ├── schemas/
│   └── services/
└── tests/
    ├── integration/
    └── unit/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   └── services/
└── tests/
    ├── e2e/
    ├── integration/
    └── unit/
```

## Pré-requisitos

- Docker Desktop em execução.
- Python 3.14 para executar o backend localmente.
- Node.js 24 para executar o frontend localmente.
- Poetry 2.4.x para executar o backend localmente.
- GNU Make, caso queira usar os comandos do `Makefile`. No Windows, também é
  possível usar WSL ou executar diretamente os comandos Docker/npm/Poetry.

## Variáveis de ambiente

O arquivo `.env.example` apresenta as configurações utilizadas pelo ambiente
local. Para criar uma configuração local, copie-o para `.env` e ajuste os
valores quando necessário:

```bash
cp .env.example .env
```

| Variável | Finalidade | Valor padrão |
| --- | --- | --- |
| `POSTGRES_DB` | Nome do banco PostgreSQL | `app_db` |
| `POSTGRES_USER` | Usuário do PostgreSQL | `app_user` |
| `POSTGRES_PASSWORD` | Senha local do PostgreSQL | `app_password` |
| `DATABASE_URL` | URL de conexão usada pelo backend local | `postgresql+psycopg://app_user:app_password@localhost:5432/app_db` |
| `FRONTEND_PORT` | Porta publicada pelo frontend | `5173` |
| `VITE_API_URL` | URL da API utilizada pelo frontend | `http://localhost:8000` |

Os valores padrão do Docker Compose são usados quando as variáveis não são
definidas. O arquivo `.env` não deve ser versionado, pois pode conter dados
locais ou credenciais.

## Executar com Docker

Na raiz do projeto:

```bash
docker compose up --build -d
docker compose ps
```

Endereços disponíveis:

- Frontend: <http://localhost:5173>
- Swagger da API: <http://localhost:8000/docs>
- OpenAPI JSON: <http://localhost:8000/openapi.json>

Para acompanhar os logs:

```bash
docker compose logs -f
docker compose logs backend
```

Para parar os serviços:

```bash
docker compose down
```

Para recriar o banco do zero, removendo também o volume persistente:

```bash
docker compose down -v
docker compose up --build -d
```

O comando `down -v` apaga os dados locais do PostgreSQL e deve ser usado
somente quando essa recriação for desejada.

## Executar localmente

### Backend

```bash
cd backend
poetry install --with dev --no-root
poetry run alembic upgrade head
poetry run uvicorn app.main:app --reload
```

### Frontend

Em outro terminal, com a API disponível:

```bash
cd frontend
npm ci
npm run dev
```

## Testes e qualidade

Backend:

```bash
cd backend
poetry run pytest tests -v
poetry run ruff check .
poetry run ruff format --check .
```

Frontend:

```bash
cd frontend
npm run format:check
npm run check
npm test
npm run build
npm run test:e2e
```

Os testes end-to-end precisam da API e do frontend disponíveis. O workflow do
GitHub Actions sobe o banco e a API antes de executar o Playwright.

## Comandos do Makefile

Os comandos abaixo devem ser executados na raiz:

| Comando | Ação |
| --- | --- |
| `make install` | Instala dependências do backend |
| `make test` | Executa testes do backend |
| `make lint` | Executa Ruff |
| `make format` | Formata o backend |
| `make run` | Inicia a API localmente |
| `make frontend-install` | Instala dependências do frontend |
| `make frontend-format` | Verifica a formatação do frontend |
| `make frontend-check` | Executa o Biome |
| `make frontend-test` | Executa Vitest |
| `make frontend-e2e` | Executa Playwright |
| `make frontend-build` | Gera o build do frontend |
| `make docker-up` | Sobe os três serviços |
| `make docker-down` | Para os containers |
| `make docker-logs` | Acompanha os logs |
| `make docker-ps` | Mostra o status dos containers |
| `make db-upgrade` | Aplica migrations |
| `make db-current` | Mostra a migration atual |
| `make db-migration msg="descricao"` | Gera uma nova migration |

## Integração contínua

Os workflows em `.github/workflows/` validam o backend e o frontend em pushes
e pull requests. A validação cobre testes, Ruff, Biome, build e Playwright.

## Fluxo da aplicação

Ao abrir a tela de chamados, o frontend executa um `GET` para carregar os
registros persistidos. O formulário valida os dados no cliente e envia um
`POST` para novos chamados. Edição e exclusão usam `PATCH` e `DELETE`. A API
valida novamente os dados, aplica as regras de negócio, acessa o repository e
persiste as alterações no PostgreSQL.
