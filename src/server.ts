import app from "./app";
import { PrismaService } from "./services/PrismaService";

const PORT = parseInt(process.env.PORT ?? "4001", 10);

const bootstrap = (port: number) => {
  const prisma = PrismaService.getInstance();

  prisma
    .$connect()
    .then(() => {
      app.listen(port, () => {
        console.log(`Server started at http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.error("Database not connect: ", err);
    });
};

// Runner
bootstrap(PORT);
