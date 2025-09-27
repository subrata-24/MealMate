import express from "express";
import isAuth from "../middlewares/isAuth.js";
import { upload } from "../middlewares/multer.js";
import { createItem, editItem } from "../controllers/item.controller.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), createItem);
itemRouter.post("/edit-item/:itemID", isAuth, upload.single("image"), editItem);

export default itemRouter;
