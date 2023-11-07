import { Router } from "express";
import createVenue from "../controllers/venue/create";
import isAuthenticated from "../middleware/isAuthenticated";
import deleteVenue from "../controllers/venue/delete";
import viewVenue from "../controllers/venue/view";
import updateVenue from "../controllers/venue/update";
import listAll from "../controllers/venue/listAll";

const venueRoutes = Router();

venueRoutes.post("/add", isAuthenticated, createVenue);
venueRoutes.get("/:userId", isAuthenticated, listAll);
venueRoutes.get("/:userId/:id", isAuthenticated, viewVenue);
venueRoutes.delete("/:userId/:id", isAuthenticated, deleteVenue);
venueRoutes.put("/:userId/:id", isAuthenticated, updateVenue);

export default venueRoutes;
