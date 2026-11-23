import pytest

from maintenance import can_transition_status, validate_priority, validate_title


@pytest.fixture
def chamado_valido():
    """Fornece dados reutilizados nos testes das regras do chamado."""
    return {
        "title": "Projetor da sala 204 com falha",
        "priority": "high",
        "status": "open",
    }


def test_chamado_valido(chamado_valido):
    assert validate_title(chamado_valido["title"]) == chamado_valido["title"]
    assert validate_priority(chamado_valido["priority"]) == "high"


@pytest.mark.parametrize("title", ["", "ab", "x" * 101])
def test_titulo_invalido(title):
    with pytest.raises(ValueError):
        validate_title(title)


def test_titulo_remove_espacos_externos():
    assert validate_title("  Tomada danificada  ") == "Tomada danificada"


def test_prioridade_invalida():
    with pytest.raises(ValueError):
        validate_priority("urgent")


@pytest.mark.parametrize(
    "status_atual, novo_status",
    [("open", "in_progress"), ("in_progress", "resolved"), ("open", "cancelled")],
)
def test_transicao_de_status_valida(status_atual, novo_status):
    assert can_transition_status(status_atual, novo_status)


@pytest.mark.parametrize(
    "status_atual, novo_status",
    [("open", "resolved"), ("resolved", "open"), ("cancelled", "in_progress")],
)
def test_transicao_de_status_invalida(status_atual, novo_status):
    assert not can_transition_status(status_atual, novo_status)
