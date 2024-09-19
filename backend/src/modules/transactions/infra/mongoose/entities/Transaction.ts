import mongoose from "mongoose";
import { ITransaction } from "../../../domain/models/ITransaction";

const TransactionSchema = new mongoose.Schema({
  transaction_id: String,
  amount: Number,
  transaction_date: Date,
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  }]
});

export const Transaction = mongoose.model<ITransaction & mongoose.Document>("transactions", TransactionSchema);
