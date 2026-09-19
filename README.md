# SistemasDistribuidos-C216
Repositório para a disciplina de Sistemas Distribuídos - 2026.2

## Testes do backend

Pré-requisitos: Python 3.14 e Poetry 2.4.1 instalados. Para usar os
comandos do Makefile, também é necessário ter o Make instalado.

Na raiz do repositório, instale as dependências e execute os testes:

```bash
make install
make test
```

Como alternativa, sem Make (inclusive no Windows):

```bash
cd backend
poetry install --with dev --no-root
poetry run pytest tests -v
```

A opção `--no-root` instala as dependências sem tentar instalar o próprio
backend como um pacote Python. O grupo `dev` inclui o Pytest.

Os testes ficam em `backend/tests/test_main.py` e verificam as operações
da calculadora: soma, subtração, multiplicação e divisão. A suíte usa
`assert`, uma fixture com valores reutilizáveis, parametrização da soma
e um caso de erro para divisão por zero. Atualmente, são 9 casos de teste.

## Integração contínua com GitHub Actions

O workflow [CI Backend](.github/workflows/ci-backend.yml) é executado em
eventos de `push` em qualquer branch e de `pull_request` (abertura,
reabertura e novos commits), sem filtro de branch de destino.

Em um runner Ubuntu, ele baixa o repositório, configura Python 3.14,
instala Poetry 2.4.1, instala as dependências do `poetry.lock`, incluindo
o grupo `dev`, e executa `poetry run pytest tests -v` dentro de `backend`.
Se algum teste falhar, o job também falha.

Após enviar o arquivo do workflow ao GitHub, acompanhe as execuções na
aba **Actions**, selecionando **CI Backend**, ou na seção de verificações
do pull request. Se o GitHub Actions estiver desabilitado no repositório,
habilite-o em **Settings > Actions > General**. O workflow não exige secrets.
