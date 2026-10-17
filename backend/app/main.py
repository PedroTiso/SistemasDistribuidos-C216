from fastapi import FastAPI

from app.api.routes.items import router as items_router

app = FastAPI(title="C216 Items API")
app.include_router(items_router)
