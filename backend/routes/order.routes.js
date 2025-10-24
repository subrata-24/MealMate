import express from "express";
import {
  getDeliveryAssignment,
  getMyOrders,
  placeOrder,
  updateStatus,
} from "../controllers/order.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuth, placeOrder);
orderRouter.get("/my-order", isAuth, getMyOrders);
orderRouter.get("/get-assignmnet", isAuth, getDeliveryAssignment);
orderRouter.post("/update-status/:orderID/:shopID", isAuth, updateStatus);

export default orderRouter;
