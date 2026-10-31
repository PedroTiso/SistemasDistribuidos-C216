.PHONY: help install test lint format run clean docker-build docker-up docker-down docker-logs docker-ps db-up db-shell db-upgrade db-current db-migration frontend-install frontend-dev frontend-lint frontend-format frontend-check frontend-test frontend-test-e2e frontend-build check-all

PYTHON := poetry run python
PYTEST := poetry run pytest
UVICORN := poetry run uvicorn
RUFF := poetry run ruff
COMPOSE := docker compose

help:
	@echo "Comandos disponíveis:"
	@echo "  make install  - instala dependências"
	@echo "  make test     - executa testes"
	@echo "  make lint     - verifica o código"
	@echo "  make format   - formata o código"
	@echo "  make run      - inicia o servidor"
	@echo "  make clean    - remove arquivos temporários"

	@echo "  make docker-build - constrói as imagens Docker"
	@echo "  make docker-up    - constrói e inicia os serviços"
	@echo "  make docker-down  - para e remove os containers"
	@echo "  make docker-logs  - acompanha os logs dos serviços"
	@echo "  make docker-ps    - mostra o estado dos containers"
	@echo "  make db-up        - inicia somente o PostgreSQL"
	@echo "  make db-shell     - abre o terminal do PostgreSQL"

install:
	cd backend && poetry install --with dev --no-root

test:
	cd backend && $(PYTEST) tests -v

lint:
	cd backend && $(RUFF) check .

format:
	cd backend && $(RUFF) format .

run:
	cd backend && $(UVICORN) app.main:app --reload

clean:
	cd backend && find . -type d -name "__pycache__" -exec rm -rf {} +
	cd backend && find . -type d -name ".pytest_cache" -exec rm -rf {} +

docker-build:
	$(COMPOSE) build

docker-up:
	$(COMPOSE) up --build -d

docker-down:
	$(COMPOSE) down

docker-logs:
	$(COMPOSE) logs -f

docker-ps:
	$(COMPOSE) ps

db-up:
	$(COMPOSE) up -d database

db-shell:
	$(COMPOSE) exec database sh -c 'psql -U "$$POSTGRES_USER" -d "$$POSTGRES_DB"'

db-upgrade:
	cd backend && poetry run alembic upgrade head

db-current:
	cd backend && poetry run alembic current

db-migration:
	cd backend && poetry run alembic revision --autogenerate -m "$(msg)"

frontend-install:
	cd frontend && npm ci

frontend-dev:
	cd frontend && npm run dev

frontend-lint:
	cd frontend && npm run check

frontend-format:
	cd frontend && npm run format

frontend-check:
	cd frontend && npm run format:check && npm run check

frontend-test:
	cd frontend && npm test

frontend-test-e2e:
	cd frontend && npm run test:e2e

frontend-build:
	cd frontend && npm run build

check-all: lint test frontend-check frontend-test frontend-build
