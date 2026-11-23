from app.schemas.maintenance_request import MaintenanceRequest, MaintenanceRequestCreate
from maintenance import validate_priority, validate_title


class MaintenanceRequestService:
    def __init__(self) -> None:
        self._requests: list[MaintenanceRequest] = []
        self._next_id = 1

    def list(self) -> list[MaintenanceRequest]:
        return self._requests.copy()

    def create(self, data: MaintenanceRequestCreate) -> MaintenanceRequest:
        request = MaintenanceRequest(
            id=self._next_id,
            title=validate_title(data.title),
            description=data.description.strip(),
            location=data.location.strip(),
            priority=validate_priority(data.priority),
        )
        self._requests.append(request)
        self._next_id += 1
        return request

    def clear(self) -> None:
        self._requests.clear()
        self._next_id = 1
