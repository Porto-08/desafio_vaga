import moment from "moment";
import { ICreateTransaction } from "../../../domain/models/ICreateTransaction";
import { ITransactionRepository } from "../../../domain/repositories/ITransactionRepository";
import { IFilterTransaction, IResponseTransactions } from "../../../types";
import { Transaction } from "../entities/Transaction";

export class TransactionRepository implements ITransactionRepository {
  async findByTransactionId(transaction_id: string) {
    const transaction = await Transaction.findOne({
      transaction_id: transaction_id,
    });

    return transaction;
  }

  async findTransactionPaginated(
    page: number,
    limit: number,
    filter?: IFilterTransaction
  ): Promise<IResponseTransactions> {
    const skip = (page - 1) * limit;

    let filterQuery = {};

    if(filter?.start_date && filter?.end_date) {
      filterQuery = {
        transaction_date: {
          $gte: filter.start_date,
          $lte: filter.end_date,
        },
      }
    }

    const transactions = await Transaction.find(filterQuery)
      .skip(skip)
      .limit(limit)
      .sort({ transaction_date: "desc" })
      .populate("users");

    const totalTransactions = await Transaction.countDocuments();
    const totalPages = Math.ceil(totalTransactions / limit);

    return {
      data: transactions,
      currentPage: page,
      totalPages,
    };
  }

  async save(transaction: ICreateTransaction) {
    const createdTransaction = await Transaction.create(transaction);

    await createdTransaction.save();
  }
}
