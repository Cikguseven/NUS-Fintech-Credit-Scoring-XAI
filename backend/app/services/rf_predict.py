from pathlib import Path
import joblib
import pandas as pd

# Construct the relative path to the model (relative to this script)
model_path = Path(__file__).parent / "../" / "ml_models" / "rf_model.pkl"

# Use `.resolve()` to get the absolute path when loading the model
rf_pipeline = joblib.load(model_path.resolve())

def rf_predict(data: pd.DataFrame):
    prediction = rf_pipeline.predict(data)
    return prediction
