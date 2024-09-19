import { Request, Response } from "express";
import { CreateTransactionAndUserService } from "../../../services/CreateTransactionAndUserService";
import moment from "moment";
import { GetTransactionsService } from "../../../services/GetTransactionService";

export class TransactionController {
  async index(request: Request, response: Response) {
    const getTransactionsService = new GetTransactionsService();

    const { page = 1 } = request.query;

    const transactions = await getTransactionsService.execute(Number(page));

    if (!transactions) {
      return response.status(404).json({ message: 'Transactions not found' });
    }

    return response.json(transactions);
  }

  async store(request: Request, response: Response) {
    if (!request.file) {
      return response.status(400).json({ message: 'File not found' });
    }
    
    const filePath = request.file.path;

    const begin = moment.now();

    const createTransactionAndUserService = new CreateTransactionAndUserService();

    await createTransactionAndUserService.execute(filePath);

    const end = moment.now();

    const time = moment.duration(end - begin).asSeconds();

    return response.json({ message: `Transactions created in ${time}s` });
  }
}
    