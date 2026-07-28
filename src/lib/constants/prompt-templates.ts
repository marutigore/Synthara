export interface PromptTemplate {
  id: string;
  category: string;
  title: string;
  prompt: string;
  recommendedRows: number;
}

export const PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: "ecom-products",
    category: "E-Commerce",
    title: "Product Catalog & Inventory",
    prompt: "Generate a realistic e-commerce product catalog containing product_id, title, category, price, stock_quantity, rating, and SKU number.",
    recommendedRows: 50
  },
  {
    id: "fin-transactions",
    category: "Finance",
    title: "Financial Transactions Ledger",
    prompt: "Generate a banking transaction log with transaction_id, timestamp, account_id, transaction_type (credit/debit), amount_usd, merchant_name, and fraud_flag.",
    recommendedRows: 100
  },
  {
    id: "saas-telemetry",
    category: "SaaS Logs",
    title: "SaaS Event Telemetry",
    prompt: "Generate user activity logs for a SaaS platform including event_id, user_id, action (login, export, error), duration_ms, browser, and ip_address.",
    recommendedRows: 75
  },
  {
    id: "health-patients",
    category: "Healthcare",
    title: "Anonymized Patient Records",
    prompt: "Generate synthetic clinical patient data including patient_id, age, gender, blood_type, primary_diagnosis, admission_date, and treatment_cost.",
    recommendedRows: 30
  }
];
