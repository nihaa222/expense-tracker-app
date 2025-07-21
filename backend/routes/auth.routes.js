
import express from "express";
import { signin, signup } from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.js";
import { signinSchema, signupSchema } from "../validators/auth.validator.js";



const router = express.Router()

router.post("/signup", validate(signupSchema) ,signup)
router.post("/signin", validate(signinSchema), signin)

export default router;