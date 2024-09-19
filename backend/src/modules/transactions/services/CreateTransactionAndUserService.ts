import * as readline from 'readline';
import * as fs from 'fs';
import moment from 'moment';
import { UserRepository } from '../../users/infra/mongoose/repositories/UserRepository';
import { TransactionRepository } from '../infra/mongoose/repositories/TransactionRepository';

export class CreateTransactionAndUserService {
  async execute(filePath: string): Promise<void> {
    const userRepository = new UserRepository();
    const transactionRepository = new TransactionRepository();

    const fileStream = readline.createInterface({
      input: fs.createReadStream(filePath),
    });

    const processLine = async (line: string) => {
      const [id, nome, cpfCnpj, data, valor] = line.split(';').map((item) => {
        const [key, value] = item.split(':');
        return value;
      });
      
      console.log(`Processing transaction ${id}...`);

      if (!id) {
        return;
      }
      
      const transactionAlreadyExists = await transactionRepository.findByTransactionId(id);

      if (transactionAlreadyExists) {
        console.log(`Transaction ${id} already exists!`);
        return;
      }
      
      let user = await userRepository.findByDocument(cpfCnpj);

      if (!user) {
        user = await userRepository.save({
          name: nome,
          document: cpfCnpj,
        });
      }

      await transactionRepository.save({
        transaction_id: id,
        amount: Number(valor),
        user_id: user.id,
        transaction_date: moment(data).toDate(),
      });
    };

    fileStream.on('line', processLine);

    await new Promise<void>((resolve) => {
      fileStream.on('close', resolve);
    });

    fs.promises.unlink(filePath);

    return;
  }
}