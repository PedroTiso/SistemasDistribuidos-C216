from fastapi import APIRouter, Depends, HTTPException, Path, status
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.maintenance_request import (
    MaintenanceRequest,
    MaintenanceRequestCreate,
    MaintenanceRequestPatch,
    MaintenanceRequestUpdate,
)
from app.services.maintenance_request import MaintenanceRequestService

router = APIRouter(prefix="/maintenance-requests", tags=["Maintenance Requests"])


@router.get("", response_model=list[MaintenanceRequest])
def list_maintenance_requests(db: Session = Depends(get_db)) -> list[MaintenanceRequest]:
    return MaintenanceRequestService(db).list()


@router.get("/{request_id}", response_model=MaintenanceRequest)
def get_maintenance_request(
    request_id: int = Path(gt=0),
    db: Session = Depends(get_db),
) -> MaintenanceRequest:
    request = MaintenanceRequestService(db).get(request_id)
    if request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Maintenance request not found",
        )
    return request


@router.post("", response_model=MaintenanceRequest, status_code=status.HTTP_201_CREATED)
def create_maintenance_request(
    data: MaintenanceRequestCreate,
    db: Session = Depends(get_db),
) -> MaintenanceRequest:
    return MaintenanceRequestService(db).create(data)


@router.put("/{request_id}", response_model=MaintenanceRequest)
def replace_maintenance_request(
    data: MaintenanceRequestUpdate,
    request_id: int = Path(gt=0),
    db: Session = Depends(get_db),
) -> MaintenanceRequest:
    request = MaintenanceRequestService(db).replace(request_id, data)
    if request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Maintenance request not found",
        )
    return request


@router.patch("/{request_id}", response_model=MaintenanceRequest)
def update_maintenance_request(
    data: MaintenanceRequestPatch,
    request_id: int = Path(gt=0),
    db: Session = Depends(get_db),
) -> MaintenanceRequest:
    request = MaintenanceRequestService(db).update(request_id, data)
    if request is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Maintenance request not found",
        )
    return request


@router.delete("/{request_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_maintenance_request(
    request_id: int = Path(gt=0),
    db: Session = Depends(get_db),
) -> None:
    if not MaintenanceRequestService(db).delete(request_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Maintenance request not found",
        )
