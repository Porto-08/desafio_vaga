import { ICreateUser } from "../../../domain/models/ICreateUser";
import { IUser } from "../../../domain/models/IUser";
import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { User } from "../entities/User";

export class UserRepository implements IUserRepository {
  async findByDocument(document: string) {
    const user = (await User.findOne({ document })) as IUser;

    return user;
  }

  async save(user: ICreateUser) {
    const createdUser = await User.create(user);

    await createdUser.save();

    return createdUser;
  }
}
