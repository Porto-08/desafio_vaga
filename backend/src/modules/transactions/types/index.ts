import { Moment } from "moment";
import { ITransaction } from "../domain/models/ITransaction";

export interface IResponseTransactions {
  data: ITransaction[];
  currentPage: number;
  totalPages: number;
}
export interface IFilterTransaction {
  start_date?: Moment;
  end_date?: Moment;
}