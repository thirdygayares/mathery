from fastapi import FastAPI

app = FastAPI(
    title="Mathery API"
)

@app.get("/")
def read_root():
    return {"message": "Hello Mathery!"}
