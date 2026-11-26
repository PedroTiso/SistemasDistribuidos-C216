from sqlalchemy.orm import Session

from app.repositories.maintenance_request import MaintenanceRequestRepository
from app.schemas.maintenance_request import (
    MaintenanceRequest,
    MaintenanceRequestCreate,
    MaintenanceRequestPatch,
    MaintenanceRequestUpdate,
)


class MaintenanceRequestService:
    def __init__(self, db: Session) -> None:
        self.repository = MaintenanceRequestRepository(db)

    def list(self) -> list[MaintenanceRequest]:
        return self.repository.list()

    def get(self, request_id: int) -> MaintenanceRequest | None:
        return self.repository.get(request_id)

    def create(self, data: MaintenanceRequestCreate) -> MaintenanceRequest:
        return self.repository.create(data)

    def replace(
        self,
        request_id: int,
        data: MaintenanceRequestUpdate,
    ) -> MaintenanceRequest | None:
        return self.repository.replace(request_id, data)

    def update(
        self,
        request_id: int,
        data: MaintenanceRequestPatch,
    ) -> MaintenanceRequest | None:
        return self.repository.update(request_id, data)

    def delete(self, request_id: int) -> bool:
        return self.repository.delete(request_id)
