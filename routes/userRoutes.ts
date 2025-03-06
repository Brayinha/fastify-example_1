import { FastifyInstance } from "fastify";
import { createUser, getUser, getAllUsers, updateUser, deleteUser} from "../controller/userController";

export async function userRoutes(fastify: FastifyInstance){
     // Rota para criar um usuário
  fastify.post("/users", createUser);

  // Rota para obter todos os usuários
  fastify.get("/users", getAllUsers);

  // Rota para obter um usuário específico
  fastify.get("/users/:id", getUser);

  // Rota para atualizar um usuário
  fastify.put("/users/:id", updateUser);

  // Rota para excluir um usuário
  fastify.delete("/users/:id", deleteUser);
}