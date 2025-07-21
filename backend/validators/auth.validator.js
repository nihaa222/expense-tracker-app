// validators/auth.validator.js
import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().min(1, 'Name is required'),
email: z.email('Invalid email'),
password: z.string().min(4, 'Password must be at least 4 characters'),
});

export const signinSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});
