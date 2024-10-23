from pathlib import Path
import dill
import pandas as pd
import joblib

# Construct the relative path to the LIME explainer file (relative to this script)
lime_explainer_path = Path(__file__).parent / "../" / "ml_models" / "lime_explainer.dill"
lime_label_encoder_path = Path(__file__).parent / "../" / "ml_models" / "label_encoders_lime.joblib"

# Use `.resolve()` to get the absolute path and load the LIME explainer
with open(lime_explainer_path.resolve(), 'rb') as file:
    lime_explainer = dill.load(file)

label_encoders = joblib.load(lime_label_encoder_path)

def prepare_data_from_df(data: pd.DataFrame):
    def transform_categorical_col(col):
        if col.dtype == 'object' and col.name in label_encoders:
            # Use the same encoder used during training
            label_encoder = label_encoders[col.name]
            return label_encoder.transform(col)
        else:
            return col
    
    print(data.head())

    data_transformed = data.apply(transform_categorical_col)
    instance = data_transformed.iloc[0]
    return instance

# Function to use the LIME explainer for explanation
def explain_prediction(data: pd.DataFrame, pipeline):

    colnames = data.columns
    instance = prepare_data_from_df(data)
    print(instance.shape)

    def predict_fn(data):
        data_df = pd.DataFrame(data, columns=colnames)
        data_df = data_df.apply(lambda col: label_encoders[col.name].inverse_transform(col.apply(int)) if col.name in label_encoders else col)
        return pipeline.predict_proba(data_df)
    
    # lime_explanation = lime_explainer.explain_instance(
    #     instance,
    #     predict_fn=predict_fn,
    #     num_features=20  # Limit to top 20 features
    # )
    # print(lime_explanation.as_list())
    return None