import { Router } from "express";
import createVenue from "../controllers/venue/create";
import isAuthenticated from "../middleware/isAuthenticated";

const venueRoutes = Router();

venueRoutes.post("/add", isAuthenticated, createVenue);

export default venueRoutes;
