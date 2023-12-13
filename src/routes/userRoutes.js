import { Router } from "express";
import viewUser from "../controllers/user/view";
import isAuthenticated from "../middleware/isAuthenticated";
import updateUser from "../controllers/user/update";

const userRoutes = Router();

userRoutes.get("/", isAuthenticated, viewUser);
userRoutes.put("/", isAuthenticated, updateUser);

export default userRoutes;
