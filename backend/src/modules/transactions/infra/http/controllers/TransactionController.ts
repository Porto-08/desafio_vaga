import { Request, Response } from "express";
import { CreateTransactionAndUserService } from "../../../services/CreateTransactionAndUserService";
import moment from "moment";

export class TransactionController {
  
  // private transactionRepository: ITransactionRepository;

  // constructor() {
  //   this.transactionRepository = ''
  // }

  async index(request: Request, response: Response) {
    return response.json({ message: 'Hello World' });
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
    