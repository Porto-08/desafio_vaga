import { IFilterTransaction, IResponseTransactions } from "../../types";
import { ICreateTransaction } from "../models/ICreateTransaction";
import { ITransaction } from "../models/ITransaction";

export interface ITransactionRepository {
  findByTransactionId(transaction_id: string): Promise<ITransaction | null>;
  findTransactionPaginated(page: number, limit: number, filter?: IFilterTransaction): Promise<IResponseTransactions>;
  save(transaction: ICreateTransaction): Promise<void>;
}