// Enum for existing checking account balance
export enum CheckingAccountBalanceLabels {
    less_than_0_dm = "A11",
    between_0_and_200_dm = "A12",
    greater_than_200_dm = "A13",
    no_checking_account = "A14"
}

// Enum for credit history
export enum CreditHistoryLabels {
    no_credits_taken_all_paid_back = "A30",
    all_credits_paid_back_this_bank = "A31",
    existing_credits_paid_back = "A32",
    delays_in_past_payments = "A33",
    critical_account_other_credits_existing = "A34"
}

// Enum for credit purpose
export enum CreditPurposeLabels {
    car_new = "A40",
    car_used = "A41",
    furniture_equipment = "A42",
    radio_television = "A43",
    domestic_appliances = "A44",
    repairs = "A45",
    education = "A46",
    vacation = "A47",
    retraining = "A48",
    business = "A49",
    others = "A410"
}

// Enum for savings account balance
export enum SavingsAccountBalanceLabels {
    less_than_100_dm = "A61",
    between_100_and_500_dm = "A62",
    between_500_and_1000_dm = "A63",
    greater_than_1000_dm = "A64",
    unknown_or_no_savings = "A65"
}

// Enum for employment status
export enum EmploymentStatusLabels {
    unemployed = "A71",
    less_than_1_year = "A72",
    between_1_and_4_years = "A73",
    between_4_and_7_years = "A74",
    greater_than_7_years = "A75"
}

// Enum for personal status and sex
export enum StatusAndSexLabels {
    male_divorced_separated = "A91",
    female_divorced_separated_married = "A92",
    male_single = "A93",
    male_married_widowed = "A94",
    female_single = "A95"
}

// Enum for other debtors/guarantors
export enum OtherDebtorsGuarantorsLabels {
    no_other_debtors = "A101",
    co_applicant = "A102",
    guarantor = "A103"
}

// Enum for property owned
export enum PropertyOwnedLabels {
    real_estate = "A121",
    building_society_savings_or_life_insurance = "A122",
    car_or_other_property = "A123",
    unknown_or_no_property = "A124"
}

// Enum for other installment plans
export enum OtherInstallmentPlansLabels {
    bank = "A141",
    stores = "A142",
    no_other_installment_plans = "A143"
}

// Enum for housing status
export enum HousingLabels {
    rent = "A151",
    own = "A152",
    for_free = "A153"
}

// Enum for job category
export enum JobLabels {
    unemployed_unskilled_non_resident = "A171",
    unskilled_resident = "A172",
    skilled_employee_or_official = "A173",
    management_self_employed_highly_qualified = "A174"
}

// Enum for telephone
export enum TelephoneLabels {
    no_telephone = "A191",
    yes_telephone_registered = "A192"
}

// Enum for foreign worker
export enum ForeignWorkerLabels {
    yes_foreign_worker = "A201",
    no_foreign_worker = "A202"
}
