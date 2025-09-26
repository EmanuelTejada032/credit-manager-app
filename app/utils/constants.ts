import { TransactionCategory } from '../types';

export const TRANSACTION_CATEGORIES: TransactionCategory[] = [
  'Food',
  'Shopping',
  'Transportation',
  'Entertainment',
  'Bills',
  'Healthcare',
  'Travel',
  'Payment',
  'Other',
];

export const CATEGORY_ICONS: Record<TransactionCategory, string> = {
  Food: '🍔',
  Shopping: '🛍️',
  Transportation: '🚗',
  Entertainment: '🎬',
  Bills: '📄',
  Healthcare: '🏥',
  Travel: '✈️',
  Payment: '💳',
  Other: '📌',
};