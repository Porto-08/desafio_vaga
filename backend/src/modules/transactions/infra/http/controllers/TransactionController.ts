import { Request, Response } from "express";
import { CreateTransactionAndUserService } from "../../../services/CreateTransactionAndUserService";
import moment from "moment";
import { GetTransactionsService } from "../../../services/GetTransactionService";

interface CustomRequest extends Request {
  file: Express.Multer.File;
}

export class TransactionController {
  async index(request: Request, response: Response) {
    const getTransactionsService = new GetTransactionsService();

    const { page = 1, start_date, end_date } = request.query;

    const filter = {
      start_date: start_date ? moment(start_date) : undefined,
      end_date: end_date ? moment(end_date) : undefined,
    };

    const transactions = await getTransactionsService.execute(
      Number(page),
      filter
    );

    if (!transactions) {
      return response.status(404).json({ message: "Transactions not found" });
    }

    return response.json(transactions);
  }

  async store(request: CustomRequest, response: Response) {
    if (!request.file) {
      return response.status(400).json({ message: "File not found" });
    }

    const filePath = request.file.path;

    const begin = moment.now();

    const createTransactionAndUserService =
      new CreateTransactionAndUserService();

    await createTransactionAndUserService.execute(filePath);

    const end = moment.now();

    const time = moment.duration(end - begin).asSeconds();

    return response.json({ message: `Transactions created in ${time}s` });
  }
}
