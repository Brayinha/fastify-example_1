import { FastifyRequest, FastifyReply } from "fastify";
import { AppDataSource } from "../config/db";
import { User } from "../entity/User";


export const createUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { name, email } = request.body as { name: string; email: string };
  
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = userRepository.create({ name, email });

      await userRepository.save(user);

      reply.status(201).send(user);

    } catch (error) {

      reply.status(500).send({ error: "Erro ao criar o usuário" });
    }
};

  
export const getAllUsers = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const userRepository = AppDataSource.getRepository(User);
      const users = await userRepository.find();
      reply.status(200).send(users);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao listar os usuários" });
    }
};

export const getUser = async(request:FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as {id: string };

    try{
        const userRepository = AppDataSource.getRepository(User)
        const user = await userRepository.findOneBy({ id: Number(id)})


        if(!user){
            return reply.status(404).send({ error: "Usuário não encontraf"})
        }
        reply.status(200).send(user)

    }catch(error){
        reply.status(500).send({ error: "Erro ao buscar o usuário"})
    }
}


export const updateUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
    const { name, email } = request.body as { name: string; email: string };
  
    try {
      const userRepository = AppDataSource.getRepository(User);
      let user = await userRepository.findOneBy({ id: Number(id) });
  
      if (!user) {
        return reply.status(404).send({ error: "Usuário não encontrado" });
      }
  
      user.name = name;
      user.email = email;
  
      user = await userRepository.save(user);
  
      reply.status(200).send(user);
    } catch (error) {
      reply.status(500).send({ error: "Erro ao atualizar o usuário" });
    }
};


export const deleteUser = async (request: FastifyRequest, reply: FastifyReply) => {
    const { id } = request.params as { id: string };
  
    try {
      const userRepository = AppDataSource.getRepository(User);
      const user = await userRepository.findOneBy({ id: Number(id) });
  
      if (!user) {
        return reply.status(404).send({ error: "Usuário não encontrado" });
      }
  
      await userRepository.remove(user);
  
      reply.status(200).send({ message: "Usuário excluído com sucesso" });
    } catch (error) {
      reply.status(500).send({ error: "Erro ao excluir o usuário" });
    }
  };


