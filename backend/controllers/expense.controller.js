import Expense from "../models/expense.model.js"

export const createExpense = async(req, res) => {
    const {title, amount, category, userId} = req.body
    try{
        const newExpense = await Expense.create({
            title,
            amount,
            category,
            userId,
        })

      res.status(201).json(newExpense)

    }catch(error){
       res.status(500).json({ success: false, message: 'Failed to create expense', error: error.message });
    }
}

export const getMyExpense = async(req, res) => {
    const {userid} = req.body
    try{
         const expenses = await Expense.find({user: userid}).sort({ createdAt: -1 })
         res.status(200).json({expenses})
    }catch(error){
      res.status(500).json({ message: 'Failed to fetch expenses', error: error.message });

    }
}

export const getAllExpense = async(req, res) => {
  try{
    const expenses = await Expense.find().populate("user")
    res.status(200).json({expenses})
    

  }catch(error){
    res.status(500).json({ message: 'Failed to fetch expenses', error: error.message });
  }
}