from fastapi import FastAPI
from app.core.settings import settings
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Mathery API"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Hello Mathery!"}
