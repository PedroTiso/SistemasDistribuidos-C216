.PHONY: help install test lint format run clean

PYTHON := poetry run python
PYTEST := poetry run pytest
UVICORN := poetry run uvicorn
RUFF := poetry run ruff

help:
	@echo "Comandos disponíveis:"
	@echo "  make install  - instala dependências"
	@echo "  make test     - executa testes"
	@echo "  make lint     - verifica o código"
	@echo "  make format   - formata o código"
	@echo "  make run      - inicia o servidor"
	@echo "  make clean    - remove arquivos temporários"

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