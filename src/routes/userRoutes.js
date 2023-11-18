import { Router } from "express";
import viewUser from "../controllers/user/view";
import isAuthenticated from "../middleware/isAuthenticated";

const userRoutes = Router();

userRoutes.get("/", isAuthenticated, viewUser);

export default userRoutes;
