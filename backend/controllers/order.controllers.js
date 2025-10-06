import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";
import User from "../models/user.model.js";

export const placeOrder = async (req, res) => {
  try {
    const { cartItems, deliveryAddress, paymentMethod, totalAmount } = req.body;

    if (!cartItems || cartItems.length === 0) {
      return res.status(400).json({ message: "No items found in cart" });
    }

    if (
      !deliveryAddress?.text ||
      !deliveryAddress?.latitude ||
      !deliveryAddress?.longitude
    ) {
      return res.status(400).json({ message: "Give complete address" });
    }

    const groupItemsByShop = {};

    cartItems.forEach((item) => {
      const shopId = item.shop;
      if (!groupItemsByShop[shopId]) {
        groupItemsByShop[shopId] = [];
      }
      groupItemsByShop[shopId].push(item);
    });

    const shopOrder = await Promise.all(
      Object.keys(groupItemsByShop).map(async (shopId) => {
        const shop = await Shop.findById(shopId).populate("owner");
        if (!shop) {
          return res
            .status(400)
            .json({ message: "Shop is not found by this ID" });
        }

        const items = groupItemsByShop[shopId];
        const subTotal = items.reduce(
          (sum, i) => sum + Number(i.price) * Number(i.quantity),
          0
        );

        return {
          shop: shop._id,
          owner: shop.owner._id,
          subTotal,
          shopOrderItems: items.map((i) => ({
            item: i.id,
            price: i.price,
            quantity: i.quantity,
            name: i.name,
          })),
        };
      })
    );

    const newOrder = {
      user: req.userID,
      paymentMethod,
      deliveryAddress,
      totalAmount,
      shopOrder,
    };

    const savedOrder = await Order.create(newOrder);
    await savedOrder.populate(
      "shopOrder.shopOrderItems.item",
      "name image price"
    );

    await savedOrder.populate("shopOrder.shop", "name");

    return res.status(200).json(savedOrder);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Place order error: ${error.message}` });
  }
};

export const getMyOrders = async (req, res) => {
  try {
    const user = await User.findById(req.userID);
    if (user.role == "user") {
      const orders = await Order.find({ user: req.userID })
        .sort({ createdAt: -1 })
        .populate("shopOrder.shop", "name")
        .populate("shopOrder.owner", "fullname email mobileNo")
        .populate("shopOrder.shopOrderItems.item", "name image price");
      return res.status(200).json(orders);
    } else if (user.role == "owner") {
      const orders = await Order.find({ "shopOrder.owner": req.userID })
        .sort({ createdAt: -1 })
        .populate("shopOrder.shop", "name")
        .populate("user")
        .populate("shopOrder.shopOrderItems.item", "name image price");
      const filteredOrder = orders.map((order) => ({
        _id: order._id,
        user: order.user,
        paymentMethod: order.paymentMethod,
        deliveryAddress: order.deliveryAddress,
        createdAt: order.createdAt,
        shopOrder: order.shopOrder.find((o) => o.owner._id == req.userID),
      }));

      return res.status(200).json(filteredOrder);
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error to get orders: ${error.message}` });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { shopID, orderID } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderID);
    const shopOrders = order.shopOrder.find((o) => o.shop == shopID);

    if (!shopOrders) {
      return res.status(400).json({ message: "Shop order not found" });
    }

    shopOrders.status = status;
    await order.save();
    await shopOrders.populate("shopOrderItems.item", "name image price");

    return res.status(200).json(shopOrders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error to update status of order: ${error.message}` });
  }
};
