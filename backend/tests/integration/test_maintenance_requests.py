import pytest
from fastapi.testclient import TestClient
from sqlalchemy import delete

from app.database.session import SessionLocal
from app.main import app
from app.models.maintenance_request import MaintenanceRequest


@pytest.fixture(autouse=True)
def reset_maintenance_requests():
    with SessionLocal() as db:
        db.execute(delete(MaintenanceRequest))
        db.commit()


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


def test_get_maintenance_request_by_id(client):
    created = client.post(
        "/maintenance-requests",
        json={
            "title": "Tomada danificada",
            "description": "A tomada não fornece energia para o equipamento.",
            "location": "Laboratório 1",
            "priority": "medium",
        },
    ).json()

    response = client.get(f"/maintenance-requests/{created['id']}")

    assert response.status_code == 200
    assert response.json() == created


def test_replace_maintenance_request(client):
    created = client.post(
        "/maintenance-requests",
        json={
            "title": "Projetor sem sinal",
            "description": "O projetor nao recebe sinal do computador da sala.",
            "location": "Sala 101",
            "priority": "medium",
        },
    ).json()

    response = client.put(
        f"/maintenance-requests/{created['id']}",
        json={
            "title": "Projetor com cabo substituido",
            "description": "O cabo HDMI foi substituido e o equipamento voltou a funcionar.",
            "location": "Sala 101",
            "priority": "low",
            "status": "resolved",
        },
    )

    assert response.status_code == 200
    assert response.json() == {
        "id": created["id"],
        "title": "Projetor com cabo substituido",
        "description": "O cabo HDMI foi substituido e o equipamento voltou a funcionar.",
        "location": "Sala 101",
        "priority": "low",
        "status": "resolved",
    }


def test_update_maintenance_request_partially(client):
    created = client.post(
        "/maintenance-requests",
        json={
            "title": "Ar-condicionado com ruido",
            "description": "O aparelho emite um ruido forte durante o funcionamento.",
            "location": "Laboratorio 2",
            "priority": "medium",
        },
    ).json()

    response = client.patch(
        f"/maintenance-requests/{created['id']}",
        json={"status": "in_progress"},
    )

    assert response.status_code == 200
    assert response.json() == {**created, "status": "in_progress"}


def test_delete_maintenance_request(client):
    created = client.post(
        "/maintenance-requests",
        json={
            "title": "Luminaria queimada",
            "description": "A luminaria nao acende e deixa a sala com pouca visibilidade.",
            "location": "Sala 305",
            "priority": "low",
        },
    ).json()

    response = client.delete(f"/maintenance-requests/{created['id']}")

    assert response.status_code == 204
    assert client.get(f"/maintenance-requests/{created['id']}").status_code == 404


def test_get_maintenance_request_returns_404_when_it_does_not_exist(client):
    response = client.get("/maintenance-requests/999")

    assert response.status_code == 404
    assert response.json() == {"detail": "Maintenance request not found"}


def test_maintenance_request_id_must_be_positive(client):
    response = client.get("/maintenance-requests/0")

    assert response.status_code == 422


def test_maintenance_request_persists_after_client_restart(client):
    created = client.post(
        "/maintenance-requests",
        json={
            "title": "Quadro branco danificado",
            "description": "O quadro possui uma rachadura e precisa de manutencao.",
            "location": "Sala 202",
            "priority": "high",
        },
    ).json()

    with TestClient(app) as restarted_client:
        response = restarted_client.get(f"/maintenance-requests/{created['id']}")

    assert response.status_code == 200
    assert response.json() == created
