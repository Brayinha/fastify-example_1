import { AppDataSource } from "../config/db";
import { User } from "../entity/User";

export const UserRepository = AppDataSource.getRepository(User);




