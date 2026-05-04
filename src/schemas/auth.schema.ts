import { z } from "zod";

// 👤 Replaces User.java
export const UserSchema = z.object({
  id: z.number().optional(), // Optional since it's assigned by backend
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  // Password is usually only present during Signup/Login
  password: z.string().min(6, "Password must be at least 6 characters").optional(),
  role: z.enum(["user", "admin"]).default("user"), // Translates your comment logic
});

// 🔑 Replaces LoginRequest.java
export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

// 📥 Replaces LoginResponse.java
export const LoginResponseSchema = z.object({
  token: z.string(),
  user: UserSchema,
  message: z.string().optional(),
});

// TypeScript Types
export type User = z.infer<typeof UserSchema>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export type LoginResponse = z.infer<typeof LoginResponseSchema>;