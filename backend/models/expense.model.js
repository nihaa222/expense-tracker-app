
import mongoose, { SchemaType } from "mongoose"

const expenseSchema = new mongoose.Schema({
    title: {
         type: String,
        required: true,

    },
    amount: {
       type: Number,
       required: true,
       default: Number,

    },
    category: {
       type: String,
       enum: ["food", "travel", "shopping", "other"],
       default: "other"
    },
    date: {
        type: Date,
        default: Date.now,
    },
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
}, {timestamps: true})

export default mongoose.model("Expense", expenseSchema)
