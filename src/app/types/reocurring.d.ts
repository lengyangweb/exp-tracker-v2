export type RecurringFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';

/** Represents a recurring expense or income. */
export interface Recurring {
  id: string;
  userId: string;
  title: string;
  amount: number;
  startDate: string;
  endDate: string;
  frequency: RecurringFrequency;
  createdAt: string;
  updatedAt: string;
  nextOccurrence?: string;
}