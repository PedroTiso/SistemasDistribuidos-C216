# Documentação do LabFix

Esta pasta reúne a documentação técnica complementar do LabFix. O
[`README.md`](../README.md) da raiz apresenta o projeto e os comandos mais
usados; os documentos abaixo detalham as decisões e práticas adotadas durante
o desenvolvimento.

## Conteúdo

| Documento | Assunto |
| --- | --- |
| [Arquitetura do backend](arquiteturas_backend_fastapi.md) | Organização em camadas da API FastAPI e fluxo das requisições |
| [Docker Compose](docker-compose.md) | Containers, rede, variáveis, persistência e inicialização do ambiente |
| [Frontend com React e Tailwind](frontend_js_react_tailwind.md) | Estrutura da interface, navegação, validação e comunicação com a API |
| [PostgreSQL, SQLAlchemy e migrations](postgresql-sqlalchemy-migrations.md) | Modelo de dados, conexão, persistência e versionamento do banco |
| [Integração full stack](integracao-fullstack.md) | Fluxo completo entre navegador, frontend, backend e banco |
| [Testes e GitHub Actions](testes-github-actions.md) | Estratégia de testes, qualidade de código e integração contínua |

## Visão geral

```text
Navegador
    |
    v
React + Vite (:5173)
    | HTTP/JSON
    v
FastAPI (:8000)
    | SQLAlchemy
    v
PostgreSQL (:5432)
```

No ambiente completo, o Docker Compose coordena os serviços `frontend`,
`backend` e `database`. A aplicação permite criar, consultar, editar e excluir
chamados de manutenção, mantendo os dados persistidos no PostgreSQL.
