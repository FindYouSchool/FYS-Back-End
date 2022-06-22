import express, { NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import helmet from "helmet";
const cors = require("cors");

import routes from "./routes";
import { errorMiddleware } from "./middewares/errorMiddleware";
import { notFoundMiddleware } from "./middewares/notFoundMiddleware";

// env config
dotenv.config();

// create an express application
const app: express.Application = express();

// cors origin request
app.use(cors());

// secure app by setting various headers
app.use(helmet());

// parse application/json
app.use(express.json());

// intall all routes in app
app.use("/", routes);

//
app.all("*", notFoundMiddleware);

app.use(errorMiddleware);

export default app;
