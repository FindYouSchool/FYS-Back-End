import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
const cors = require("cors");

import routes from "./routes";

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

export default app;
