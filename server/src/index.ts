// src/index.ts
import express, { Request, Response } from "express";
import config from "config";
import connectToDatabase from "../utilities/dbConnection";
import { handleGlobalError } from "../utilities/error-handler";
import cors from "cors";
import router from "../routes/index";

const app = express();
const port = config.get("server.port") as number;

// Middleware to handle global errors
app.use(handleGlobalError);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// routes
app.use("/api", router);

// testing route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello, Express!");
});

app.listen(port, async () => {
  // Connect to the database
  await connectToDatabase();
  console.log(`Server is running on port ${port}`);
});
