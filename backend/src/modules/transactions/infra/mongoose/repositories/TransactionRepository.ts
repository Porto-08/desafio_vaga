import { ICreateTransaction } from "../../../domain/models/ICreateTransaction";
import { ITransactionRepository } from "../../../domain/repositories/ITransactionRepository";
import { IResponseTransactions } from "../../../types";
import { Transaction } from "../entities/Transaction";

export class TransactionRepository implements ITransactionRepository {
  async findByTransactionId(transaction_id: string) {
    const transaction = await Transaction.findOne({
      transaction_id: transaction_id,
    });

    return transaction;
  }

  async findTransactionPaginated(page: number, limit: number): Promise<any> {
    const skip = (page - 1) * limit;

    const transactions = await Transaction.find()
    .skip(skip)
    .limit(limit)
    .sort({ transaction_date: 'desc' });

    const totalTransactions = await Transaction.countDocuments();
    const totalPages = Math.ceil(totalTransactions / limit);

    return {
      data: transactions,
      currentPage: page,
      totalPages,
    } as IResponseTransactions;
  }

  async save(transaction: ICreateTransaction) {
    const createdTransaction = await Transaction.create(transaction);

    await createdTransaction.save();
  }
}
