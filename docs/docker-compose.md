# Ambiente com Docker Compose

O Docker Compose permite executar todo o LabFix com um único comando, sem
instalar Python, Poetry, Node.js ou PostgreSQL diretamente na máquina.

## Serviços

| Serviço | Imagem ou build | Porta | Responsabilidade |
| --- | --- | --- | --- |
| `frontend` | `frontend/Dockerfile` | `5173` | Aplicação React servida pelo Vite |
| `backend` | `backend/Dockerfile` | `8000` | API FastAPI executada pelo Uvicorn |
| `database` | `postgres:17-alpine` | `5432` | Persistência dos chamados |

O backend aguarda o healthcheck do PostgreSQL. Ao iniciar, ele executa
`alembic upgrade head` antes do Uvicorn, garantindo que o schema esteja
atualizado. O frontend inicia depois que o serviço do backend é criado.

## Executar o ambiente

Na raiz do projeto:

```bash
docker compose up --build -d
docker compose ps
```

Serviços disponíveis:

- frontend: <http://localhost:5173>
- Swagger: <http://localhost:8000/docs>
- PostgreSQL: `localhost:5432`

Para acompanhar os logs ou encerrar o ambiente:

```bash
docker compose logs -f
docker compose down
```

## Variáveis de ambiente

O Compose aceita as variáveis `POSTGRES_DB`, `POSTGRES_USER`,
`POSTGRES_PASSWORD`, `FRONTEND_PORT` e `VITE_API_URL`. Quando elas não são
informadas, valores adequados ao desenvolvimento local são usados. O backend
monta sua `DATABASE_URL` usando o nome do serviço `database` como host.

O arquivo `.env.example` serve como modelo. Credenciais locais devem ficar em
`.env`, que não é versionado.

## Persistência e reinicialização

O volume nomeado `postgres_data` mantém os registros mesmo após
`docker compose down`. Para apagar o banco local e recriá-lo do zero:

```bash
docker compose down -v
docker compose up --build -d
```

O uso de `-v` remove os dados persistidos e deve ser intencional.
