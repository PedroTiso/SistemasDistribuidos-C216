# Integração full stack

O LabFix integra uma SPA React, uma API REST em FastAPI e um banco PostgreSQL.
Cada camada possui responsabilidades próprias e se comunica por contratos
definidos.

## Fluxo completo

```text
1. Usuário preenche ou aciona a interface
2. React valida os dados no navegador
3. O serviço do frontend envia HTTP com JSON
4. FastAPI valida o corpo com Pydantic
5. A camada de serviço executa o caso de uso
6. O repository acessa o PostgreSQL com SQLAlchemy
7. A API devolve status HTTP e JSON
8. React atualiza a tela ou apresenta um erro
```

## Operações da aplicação

| Ação do usuário | Requisição | Efeito |
| --- | --- | --- |
| Abrir a área de chamados | `GET /maintenance-requests` | Carrega a lista persistida |
| Cadastrar chamado | `POST /maintenance-requests` | Cria um registro com status `open` |
| Editar chamado | `PATCH /maintenance-requests/{id}` | Altera somente os campos enviados |
| Excluir chamado | `DELETE /maintenance-requests/{id}` | Remove o registro |

A API também fornece consulta individual por `GET` e substituição completa por
`PUT`, mesmo que essas operações não sejam o caminho principal da interface.

## Contrato e tratamento de erros

O frontend envia e recebe JSON. Dados inválidos são rejeitados pela API com
erro de validação, e registros inexistentes produzem `404`. O módulo de serviço
do frontend verifica se a resposta foi bem-sucedida e transforma falhas em
mensagens tratáveis pelos componentes.

## Execução integrada

O modo mais simples de testar a integração é subir os três serviços:

```bash
docker compose up --build -d
```

O navegador acessa o Vite na porta `5173`; o JavaScript usa a API publicada na
porta `8000`; dentro da rede do Compose, o backend encontra o PostgreSQL pelo
hostname `database`.

O CORS da API autoriza o frontend local. Se o frontend for publicado em outro
domínio, a origem permitida e `VITE_API_URL` deverão ser ajustadas.
