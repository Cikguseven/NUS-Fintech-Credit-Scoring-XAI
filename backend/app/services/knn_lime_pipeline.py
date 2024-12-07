from pathlib import Path
import dill
import pandas as pd
import joblib
import re
import app.services.output_formatter

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
    colnames = data.columns.to_numpy()
    instance = prepare_data_from_df(data)

    def predict_fn(data):
        data_df = pd.DataFrame(data, columns=colnames)
        data_df = data_df.apply(lambda col: label_encoders[col.name].inverse_transform(col.apply(int)) if col.name in label_encoders else col)
        return pipeline.predict_proba(data_df)

    lime_explanation = lime_explainer.explain_instance(
        instance.to_numpy(),
        predict_fn=predict_fn,
        num_features=5
    )

    # Get probability scores
    probs = lime_explanation.predict_proba.tolist()
    credit_worthy_prob = round(probs[1] * 100, 1)

    html_content = f"""
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            :root {{
                --positive-color: #10b981;
                --negative-color: #ef4444;
                --neutral-color: #6b7280;
            }}
            body {{
                font-family: -apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu;
                line-height: 1.5;
                margin: 0;
                padding: 2rem;
                background-color: #f9fafb;
                color: #1f2937;
            }}
            .container {{
                max-width: 800px;
                margin: 0 auto;
            }}
            .card {{
                background-color: white;
                border-radius: 0.75rem;
                box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
                padding: 1.5rem;
                margin-bottom: 1.5rem;
            }}
            .prediction-header {{
                text-align: center;
                margin-bottom: 2rem;
            }}
            .probability-display {{
                font-size: 2.25rem;
                font-weight: 600;
                color: {'#10b981' if credit_worthy_prob >= 50 else '#ef4444'};
            }}
            .probability-bar {{
                width: 100%;
                height: 1rem;
                background-color: #e5e7eb;
                border-radius: 9999px;
                overflow: hidden;
                margin: 1rem 0;
            }}
            .probability-fill {{
                width: {credit_worthy_prob}%;
                height: 100%;
                background-color: {'#10b981' if credit_worthy_prob >= 50 else '#ef4444'};
                transition: width 1s ease-in-out;
            }}
            .feature-grid {{
                display: grid;
                gap: 1rem;
            }}
            .feature-item {{
                display: grid;
                grid-template-columns: 2fr 1fr;
                align-items: center;
                padding: 0.75rem;
                border-radius: 0.5rem;
                background-color: #f9fafb;
            }}
            .feature-name {{
                font-weight: 500;
            }}
            .feature-bar {{
                height: 0.5rem;
                background-color: #e5e7eb;
                border-radius: 9999px;
                overflow: hidden;
            }}
            .feature-value {{
                text-align: right;
                font-weight: 500;
            }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="card">
                <div class="prediction-header">
                    <h1>Credit Assessment Result</h1>
                    <div class="probability-display">{credit_worthy_prob}%</div>
                    <p>Probability of Credit-Worthiness</p>
                    <div class="probability-bar">
                        <div class="probability-fill"></div>
                    </div>
                </div>
            </div>
            <div class="card">
                <h2>Key Factors Influencing Decision</h2>
                <div class="feature-grid">
    """

    # Add feature importance details
    feature_weights = lime_explanation.as_list()
    for feature, weight in feature_weights:
        clean_feature = re.sub(r'[=<>].*', '', feature)
        normalized_weight = min(abs(weight) * 100, 100)
        color = '#10b981' if weight > 0 else '#ef4444'

        html_content += f"""
                    <div class="feature-item">
                        <div class="feature-name">{clean_feature}</div>
                        <div class="feature-value" style="color: {color}">{normalized_weight:+.3f}</div>
                    </div>
        """

    html_content += """
                </div>
            </div>
        </div>
    </body>
    </html>
    """

    return {
        "explanation_html": html_content,
        "prediction": probs
    }