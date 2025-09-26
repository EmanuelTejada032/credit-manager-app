export interface CreditCard {
  id: string;
  lastFourDigits: string;
  bankName: string;
  cardName: string;
  color: string;
  maxCreditLimit: number;
  availableCredit: number;
  expirationDate: string;
  billingCycleClosing: string;
  paymentDueDate: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  cardId: string;
  type: 'debit' | 'credit';
  amount: number;
  category: string;
  description?: string;
  date: string;
  createdAt: string;
}

export type TransactionCategory = 
  | 'Food'
  | 'Shopping'
  | 'Transportation'
  | 'Entertainment'
  | 'Bills'
  | 'Healthcare'
  | 'Travel'
  | 'Other'
  | 'Payment';