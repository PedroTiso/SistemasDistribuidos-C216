from pydantic import BaseModel, Field


class ItemCreate(BaseModel):
    name: str = Field(min_length=1)
    description: str | None = None


class ItemUpdate(BaseModel):
    name: str = Field(min_length=1)
    description: str | None = None


class ItemPatch(BaseModel):
    name: str | None = Field(default=None, min_length=1)
    description: str | None = None


class Item(ItemCreate):
    id: int
