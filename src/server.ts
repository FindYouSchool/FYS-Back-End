import { PrismaClient } from "@prisma/client";
import app from "./app";
import { Container } from "./lib/di";

const PORT = parseInt(process.env.PORT ?? "4001", 10);

const bootstrap = (port: number) => {
  const prisma = Container.getInstance().resolve<PrismaClient>(PrismaClient);

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
