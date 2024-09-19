import { Router } from "express";
import { TransactionController } from "../controllers/TransactionController";
import multer from "multer";

const routes = Router();
const transactionController = new TransactionController();

routes.get("/", transactionController.index);
routes.post('/', multer({ dest: 'uploads/' }).single('file'), transactionController.store);

export default routes;