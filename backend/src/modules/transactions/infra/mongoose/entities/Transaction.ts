import mongoose from "mongoose";
import { ITransaction } from "../../../domain/models/ITransaction";

const TransactionSchema = new mongoose.Schema({
  transaction_id: String,
  user_id: String,
  amount: Number,
  created_at: Date,
});

export const Transaction = mongoose.model<ITransaction & mongoose.Document>("transactions", TransactionSchema);
