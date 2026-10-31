from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.item import Item as ItemModel
from app.schemas.item import ItemCreate, ItemPatch, ItemUpdate


class ItemRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list(self) -> list[ItemModel]:
        return list(self.db.scalars(select(ItemModel).order_by(ItemModel.id)))

    def get(self, item_id: int) -> ItemModel | None:
        return self.db.get(ItemModel, item_id)

    def create(self, data: ItemCreate) -> ItemModel:
        item = ItemModel(**data.model_dump())
        self.db.add(item)
        self.db.commit()
        self.db.refresh(item)
        return item

    def replace(self, item_id: int, data: ItemUpdate) -> ItemModel | None:
        item = self.get(item_id)
        if item is None:
            return None
        for field, value in data.model_dump().items():
            setattr(item, field, value)
        self.db.commit()
        self.db.refresh(item)
        return item

    def update(self, item_id: int, data: ItemPatch) -> ItemModel | None:
        item = self.get(item_id)
        if item is None:
            return None
        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(item, field, value)
        self.db.commit()
        self.db.refresh(item)
        return item

    def delete(self, item_id: int) -> bool:
        item = self.get(item_id)
        if item is None:
            return False
        self.db.delete(item)
        self.db.commit()
        return True
