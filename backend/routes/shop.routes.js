import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  createAndEditShop,
  getShop,
  getShopByCity,
} from "../controllers/shop.controllers.js";
import { upload } from "../middlewares/multer.js";

const shopRouter = express.Router();

shopRouter.post(
  "/create-edit",
  isAuth,
  upload.single("image"),
  createAndEditShop
);

shopRouter.get("/get-shop", isAuth, getShop);

shopRouter.get("/get-shop-by-city/:city", isAuth, getShopByCity);

export default shopRouter;
