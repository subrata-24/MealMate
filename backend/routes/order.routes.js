import express from "express";
import {
  getMyOrders,
  placeOrder,
  updateStatus,
} from "../controllers/order.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuth, placeOrder);
orderRouter.get("/my-order", isAuth, getMyOrders);
orderRouter.get("/update-status/:shopID/:orderID", isAuth, updateStatus);

export default orderRouter;
