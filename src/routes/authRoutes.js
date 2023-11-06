import { Router } from "express";
import register from "../controllers/user/register";
import login from "../controllers/user/login";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

export default authRoutes;
