from fastapi import FastAPI

from app.api.routes.maintenance_requests import router as maintenance_requests_router

app = FastAPI(title="LabFix API")
app.include_router(maintenance_requests_router)
