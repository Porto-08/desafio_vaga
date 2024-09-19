import { ICreateTransaction } from "../models/ICreateTransaction";
import { ITransaction } from "../models/ITransaction";

export interface ITransactionRepository {
  findByTransactionId(transaction_id: string): Promise<ITransaction | null>;
  findTransactionPaginated(): Promise<ITransaction[]>;
  save(transaction: ICreateTransaction): Promise<void>;
}