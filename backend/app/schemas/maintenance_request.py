from typing import Literal

from pydantic import BaseModel, ConfigDict, Field

Priority = Literal["low", "medium", "high"]
Status = Literal["open", "in_progress", "resolved", "cancelled"]


class MaintenanceRequestCreate(BaseModel):
    title: str = Field(min_length=3, max_length=100)
    description: str = Field(min_length=10, max_length=1000)
    location: str = Field(min_length=2, max_length=100)
    priority: Priority


class MaintenanceRequestUpdate(BaseModel):
    title: str = Field(min_length=3, max_length=100)
    description: str = Field(min_length=10, max_length=1000)
    location: str = Field(min_length=2, max_length=100)
    priority: Priority
    status: Status


class MaintenanceRequestPatch(BaseModel):
    title: str | None = Field(default=None, min_length=3, max_length=100)
    description: str | None = Field(default=None, min_length=10, max_length=1000)
    location: str | None = Field(default=None, min_length=2, max_length=100)
    priority: Priority | None = None
    status: Status | None = None


class MaintenanceRequest(MaintenanceRequestCreate):
    model_config = ConfigDict(from_attributes=True)

    id: int
    status: Status = "open"
