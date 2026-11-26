from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.maintenance_request import MaintenanceRequest as MaintenanceRequestModel
from app.schemas.maintenance_request import (
    MaintenanceRequestCreate,
    MaintenanceRequestPatch,
    MaintenanceRequestUpdate,
)


class MaintenanceRequestRepository:
    def __init__(self, db: Session) -> None:
        self.db = db

    def list(self) -> list[MaintenanceRequestModel]:
        return list(
            self.db.scalars(
                select(MaintenanceRequestModel).order_by(MaintenanceRequestModel.id)
            )
        )

    def get(self, request_id: int) -> MaintenanceRequestModel | None:
        return self.db.get(MaintenanceRequestModel, request_id)

    def create(self, data: MaintenanceRequestCreate) -> MaintenanceRequestModel:
        request = MaintenanceRequestModel(**data.model_dump())
        self.db.add(request)
        self.db.commit()
        self.db.refresh(request)
        return request

    def replace(
        self,
        request_id: int,
        data: MaintenanceRequestUpdate,
    ) -> MaintenanceRequestModel | None:
        request = self.get(request_id)
        if request is None:
            return None
        for field, value in data.model_dump().items():
            setattr(request, field, value)
        self.db.commit()
        self.db.refresh(request)
        return request

    def update(
        self,
        request_id: int,
        data: MaintenanceRequestPatch,
    ) -> MaintenanceRequestModel | None:
        request = self.get(request_id)
        if request is None:
            return None
        for field, value in data.model_dump(exclude_unset=True).items():
            setattr(request, field, value)
        self.db.commit()
        self.db.refresh(request)
        return request

    def delete(self, request_id: int) -> bool:
        request = self.get(request_id)
        if request is None:
            return False
        self.db.delete(request)
        self.db.commit()
        return True
