export const IS_CLIENT = typeof window !== 'undefined';

export enum ROUTES {
  HOME = '/',
  // temporary urls, not defined yet
  APPLICATIONS_PROCESSED = '/processed',
  APPLICATIONS_ARCHIVE = '/archive',
  APPLICATIONS_REPORTS = '/reports',
}

export enum EXPORT_APPLICATIONS_ROUTES {
  ACCEPTED = 'export_new_accepted_applications',
  REJECTED = 'export_new_rejected_applications',
  IN_TIME_RANGE = 'export_csv',
}

export enum SUPPORTED_LANGUAGES {
  FI = 'fi',
  SV = 'sv',
  EN = 'en',
}

export enum PROPOSALS_FOR_DESISION {
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export enum BENEFIT_TYPES {
  EMPLOYMENT = 'employment_benefit',
  SALARY = 'salary_benefit',
  COMMISSION = 'commission_benefit',
}

export enum ATTACHMENT_TYPES {
  EMPLOYMENT_CONTRACT = 'employment_contract',
  PAY_SUBSIDY_CONTRACT = 'pay_subsidy_decision',
  COMMISSION_CONTRACT = 'commission_contract',
  EDUCATION_CONTRACT = 'education_contract',
  HELSINKI_BENEFIT_VOUCHER = 'helsinki_benefit_voucher',
  EMPLOYEE_CONSENT = 'employee_consent',
}

export enum ORGANIZATION_TYPES {
  COMPANY = 'company',
  ASSOCIATION = 'association',
}

export const DEFAULT_LANGUAGE = SUPPORTED_LANGUAGES.FI;

export const COMMON_I18N_NAMESPACES = ['common'] as const;

export const PRIVACY_POLICY_LINKS = {
  fi: 'https://www.hel.fi/1',
  en: 'https://www.hel.fi/2',
  sv: 'https://www.hel.fi/3',
} as const;

export enum APPLICATION_STATUSES {
  DRAFT = 'draft',
  INFO_REQUIRED = 'additional_information_needed',
  RECEIVED = 'received',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  CANCELLED = 'cancelled',
  HANDLING = 'handling',
}

export enum APPLICATION_FIELDS_STEP1_KEYS {
  USE_ALTERNATIVE_ADDRESS = 'useAlternativeAddress',
  ALTERNATIVE_COMPANY_STREET_ADDRESS = 'alternativeCompanyStreetAddress',
  ALTERNATIVE_COMPANY_POSTCODE = 'alternativeCompanyPostcode',
  ALTERNATIVE_COMPANY_CITY = 'alternativeCompanyCity',
  COMPANY_DEPARTMENT = 'companyDepartment',
  COMPANY_BANK_ACCOUNT_NUMBER = 'companyBankAccountNumber',
  ASSOCIATION_HAS_BUSINESS_ACTIVITIES = 'associationHasBusinessActivities',
  ASSOCIATION_IMMEDIATE_MANAGER_CHECK = 'associationImmediateManagerCheck',
  COMPANY_CONTACT_PERSON_FIRST_NAME = 'companyContactPersonFirstName',
  COMPANY_CONTACT_PERSON_LAST_NAME = 'companyContactPersonLastName',
  COMPANY_CONTACT_PERSON_PHONE_NUMBER = 'companyContactPersonPhoneNumber',
  COMPANY_CONTACT_PERSON_EMAIL = 'companyContactPersonEmail',
  APPLICANT_LANGUAGE = 'applicantLanguage',
  DE_MINIMIS_AID = 'deMinimisAid',
  DE_MINIMIS_AID_SET = 'deMinimisAidSet',
  CO_OPERATION_NEGOTIATIONS = 'coOperationNegotiations',
  CO_OPERATION_NEGOTIATIONS_DESCRIPTION = 'coOperationNegotiationsDescription',
  ORGANIZATION_TYPE = 'organizationType',
}

export enum EMPLOYEE_KEYS {
  FIRST_NAME = 'firstName',
  LAST_NAME = 'lastName',
  PHONE_NUMBER = 'phoneNumber',
  SOCIAL_SECURITY_NUMBER = 'socialSecurityNumber',
  IS_LIVING_IN_HELSINKI = 'isLivingInHelsinki',
  JOB_TITLE = 'jobTitle',
  WORKING_HOURS = 'workingHours',
  COLLECTIVE_BARGAINING_AGREEMENT = 'collectiveBargainingAgreement',
  MONTHLY_PAY = 'monthlyPay',
  OTHER_EXPENSES = 'otherExpenses',
  VACATION_MONEY = 'vacationMoney',
  COMMISSION_DESCRIPTION = 'commissionDescription',
  EMPLOYEE_COMMISSION_AMOUNT = 'commissionAmount',
}

export enum APPLICATION_FIELDS_STEP2_KEYS {
  PAY_SUBSIDY_GRANTED = 'paySubsidyGranted',
  PAY_SUBSIDY_PERCENT = 'paySubsidyPercent',
  ADDITIONAL_PAY_SUBSIDY_PERCENT = 'additionalPaySubsidyPercent',
  APPRENTICESHIP_PROGRAM = 'apprenticeshipProgram',
  BENEFIT_TYPE = 'benefitType',
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  EMPLOYEE = 'employee',
}

export enum DE_MINIMIS_AID_KEYS {
  GRANTER = 'granter',
  AMOUNT = 'amount',
  GRANTED_AT = 'grantedAt',
}

export enum CALCULATION_EMPLOYMENT_KEYS {
  START_DATE = 'startDate',
  END_DATE = 'endDate',
}

export enum EXPORT_APPLICATIONS_IN_TIME_RANGE_FORM_KEYS {
  START_DATE = 'startDate',
  END_DATE = 'endDate',
}

export enum CALCULATION_SALARY_KEYS {
  START_DATE = 'startDate',
  END_DATE = 'endDate',
  MONTHLY_PAY = 'monthlyPay',
  OTHER_EXPENSES = 'otherExpenses',
  VACATION_MONEY = 'vacationMoney',
  STATE_AID_MAX_PERCENTAGE = 'stateAidMaxPercentage',
  PAY_SUBSIDY_PERCENT = 'paySubsidyPercent',
  OVERRIDE_MONTHLY_BENEFIT_AMOUNT = 'overrideMonthlyBenefitAmount',
  OVERRIDE_MONTHLY_BENEFIT_AMOUNT_COMMENT = 'overrideMonthlyBenefitAmountComment',
  // eslint-disable-next-line no-secrets/no-secrets
  WORK_TIME_PERCENT = 'workTimePercent',
  PAY_SUBSIDIES = 'paySubsidies',
  TRAINING_COMPENSATIONS = 'trainingCompensations',
  MONTHLY_AMOUNT = 'monthlyAmount',
}

export const STATE_AID_MAX_PERCENTAGE_OPTIONS = [50, 100];

export const CALCULATION_SUMMARY_ROW_TYPES = [
  'state_aid_max_monthly_eur',
  'pay_subsidy_monthly_eur',
  'helsinki_benefit_total_eur',
];

export const CALCULATION_DESCRIPTION_ROW_TYPES = ['description'];

export const CALCULATION_TOTAL_ROW_TYPE = 'helsinki_benefit_total_eur';

export enum CALCULATION_TYPES {
  SALARY = 'salary',
  EMPLOYMENT = 'employment',
}

export const HANDLED_STATUSES: APPLICATION_STATUSES[] = [
  APPLICATION_STATUSES.ACCEPTED,
  APPLICATION_STATUSES.REJECTED,
  APPLICATION_STATUSES.CANCELLED,
];
