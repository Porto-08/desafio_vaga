import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUserRepository {
  findByDocument(document: string): Promise<IUser | undefined>;
  save(user: ICreateUser): Promise<IUser>;
}