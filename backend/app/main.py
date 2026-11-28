from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.maintenance_requests import router as maintenance_requests_router

app = FastAPI(title="LabFix API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE"],
    allow_headers=["Content-Type"],
)

app.include_router(maintenance_requests_router)
