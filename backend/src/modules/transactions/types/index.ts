import { ITransaction } from "../domain/models/ITransaction";

export interface IResponseTransactions {
  data: ITransaction[];
  currentPage: number;
  totalPages: number;
}