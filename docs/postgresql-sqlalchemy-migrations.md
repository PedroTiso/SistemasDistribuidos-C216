# PostgreSQL, SQLAlchemy e migrations

O LabFix usa PostgreSQL como banco relacional, SQLAlchemy como ORM e Alembic
para controlar mudanças no schema.

## Modelo de dados

A tabela `maintenance_requests` armazena os chamados:

| Campo | Tipo | Regra |
| --- | --- | --- |
| `id` | inteiro | Chave primária |
| `title` | texto de até 100 caracteres | Obrigatório |
| `description` | texto | Obrigatório |
| `location` | texto de até 100 caracteres | Obrigatório |
| `priority` | texto de até 20 caracteres | `low`, `medium` ou `high` |
| `status` | texto de até 20 caracteres | Inicia como `open` |

Na API, os demais estados permitidos são `in_progress`, `resolved` e
`cancelled`. Os schemas Pydantic também limitam o tamanho mínimo e máximo dos
campos antes da persistência.

## Sessões e persistência

A configuração lê `DATABASE_URL`, cria a engine do SQLAlchemy e disponibiliza
uma sessão por requisição. As rotas recebem essa sessão pela injeção de
dependências do FastAPI; os repositories a utilizam para consultar e alterar os
registros.

## Migrations

As migrations ficam em `backend/alembic/versions/`. A migration inicial
`0001_create_maintenance_requests.py` cria a tabela de chamados. Esse histórico
permite reproduzir e evoluir o schema de forma controlada em diferentes
ambientes.

Para aplicar todas as migrations pendentes:

```bash
cd backend
poetry run alembic upgrade head
```

Para consultar a revisão atual ou gerar uma nova migration:

```bash
poetry run alembic current
poetry run alembic revision --autogenerate -m "descricao da alteracao"
```

Os mesmos comandos estão disponíveis na raiz como `make db-upgrade`,
`make db-current` e `make db-migration msg="descricao"`.

## Ambiente Docker

O PostgreSQL usa o volume `postgres_data`. O container do backend aplica as
migrations automaticamente antes de iniciar a API. Assim, uma nova instalação
recebe o schema necessário sem execução manual.
