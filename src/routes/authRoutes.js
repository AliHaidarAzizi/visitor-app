import { Router } from "express";
import register from "../controllers/user/register";
import login from "../controllers/user/login";
import pageAuth from "../controllers/user/pageAuth";
import isAuthenticated from "../middleware/isAuthenticated";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);

export default authRoutes;
