import pytest
from fastapi.testclient import TestClient
from sqlalchemy import delete

from app.database.session import SessionLocal
from app.main import app
from app.models.item import Item


@pytest.fixture(autouse=True)
def reset_items():
    with SessionLocal() as db:
        db.execute(delete(Item))
        db.commit()


@pytest.fixture
def client():
    with TestClient(app) as test_client:
        yield test_client


def test_list_items_returns_empty_list(client):
    response = client.get("/items")

    assert response.status_code == 200
    assert response.json() == []


def test_create_item(client):
    response = client.post(
        "/items",
        json={"name": "Caderno", "description": "Material da disciplina"},
    )

    assert response.status_code == 201
    assert response.json() == {
        "id": 1,
        "name": "Caderno",
        "description": "Material da disciplina",
    }


def test_get_item_by_id(client):
    created = client.post("/items", json={"name": "Caderno"}).json()

    response = client.get(f"/items/{created['id']}")

    assert response.status_code == 200
    assert response.json() == created


def test_replace_item(client):
    created = client.post("/items", json={"name": "Caderno"}).json()

    response = client.put(
        f"/items/{created['id']}",
        json={"name": "Livro", "description": "FastAPI"},
    )

    assert response.status_code == 200
    assert response.json() == {
        "id": created["id"],
        "name": "Livro",
        "description": "FastAPI",
    }


def test_update_item_partially(client):
    created = client.post(
        "/items", json={"name": "Caderno", "description": "Antiga"}
    ).json()

    response = client.patch(f"/items/{created['id']}", json={"description": "Nova"})

    assert response.status_code == 200
    assert response.json() == {
        "id": created["id"],
        "name": "Caderno",
        "description": "Nova",
    }


def test_delete_item(client):
    created = client.post("/items", json={"name": "Caderno"}).json()

    response = client.delete(f"/items/{created['id']}")

    assert response.status_code == 204
    assert client.get(f"/items/{created['id']}").status_code == 404


def test_get_item_returns_404_when_it_does_not_exist(client):
    response = client.get("/items/999")

    assert response.status_code == 404
    assert response.json() == {"detail": "Item not found"}


def test_item_id_must_be_positive(client):
    response = client.get("/items/0")

    assert response.status_code == 422


def test_item_persists_after_client_restart(client):
    created = client.post("/items", json={"name": "Persistente"}).json()

    with TestClient(app) as restarted_client:
        response = restarted_client.get(f"/items/{created['id']}")

    assert response.status_code == 200
    assert response.json() == created
