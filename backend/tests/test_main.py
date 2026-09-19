import pytest

from calculadora import divisao, multiplicacao, soma, subtracao


@pytest.fixture
def numeros():
    """Fornece valores reutilizados nos testes das operacoes."""
    return 10, 2


@pytest.mark.parametrize(
    "a, b, esperado",
    [
        (2, 3, 5),
        (-2, -3, -5),
        (-2, 3, 1),
        (0, 5, 5),
    ],
)
def test_soma(a, b, esperado):
    assert soma(a, b) == esperado


def test_subtracao(numeros):
    a, b = numeros
    assert subtracao(a, b) == 8


def test_multiplicacao(numeros):
    a, b = numeros
    assert multiplicacao(a, b) == 20


def test_divisao(numeros):
    a, b = numeros
    assert divisao(a, b) == 5


def test_divisao_com_resultado_decimal():
    assert divisao(5, 2) == 2.5


def test_divisao_por_zero():
    with pytest.raises(ValueError, match="Nao e permitido dividir por zero"):
        divisao(10, 0)
