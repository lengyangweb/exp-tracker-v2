
/** A history entry */
export interface History {
  id: string;
  trackerId: string;
  userId: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  title: string;
  description: string;
  historyDate: Date;
}