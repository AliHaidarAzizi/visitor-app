import express from "express";
import getRoot from "../controllers/root/getRoot";
import postRoot from "../controllers/root/postRoot";
import authRoutes from "./authRoutes";
import venueRoutes from "./venueRoutes";
import visitorRoutes from "./visitorRoutes";
import isAuthenticated from "../middleware/isAuthenticated";
import pageAuth from "../controllers/user/pageAuth";

const root = express.Router();

root.get("/", getRoot);
root.post("/", postRoot);
root.use("/auth", authRoutes);
root.use("/venue", venueRoutes);
root.use("/visitor", visitorRoutes);
root.get("/public", pageAuth.publicController);
root.get("/protected", isAuthenticated, pageAuth.protectedController);

export default root;
