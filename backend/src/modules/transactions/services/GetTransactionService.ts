import { ITransaction } from "../domain/models/ITransaction";
import { TransactionRepository } from "../infra/mongoose/repositories/TransactionRepository";

interface IResponse {
  transactions: ITransaction[];
  page: number;
}

export class GetTransactionsService {
  async execute(page: number): Promise<IResponse[] | null> {
    const transactionRepository = new TransactionRepository();

    const transactions = await transactionRepository.findTransactionPaginated(page, 50);

    if (!transactions) {
      return null;
    }

    return transactions;
  }
}