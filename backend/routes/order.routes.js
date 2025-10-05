import express from "express";
import {
  getOwnerOrdersItem,
  getUserOrdersItem,
  placeOrder,
} from "../controllers/order.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuth, placeOrder);
orderRouter.get("/user-order", isAuth, getUserOrdersItem);
orderRouter.get("/owner-order", isAuth, getOwnerOrdersItem);

export default orderRouter;
