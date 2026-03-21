// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import { addExpense,downloadExpenseExcel,getAllExpense,getExpenseOverview,updateExpense } from "../controllers/expenseController.js";

// const expenseRouter = express.Router()

// expenseRouter.post("/add", authMiddleware, addExpense);
// expenseRouter.get("/get", authMiddleware, getAllExpense);

// expenseRouter.put("/update/:id", authMiddleware, updateExpense);
// expenseRouter.get("/download", authMiddleware, downloadExpenseExcel);

// expenseRouter.delete("/delete/:id", authMiddleware, deleteExpense);
// expenseRouter.get("/overview", authMiddleware, getExpenseOverview);

// export default expenseRouter


import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { 
  addExpense,
  downloadExpenseExcel,
  getAllExpense,
  getExpenseOverview,
  updateExpense,
  deleteExpense
} from "../controllers/expenseController.js";

const expenseRouter = express.Router();

expenseRouter.post("/add", authMiddleware, addExpense);
expenseRouter.get("/get", authMiddleware, getAllExpense);

expenseRouter.put("/update/:id", authMiddleware, updateExpense);
expenseRouter.get("/download", authMiddleware, downloadExpenseExcel);

expenseRouter.delete("/delete/:id", authMiddleware, deleteExpense);
expenseRouter.get("/overview", authMiddleware, getExpenseOverview);

export default expenseRouter;