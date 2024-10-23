from pathlib import Path
import joblib
import pandas as pd

# Construct the relative path to the model (relative to this script)
model_path = Path(__file__).parent / "../" / "ml_models" / "knn_model.pkl"

# Use `.resolve()` to get the absolute path when loading the model
knn_pipeline = joblib.load(model_path.resolve())

def knn_predict(data: pd.DataFrame):
    prediction = knn_pipeline.predict(data)
    return prediction

