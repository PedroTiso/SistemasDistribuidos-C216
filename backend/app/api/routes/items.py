from fastapi import APIRouter, HTTPException, Path, status

from app.schemas.item import Item, ItemCreate, ItemPatch, ItemUpdate
from app.services.item import ItemService

router = APIRouter(prefix="/items", tags=["Items"])
service = ItemService()


@router.get("", response_model=list[Item])
def list_items() -> list[Item]:
    return service.list()


@router.get("/{item_id}", response_model=Item)
def get_item(item_id: int = Path(gt=0)) -> Item:
    item = service.get(item_id)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item


@router.post("", response_model=Item, status_code=status.HTTP_201_CREATED)
def create_item(data: ItemCreate) -> Item:
    return service.create(data)


@router.put("/{item_id}", response_model=Item)
def replace_item(data: ItemUpdate, item_id: int = Path(gt=0)) -> Item:
    item = service.replace(item_id, data)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item


@router.patch("/{item_id}", response_model=Item)
def update_item(data: ItemPatch, item_id: int = Path(gt=0)) -> Item:
    item = service.update(item_id, data)
    if item is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
    return item


@router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_item(item_id: int = Path(gt=0)) -> None:
    if not service.delete(item_id):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Item not found")
