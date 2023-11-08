import { Router } from "express";
import addVisitor from "../controllers/visitor/add";

const visitorRoutes = Router();

visitorRoutes.post("/", addVisitor);

export default visitorRoutes;
