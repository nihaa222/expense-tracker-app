
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import expenseRoutes from "./routes/expense.routes.js"

dotenv.config()
const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/expenses", expenseRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MONGO CONNECTED");
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });

  app.get("/", (req, res) => {
  res.send("API is running...");
});



app.listen(5000, () => {
    console.log("Hello sir")
})


