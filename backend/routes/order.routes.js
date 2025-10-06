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
orderRouter.post("/update-status/:orderID/:shopID", isAuth, updateStatus);

export default orderRouter;
