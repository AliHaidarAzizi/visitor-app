import { Router } from "express";
import createVenue from "../controllers/venue/create";
import isAuthenticated from "../middleware/isAuthenticated";
import deleteVenue from "../controllers/venue/delete";
import viewVenue from "../controllers/venue/view";
import updateVenue from "../controllers/venue/update";
import listAll from "../controllers/venue/listAll";

const venueRoutes = Router();

venueRoutes.post("/add", isAuthenticated, createVenue);
venueRoutes.get("/", isAuthenticated, listAll);
venueRoutes.get("/:id", isAuthenticated, viewVenue);
venueRoutes.delete("/:id", isAuthenticated, deleteVenue);
venueRoutes.put("/:id", isAuthenticated, updateVenue);

export default venueRoutes;
