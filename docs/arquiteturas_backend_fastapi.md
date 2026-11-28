# Arquitetura do backend com FastAPI

O backend do LabFix foi desenvolvido em Python com FastAPI e separado em
camadas. Essa organização reduz o acoplamento entre a interface HTTP, as regras
da aplicação e o acesso ao PostgreSQL.

## Estrutura

```text
backend/app/
├── api/routes/       # Endpoints HTTP
├── core/             # Configurações da aplicação
├── database/         # Engine, sessão e base declarativa
├── models/           # Mapeamento ORM das tabelas
├── repositories/     # Operações de persistência
├── schemas/          # Contratos e validações com Pydantic
├── services/         # Regras e casos de uso
└── main.py            # Criação e configuração da API
```

## Responsabilidade das camadas

- **Routes:** recebem as requisições, injetam a sessão do banco, chamam o
  serviço correspondente e convertem resultados ausentes em respostas `404`.
- **Schemas:** definem os formatos de entrada e saída e validam tamanho dos
  textos, prioridade e status.
- **Services:** coordenam os casos de uso de listagem, consulta, criação,
  substituição, atualização parcial e remoção.
- **Repositories:** concentram as consultas e alterações realizadas por meio do
  SQLAlchemy.
- **Models:** representam as tabelas do banco como classes Python.
- **Database:** cria a conexão e fornece uma sessão por requisição.

## Fluxo de uma requisição

```text
Cliente -> Route -> Schema/Pydantic -> Service -> Repository -> SQLAlchemy
                                                               |
Cliente <- resposta JSON <-------------------------------- PostgreSQL
```

## Endpoints

| Método | Rota | Resultado esperado |
| --- | --- | --- |
| `GET` | `/maintenance-requests` | Lista todos os chamados |
| `POST` | `/maintenance-requests` | Cria um chamado e retorna `201` |
| `GET` | `/maintenance-requests/{request_id}` | Consulta um chamado |
| `PUT` | `/maintenance-requests/{request_id}` | Substitui todos os dados editáveis |
| `PATCH` | `/maintenance-requests/{request_id}` | Atualiza somente os campos enviados |
| `DELETE` | `/maintenance-requests/{request_id}` | Exclui e retorna `204` |

Identificadores devem ser inteiros maiores que zero. Consultas, edições ou
exclusões de registros inexistentes retornam `404`.

## Inicialização e CORS

O arquivo `app/main.py` cria a aplicação, registra as rotas e habilita CORS
para o frontend local em `localhost:5173` ou `127.0.0.1:5173`. A documentação
OpenAPI é gerada pelo FastAPI e pode ser acessada em `/docs` enquanto a API
estiver em execução.
