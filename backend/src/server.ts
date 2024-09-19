import express from "express";
import "dotenv/config";
import { Router, Request, Response } from "express";

const app = express();
const route = Router();

app.use(route);

app.get("/", (req: Request, res: Response) => {
  return res.json({ message: "Hello World" });
});

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => `Server running on port ${PORT}`);
