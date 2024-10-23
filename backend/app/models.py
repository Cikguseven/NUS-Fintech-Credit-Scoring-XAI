from pydantic import BaseModel, Field
import pandas as pd

class PredictionRequest(BaseModel):
    # Categorical fields
    existing_checking_account_balance: str = Field(..., example="less_than_0_dm")
    credit_history: str = Field(..., example="all_credits_paid_back_this_bank")
    credit_purpose: str = Field(..., example="car_new")
    savings_account_balance: str = Field(..., example="less_than_100_dm")
    employment_status: str = Field(..., example="greater_than_7_years")
    status_and_sex: str = Field(..., example="male_single")
    other_debtors_guarantors: str = Field(..., example="no_other_debtors")
    property_owned: str = Field(..., example="real_estate")
    other_installment_plans: str = Field(..., example="no_other_installment_plans")
    housing: str = Field(..., example="own")
    job: str = Field(..., example="skilled_employee_or_official")
    has_telephone: str = Field(..., example="yes_telephone_registered")
    is_foreign_worker: str = Field(..., example="yes_foreign_worker")

    # Quantitative fields
    duration_of_credit: int = Field(..., example=24)  # Duration in months
    credit_amount: int = Field(..., example=5000)  # Amount in DM
    installment_rate: int = Field(..., example=4)  # Installment rate in percentage
    present_residence_since: int = Field(..., example=3)  # Years at current residence
    age: int = Field(..., example=35)  # Age in years
    number_of_existing_credits: int = Field(..., example=2)  # Number of existing credits
    pax_to_provide_for: int = Field(..., example=1)  # Number of people to provide for

    def convert_to_pandas_df(self):
        data = {
            'existing_checking_account_balance': self.existing_checking_account_balance,
            'duration_of_credit': self.duration_of_credit,
            'credit_history': self.credit_history,
            'credit_purpose': self.credit_purpose,
            'credit_amount': self.credit_amount,
            'savings_account_balance': self.savings_account_balance,
            'employment_status': self.employment_status,
            'installment_rate': self.installment_rate,
            'status_and_sex': self.status_and_sex,
            'other_debtors_guarantors': self.other_debtors_guarantors,
            'present_residence_since': self.present_residence_since,
            'property_owned': self.property_owned,
            'age': self.age,
            'other_installment_plans': self.other_installment_plans,
            'housing': self.housing,
            'number_of_existing_credits': self.number_of_existing_credits,
            'job': self.job,
            'pax_to_provide_for': self.pax_to_provide_for,
            'has_telephone': self.has_telephone,
            'is_foreign_worker': self.is_foreign_worker
        }
        return pd.DataFrame([data])


    class Config:
        schema_extra = {
            "example": {
                "existing_checking_account_balance": "less_than_0_dm",
                "credit_history": "all_credits_paid_back_this_bank",
                "credit_purpose": "car_new",
                "savings_account_balance": "less_than_100_dm",
                "employment_status": "greater_than_7_years",
                "status_and_sex": "male_single",
                "other_debtors_guarantors": "no_other_debtors",
                "property_owned": "real_estate",
                "other_installment_plans": "no_other_installment_plans",
                "housing": "own",
                "job": "skilled_employee_or_official",
                "has_telephone": "yes_telephone_registered",
                "is_foreign_worker": "yes_foreign_worker",
                "duration_of_credit": 24,
                "credit_amount": 5000,
                "installment_rate": 4,
                "present_residence_since": 3,
                "age": 35,
                "number_of_existing_credits": 2,
                "pax_to_provide_for": 1
            }
        }