
import express from "express"
import { createExpense, getAllExpense, getMyExpense } from "../controllers/expense.controller.js"
import { validate } from "../middleware/validate.js"
import { expenseSchema } from "../validators/expense.validator.js"

const router = express.Router()

router.post("/createExpense", validate(expenseSchema) ,createExpense)
router.get("/getMyExpense", getMyExpense)
router.get("/getAllExpense", getAllExpense)

export default router