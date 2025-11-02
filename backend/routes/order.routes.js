import express from "express";
import {
  acceptOrder,
  failedPayment,
  getCurrentOrder,
  getDeliveryAssignment,
  getMyOrders,
  getOrderById,
  onlinePayment,
  placeOrder,
  sendDeliveryOTP,
  successFullPayment,
  updateStatus,
  verifyDeliveryOTP,
} from "../controllers/order.controllers.js";
import isAuth from "../middlewares/isAuth.js";

const orderRouter = express.Router();

orderRouter.post("/create-order", isAuth, placeOrder);
orderRouter.get("/my-order", isAuth, getMyOrders);
orderRouter.get("/get-assignmnet", isAuth, getDeliveryAssignment);
orderRouter.get("/get-current-order", isAuth, getCurrentOrder);
orderRouter.post("/send-delivery-otp", isAuth, sendDeliveryOTP);
orderRouter.post("/online-payment", isAuth, onlinePayment);
orderRouter.post(
  "/payment/success/:shopOrderId/:orderId/:tranId",
  successFullPayment
);
orderRouter.post("/payment/failed", failedPayment);
orderRouter.post("/verify-delivery-otp", isAuth, verifyDeliveryOTP);
orderRouter.get("/getorder-by-id/:orderId", isAuth, getOrderById);
orderRouter.get("/accept-order/:assignmentId", isAuth, acceptOrder);
orderRouter.post("/update-status/:orderID/:shopID", isAuth, updateStatus);

export default orderRouter;
