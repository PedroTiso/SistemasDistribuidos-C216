from fastapi import APIRouter, status

from app.schemas.maintenance_request import MaintenanceRequest, MaintenanceRequestCreate
from app.services.maintenance_request import MaintenanceRequestService

router = APIRouter(prefix="/maintenance-requests", tags=["Maintenance Requests"])
service = MaintenanceRequestService()


@router.get("", response_model=list[MaintenanceRequest])
def list_maintenance_requests() -> list[MaintenanceRequest]:
    return service.list()


@router.post("", response_model=MaintenanceRequest, status_code=status.HTTP_201_CREATED)
def create_maintenance_request(data: MaintenanceRequestCreate) -> MaintenanceRequest:
    return service.create(data)
