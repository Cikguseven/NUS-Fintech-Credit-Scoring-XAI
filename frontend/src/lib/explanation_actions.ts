"use server"

import dotenv from 'dotenv'
import { CheckingAccountBalanceLabels, CreditHistoryLabels, CreditPurposeLabels, EmploymentStatusLabels, ForeignWorkerLabels, HousingLabels, JobLabels, OtherDebtorsGuarantorsLabels, OtherInstallmentPlansLabels, PropertyOwnedLabels, SavingsAccountBalanceLabels, StatusAndSexLabels, TelephoneLabels } from './categorial_enums'
dotenv.config()

export type ExplanationInputFields = {
    existing_checking_account_balance: CheckingAccountBalanceLabels;
    credit_history: CreditHistoryLabels
    credit_purpose: CreditPurposeLabels;
    savings_account_balance: SavingsAccountBalanceLabels;
    employment_status: EmploymentStatusLabels;
    status_and_sex: StatusAndSexLabels;
    other_debtors_guarantors: OtherDebtorsGuarantorsLabels;
    property_owned: PropertyOwnedLabels;
    other_installment_plans: OtherInstallmentPlansLabels;
    housing: HousingLabels;
    job: JobLabels;
    has_telephone: TelephoneLabels;
    is_foreign_worker: ForeignWorkerLabels;
    duration_of_credit: number;
    credit_amount: number;
    installment_rate: number;
    present_residence_since: number;
    age: number;
    number_of_existing_credits: number;
    pax_to_provide_for: number;
}

export type Explanation = { 
    explanation_html: string,
    prediction: number[] 
}

export async function fetchExplanationKnn(fields: ExplanationInputFields): Promise<Explanation> {
    try {
        const response = await fetch(
            process.env.BACKEND_URL + "explain/knn",
            {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                cache: 'no-cache',
                body: JSON.stringify(fields)
            }
        );
        
        if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();
        
        // Validate the structure of `data` to ensure it has the required fields
        if (!data.explanation_html || !Array.isArray(data.prediction)) {
            throw new Error("Invalid response structure");
        }

        return data;
    } catch (error) {
        console.error("Error fetching explanation:", error);
        throw error;
    }
}