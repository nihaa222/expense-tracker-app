import { z } from "zod";

export const expenseSchema = z.object({
  title: z.string().min(1, "Title is required"),
  amount: z.number().positive("Amount must be positive"),
  category: z.enum(["food", "travel", "utilities", "health", "other"], {
    errorMap: () => ({ message: "Invalid category" }),
  }),
  date: z.string().refine(
    (val) => !isNaN(Date.parse(val)),
    { message: "Invalid date format" }
  )
});
