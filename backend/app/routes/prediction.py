from fastapi import APIRouter
from app.models import PredictionRequest

router = APIRouter()

@router.post("/predict/knn")
async def predict(data: PredictionRequest):
    return {
        "message": "Test Prediction"
    }