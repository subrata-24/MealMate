import mongoose from "mongoose";

const shopOrderItemScema = new mongoose.Schema(
  {
    item: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
    },
    price: Number,
    name: String,
    quantity: Number,
  },
  { timestamps: true }
);

const shopOrderSchema = new mongoose.Schema(
  {
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    subTotal: Number,
    shopOrderItems: [shopOrderItemScema],
    status: {
      type: String,
      enum: ["pending", "preparing", "Out of Delivered", "Delivered"],
      default: "pending",
    },
  },
  { timestamps: true }
);

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    paymentMethod: {
      type: String,
      enum: ["cod", "online"],
      required: true,
    },
    deliveryAddress: {
      text: String,
      latitude: Number,
      longitude: Number,
    },
    totalAmount: {
      type: Number,
    },
    shopOrder: [shopOrderSchema],
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

/*
Example Of this collection:
{
  "user": "64f1c23a1d23b",
  "paymentMethod": "cod",
  "deliveryAddress": {
    "text": "House 10, Dhaka",
    "latitude": 23.8103,
    "longitude": 90.4125
  },
  "totalAmount": 920,
  "shopOrder": [
    {
      "shop": "64f1c34bc7f12",
      "owner": "64f1c67ad8f45",
      "subTotal": 720,
      "shopOrderItems": [
        { "item": "64f1c9c8e43f2", "price": 300, "quantity": 2 },
        { "item": "64f1c9d0e43f5", "price": 120, "quantity": 1 }
      ]
    },
    {
      "shop": "64f1c51ad934e",
      "owner": "64f1c98dd1b23",
      "subTotal": 200,
      "shopOrderItems": [
        { "item": "64f1c9e3e43f8", "price": 200, "quantity": 1 }
      ]
    }
  ]
}
*/
