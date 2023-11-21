import { Router } from "express";
import addVisitor from "../controllers/visitor/add";
import listAllVisitor from "../controllers/visitor/listAll";

const visitorRoutes = Router();

visitorRoutes.post("/:venueId", addVisitor);
visitorRoutes.get("/:venueId", listAllVisitor);

export default visitorRoutes;
