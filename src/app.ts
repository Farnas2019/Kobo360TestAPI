import express from "express";
import cors from "cors";
import config from "./config";
import connectDB from "./utils/connect";
import logger from "./utils/logger";
import routes from "./routes";


const hostname: string = config.server.hostname;
const port: string | number = config.server.port;

const app = express();

//Enable body-parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Enable Cors
app.use(cors({ origin: "*" }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");

  next();
});

//starting server
const server = app.listen(port, async () => {
  console.clear();
  logger.info(`Server listening at http://${hostname}:${port}`);
  await connectDB();
});

routes(app);
// error handling
app.use((req, res, next) => {
  const error = new Error("Path Not found");
  return res.status(400).json({ message: error.message });
});

//handle unhandled rejections
process.on("unhandledRejection", (err: { message: string }, promise) => {
  console.log(`Error: ${err.message}`);

  //close server & exit process
  server.close(() => process.exit(1));
});

module.exports = server