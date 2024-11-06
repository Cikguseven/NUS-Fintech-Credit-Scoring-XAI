def prediction_formatter(prediction: int):
    if prediction == 1:
        return "This person has a good credit score!"
    else:
        return "This person does not have a good credit score!"
    
def format_lime_explanation(explanation, top_n=10):
    print(explanation.available_labels())
    print("test log")
    return
    
    