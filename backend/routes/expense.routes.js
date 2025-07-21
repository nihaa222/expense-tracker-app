
import express from "express"
import { createExpense, getAllExpense, getMyExpense } from "../controllers/expense.controller.js"

const router = express.Router()

router.post("/createExpense", createExpense)
router.get("/getMyExpense", getMyExpense)
router.get("/getAllExpense", getAllExpense)

export default router