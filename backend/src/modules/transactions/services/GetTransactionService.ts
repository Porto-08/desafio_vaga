import { TransactionRepository } from "../infra/mongoose/repositories/TransactionRepository";
import { IFilterTransaction, IResponseTransactions } from "../types";

export class GetTransactionsService {
  async execute(page: number, filter?: IFilterTransaction): Promise<IResponseTransactions | null> {
    const transactionRepository = new TransactionRepository();

    const limit = 50;
    const transactions = await transactionRepository.findTransactionPaginated(page, limit, filter);

    if (!transactions) {
      return null;
    }

    return transactions;
  }
}