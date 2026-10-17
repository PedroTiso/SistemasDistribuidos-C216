from sqlalchemy.orm import Session

from app.repositories.item import ItemRepository
from app.schemas.item import Item, ItemCreate, ItemPatch, ItemUpdate


class ItemService:
    def __init__(self, db: Session) -> None:
        self.repository = ItemRepository(db)

    def list(self) -> list[Item]:
        return self.repository.list()

    def get(self, item_id: int) -> Item | None:
        return self.repository.get(item_id)

    def create(self, data: ItemCreate) -> Item:
        return self.repository.create(data)

    def replace(self, item_id: int, data: ItemUpdate) -> Item | None:
        return self.repository.replace(item_id, data)

    def update(self, item_id: int, data: ItemPatch) -> Item | None:
        return self.repository.update(item_id, data)

    def delete(self, item_id: int) -> bool:
        return self.repository.delete(item_id)
