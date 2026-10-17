from fastapi import APIRouter, Depends, HTTPException, Path, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.item import Item, ItemCreate, ItemPatch, ItemUpdate
from app.services.item import ItemService

router = APIRouter(prefix="/items", tags=["Items"])


@router.get("", response_model=list[Item])
def list_items(db: Session = Depends(get_db)) -> list[Item]:
    return ItemService(db).list()


@router.get("/{item_id}", response_model=Item)
def get_item(item_id: int = Path(gt=0), db: Session = Depends(get_db)) -> Item:
    item = ItemService(db).get(item_id)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item


@router.post("", response_model=Item, status_code=status.HTTP_201_CREATED)
def create_item(data: ItemCreate, db: Session = Depends(get_db)) -> Item:
    return ItemService(db).create(data)


@router.put("/{item_id}", response_model=Item)
def replace_item(
    data: ItemUpdate,
    item_id: int = Path(gt=0),
    db: Session = Depends(get_db),
) -> Item:
    item = ItemService(db).replace(item_id, data)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item


@router.patch("/{item_id}", response_model=Item)
def update_item(
    data: ItemPatch,
    item_id: int = Path(gt=0),
    db: Session = Depends(get_db),
) -> Item:
    item = ItemService(db).update(item_id, data)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int = Path(gt=0), db: Session = Depends(get_db)) -> None:
    if not ItemService(db).delete(item_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
