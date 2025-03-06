import { UserRepository } from "../repository/userRepository";
import { User } from "../entity/User";
import { ProblemDetails } from "../errors/problemDetails";

export class UserService {
  static async getAllUsers(): Promise<User[]> {
    return await UserRepository.find();
  }

  static async getUserById(id: number): Promise<User> {
    const user = await UserRepository.findOneBy({ id });
    if (!user) throw new ProblemDetails(404, "User Not Found", "Usuário não encontrado.");
    return user;
  }

  static async createUser(data: Partial<User>): Promise<User> {
    return await UserRepository.save(UserRepository.create(data));
  }

  static async updateUser(id: number, data: Partial<User>): Promise<User> {
    await UserService.getUserById(id);
    await UserRepository.update(id, data);
    return (await UserService.getUserById(id))!;
  }

  static async deleteUser(id: number): Promise<void> {
    await UserService.getUserById(id);
    await UserRepository.delete(id);
  }
}
