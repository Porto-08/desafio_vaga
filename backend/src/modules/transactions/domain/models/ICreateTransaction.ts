export interface ICreateTransaction {
  transaction_id: string;
  user_id: string;
  amount: number;
  transaction_date: Date;
}