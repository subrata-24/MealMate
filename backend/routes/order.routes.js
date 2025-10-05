import express from "express";
import { getMyOrders, placeOrder } from "../controllers/order.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuth, placeOrder);
orderRouter.get("/my-order", isAuth, getMyOrders);

export default orderRouter;
