.PHONY: help install test lint format run clean frontend-install frontend-format frontend-check frontend-test frontend-e2e frontend-build docker-build docker-up docker-down docker-logs docker-ps db-up db-shell db-upgrade db-current db-migration

PYTEST := poetry run pytest
RUFF := poetry run ruff
UVICORN := poetry run uvicorn
COMPOSE := docker compose

help:
	@echo "Available commands:"
	@echo "  make install          - install backend dependencies"
	@echo "  make test             - run backend tests"
	@echo "  make lint             - check backend code with Ruff"
	@echo "  make format           - format backend code"
	@echo "  make run              - start the backend server"
	@echo "  make frontend-install - install frontend dependencies"
	@echo "  make frontend-format  - check frontend formatting"
	@echo "  make frontend-check   - run Biome checks"
	@echo "  make frontend-test    - run Vitest tests"
	@echo "  make frontend-e2e     - run Playwright tests"
	@echo "  make frontend-build   - build the frontend"
	@echo "  make docker-up        - build and start all services"
	@echo "  make docker-down      - stop and remove containers"
	@echo "  make docker-logs      - follow service logs"
	@echo "  make docker-ps        - show container status"
	@echo "  make db-upgrade       - apply Alembic migrations"

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

frontend-install:
	cd frontend && npm ci

frontend-format:
	cd frontend && npm run format:check

frontend-check:
	cd frontend && npm run check

frontend-test:
	cd frontend && npm test

frontend-e2e:
	cd frontend && npm run test:e2e

frontend-build:
	cd frontend && npm run build

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
