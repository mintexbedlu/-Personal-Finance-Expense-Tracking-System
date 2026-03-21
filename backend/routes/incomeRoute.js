// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import { addIncome} from "../controllers/incomeController.js";

// const incomeRouter = express.Router();

// incomeRouter.post("/add", authMiddleware, addIncome);
// incomeRouter.get("/get", authMiddleware, getIncome);

// incomeRouter.put("/update/:id", authMiddleware, updateIncome);
// incomeRouter.get("/download", authMiddleware, downloadIncomeExcel);

// incomeRouter.delete("/delete/:id", authMiddleware, deleteIncome);
// incomeRouter.get("/overview", authMiddleware, getIncomeOverview);

// export default incomeRouter;


// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import {
//   addIncome,
//   getIncome,
//   updateIncome,
//   deleteIncome,
//   downloadIncomeExcel,
//   getIncomeOverview
// } from "../controllers/incomeController.js";

// const incomeRouter = express.Router();

// incomeRouter.post("/add", authMiddleware, addIncome);
// incomeRouter.get("/get", authMiddleware, getIncome);

// incomeRouter.put("/update/:id", authMiddleware, updateIncome);
// incomeRouter.get("/download", authMiddleware, downloadIncomeExcel);

// incomeRouter.delete("/delete/:id", authMiddleware, deleteIncome);
// incomeRouter.get("/overview", authMiddleware, getIncomeOverview);

// export default incomeRouter;


import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  addIncome,
  getAllIncome,
  updateIncome,
  deleteIncome,
  downloadIncomeExcel,
  getIncomeOverview
} from "../controllers/incomeController.js";

const incomeRouter = express.Router();

incomeRouter.post("/add", authMiddleware, addIncome);
incomeRouter.get("/get", authMiddleware, getAllIncome);

incomeRouter.put("/update/:id", authMiddleware, updateIncome);
incomeRouter.get("/download", authMiddleware, downloadIncomeExcel);

incomeRouter.delete("/delete/:id", authMiddleware, deleteIncome);
incomeRouter.get("/overview", authMiddleware, getIncomeOverview);

export default incomeRouter;