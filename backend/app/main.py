from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.items import router as items_router

app = FastAPI(title="C216 Items API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type"],
)

app.include_router(items_router)
