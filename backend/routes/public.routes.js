import express from "express";
import { allFoods, allShop } from "../controllers/public.controller";
const publicRoutes = express.Router();

publicRoutes.get("/get-all-items", allFoods);
publicRoutes.get("/get-all-shop", allShop);

export default publicRoutes;
