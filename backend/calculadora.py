"""Operacoes simples para praticar testes unitarios."""


def soma(a, b):
    return a + b


def subtracao(a, b):
    return a - b


def multiplicacao(a, b):
    return a * b


def divisao(a, b):
    if b == 0:
        raise ValueError("Nao e permitido dividir por zero")
    return a / b
