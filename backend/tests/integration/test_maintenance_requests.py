import pytest
from fastapi.testclient import TestClient

from app.api.routes.maintenance_requests import service
from app.main import app


@pytest.fixture(autouse=True)
def reset_requests():
    service.clear()


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client


def test_list_maintenance_requests_returns_empty_list(client):
    response = client.get("/maintenance-requests")

    assert response.status_code == 200
    assert response.json() == []


def test_create_maintenance_request(client):
    response = client.post(
        "/maintenance-requests",
        json={
            "title": "Projetor da sala 204 com falha",
            "description": "O projetor não exibe imagem durante as aulas.",
            "location": "Sala 204",
            "priority": "high",
        },
    )

    assert response.status_code == 201
    assert response.json() == {
        "id": 1,
        "title": "Projetor da sala 204 com falha",
        "description": "O projetor não exibe imagem durante as aulas.",
        "location": "Sala 204",
        "priority": "high",
        "status": "open",
    }


def test_create_maintenance_request_rejects_invalid_payload(client):
    response = client.post(
        "/maintenance-requests",
        json={
            "title": "ab",
            "description": "curta",
            "location": "A",
            "priority": "urgent",
        },
    )

    assert response.status_code == 422


def test_created_maintenance_request_appears_in_list(client):
    created = client.post(
        "/maintenance-requests",
        json={
            "title": "Tomada danificada",
            "description": "A tomada não fornece energia para o equipamento.",
            "location": "Laboratório 1",
            "priority": "medium",
        },
    ).json()

    response = client.get("/maintenance-requests")

    assert response.status_code == 200
    assert response.json() == [created]
