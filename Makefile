.PHONY: help install test lint format run clean docker-build docker-up docker-down docker-logs docker-ps db-up db-shell

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
	cd backend && poetry install

test:
	cd backend && $(PYTEST)

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
