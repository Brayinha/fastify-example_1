import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "../entity/User";

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5432,
    username: process.env.DB_USER || "fastify",
    password: process.env.DB_PASSWORD || "secret",
    database: process.env.DB_NAME || "fastifydb",
    synchronize: true,
    logging: false,
    entities: [User],
});


export const connectDatabase = async () => {
    try {
      await AppDataSource.initialize();
      console.log("📦 Banco de dados conectado!");
    } catch (error) {
      console.error("❌ Erro ao conectar no banco de dados:", error);
      process.exit(1);
    }
  };