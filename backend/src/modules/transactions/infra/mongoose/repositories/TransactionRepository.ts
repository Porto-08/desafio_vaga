import { ICreateTransaction } from "../../../domain/models/ICreateTransaction";
import { ITransactionRepository } from "../../../domain/repositories/ITransactionRepository";
import { Transaction } from "../entities/Transaction";

export class TransactionRepository implements ITransactionRepository {
  async findByTransactionId(transaction_id: string) {
    const transaction = await Transaction.findOne({
      transaction_id: transaction_id,
    });

    return transaction;
  }

  async findTransactionPaginated() {
    const transactions = await Transaction.find();

    return transactions;
  }

  async save(transaction: ICreateTransaction) {
    const createdTransaction = await Transaction.create(transaction);

    await createdTransaction.save();
  }
}
