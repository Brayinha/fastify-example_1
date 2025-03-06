import Fastify from "fastify";
import { userRoutes } from "./routes/userRoutes";
import { connectDatabase } from "./config/db";

const app = Fastify();

// Conectar ao banco de dados
connectDatabase();

// Registrar as rotas
app.register(userRoutes);

// Iniciar o servidor corretamente
app.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
