import { CheckingAccountBalanceLabels, CreditHistoryLabels, CreditPurposeLabels, EmploymentStatusLabels, ForeignWorkerLabels, HousingLabels, JobLabels, OtherDebtorsGuarantorsLabels, OtherInstallmentPlansLabels, PropertyOwnedLabels, SavingsAccountBalanceLabels, StatusAndSexLabels, TelephoneLabels } from "./categorial_enums";

export type FormFieldDetails = {
    placeholder: string;
    header: string;
    fieldName: string;
}

export type CategoricalFormFieldDetails = FormFieldDetails & {
    categories: Set<string>;
    enum: any;
}


export const categoricalFormFields: CategoricalFormFieldDetails[] = [
    {
        placeholder: 'Select checking account balance',
        header: 'Checking Account Balance',
        fieldName: 'existing_checking_account_balance',
        categories: new Set(['less_than_0_dm', 'between_0_and_200_dm', 'greater_than_200_dm', 'no_checking_account']),
        enum: CheckingAccountBalanceLabels,
    },
    {
        placeholder: 'Select credit history',
        header: 'Credit History',
        fieldName: 'credit_history',
        categories: new Set([
            'no_credits_taken_all_paid_back', 'all_credits_paid_back_this_bank', 'existing_credits_paid_back',
            'delays_in_past_payments', 'critical_account_other_credits_existing'
        ]),
        enum: CreditHistoryLabels
    },
    {
        placeholder: 'Select credit purpose',
        header: 'Credit Purpose',
        fieldName: 'credit_purpose',
        categories: new Set([
            'car_new', 'car_used', 'furniture_equipment', 'radio_television', 'domestic_appliances', 'repairs',
            'education', 'vacation', 'retraining', 'business', 'others'
        ]),
        enum: CreditPurposeLabels,
    },
    {
        placeholder: 'Select savings account balance',
        header: 'Savings Account Balance',
        fieldName: 'savings_account_balance',
        categories: new Set(['less_than_100_dm', 'between_100_and_500_dm', 'between_500_and_1000_dm', 'greater_than_1000_dm', 'unknown_or_no_savings']),
        enum: SavingsAccountBalanceLabels,
    },
    {
        placeholder: 'Select employment status',
        header: 'Employment Status',
        fieldName: 'employment_status',
        categories: new Set(['unemployed', 'less_than_1_year', 'between_1_and_4_years', 'between_4_and_7_years', 'greater_than_7_years']),
        enum: EmploymentStatusLabels,
    },
    {
        placeholder: 'Select personal status and sex',
        header: 'Personal Status and Sex',
        fieldName: 'status_and_sex',
        categories: new Set(['male_divorced_separated', 'female_divorced_separated_married', 'male_single', 'male_married_widowed', 'female_single']),
        enum: StatusAndSexLabels,
    },
    {
        placeholder: 'Select other debtors/guarantors',
        header: 'Other Debtors/Guarantors',
        fieldName: 'other_debtors_guarantors',
        categories: new Set(['no_other_debtors', 'co_applicant', 'guarantor']),
        enum: OtherDebtorsGuarantorsLabels,
    },
    {
        placeholder: 'Select property owned',
        header: 'Property Owned',
        fieldName: 'property_owned',
        categories: new Set(['real_estate', 'building_society_savings_or_life_insurance', 'car_or_other_property', 'unknown_or_no_property']),
        enum: PropertyOwnedLabels,
    },
    {
        placeholder: 'Select other installment plans',
        header: 'Other Installment Plans',
        fieldName: 'other_installment_plans',
        categories: new Set(['bank', 'stores', 'no_other_installment_plans']),
        enum: OtherInstallmentPlansLabels,
    },
    {
        placeholder: 'Select housing status',
        header: 'Housing',
        fieldName: 'housing',
        categories: new Set(['rent', 'own', 'for_free']),
        enum: HousingLabels,
    },
    {
        placeholder: 'Select job category',
        header: 'Job',
        fieldName: 'job',
        categories: new Set(['unemployed_unskilled_non_resident', 'unskilled_resident', 'skilled_employee_or_official', 'management_self_employed_highly_qualified']),
        enum: JobLabels,
    },
    {
        placeholder: 'Select whether the person has a telephone',
        header: 'Telephone',
        fieldName: 'has_telephone',
        categories: new Set(['no_telephone', 'yes_telephone_registered']),
        enum: TelephoneLabels,
    },
    {
        placeholder: 'Select whether the person is a foreign worker',
        header: 'Foreign Worker',
        fieldName: 'is_foreign_worker',
        categories: new Set(['yes_foreign_worker', 'no_foreign_worker']),
        enum: ForeignWorkerLabels
    }
];

export const quantitativeFormFields: FormFieldDetails[] = [
    {
        placeholder: 'Enter duration of credit (months)',
        header: 'Duration of Credit',
        fieldName: 'duration_of_credit'
    },
    {
        placeholder: 'Enter credit amount (DM)',
        header: 'Credit Amount',
        fieldName: 'credit_amount'
    },
    {
        placeholder: 'Enter installment rate (%)',
        header: 'Installment Rate',
        fieldName: 'installment_rate'
    },
    {
        placeholder: 'Enter years at present residence',
        header: 'Present Residence Since',
        fieldName: 'present_residence_since'
    },
    {
        placeholder: 'Enter age (years)',
        header: 'Age',
        fieldName: 'age'
    },
    {
        placeholder: 'Enter number of existing credits',
        header: 'Number of Existing Credits',
        fieldName: 'number_of_existing_credits'
    },
    {
        placeholder: 'Enter number of people to provide for',
        header: 'People to Provide For',
        fieldName: 'pax_to_provide_for'
    }
];