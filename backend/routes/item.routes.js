import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import {
  createItem,
  deleteItem,
  editItem,
  getItemByCity,
  getItemById,
  getItemByShop,
} from "../controllers/item.controller.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), createItem);
itemRouter.post("/edit-item/:itemID", isAuth, upload.single("image"), editItem);
itemRouter.get("/get-item-by-id/:itemID", isAuth, getItemById);
itemRouter.delete("/delete/:itemID", isAuth, deleteItem);
itemRouter.get("/get-item-by-city/:city", isAuth, getItemByCity);
itemRouter.get("/get-item-by-shop/:shopId", isAuth, getItemByShop);

export default itemRouter;
