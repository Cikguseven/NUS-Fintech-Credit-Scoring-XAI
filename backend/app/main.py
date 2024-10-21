from fastapi import FastAPI
from app.routes import prediction

app = FastAPI()


@app.get("/")
def read_root():
    return {"Status": "Your are connected!"}


app.include_router(prediction.router)