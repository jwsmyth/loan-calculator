export interface Lender {
  name: string;
  rules: Rule[];
}

export interface Rule {
  field: string;
  operator: string;
  value: number;
}

export interface MonthlyCalculation {
  amount: number;
  duration: number;
}
