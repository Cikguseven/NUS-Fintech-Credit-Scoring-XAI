from app.models import PredictionRequest
from app.services.knn_predict import knn_predict
from app.services.knn_predict import knn_pipeline
from app.services.knn_lime_pipeline import explain_prediction

def select_model_predict(model_name: str):
    if model_name == "knn":
        return knn_predict
    else:
        return None

def select_model_pipeline(model_name: str):
    if model_name == "knn":
        return knn_pipeline
    else:
        return None

def predict_for_model(model_name: str, data: PredictionRequest):
    model_selected = select_model_predict(model_name)
    if model_selected != None:
        prediction = model_selected(data.convert_to_pandas_df())
        return prediction[0]
    else:
        return None

def explain_for_model(model_name: str, data: PredictionRequest):
    model_selected = select_model_pipeline(model_name)
    return explain_prediction(data.convert_to_pandas_df(), model_selected)
