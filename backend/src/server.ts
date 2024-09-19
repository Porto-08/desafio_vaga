import express from "express";
import "dotenv/config";
import { Router } from "express";
import { Database } from "./config/database";
import transactionRoutes from './modules/transactions/infra/http/routes/transactions.routes'

const app = express();
const route = Router();

app.use(route);

const database = new Database();
database.connect();

route.use('/transactions', transactionRoutes);
const PORT = process.env.PORT || 3333;

app.listen(PORT, () => `Server running on port ${PORT}`);
