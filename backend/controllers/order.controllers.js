import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";

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

    return res.status(200).json(newOrder);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Place order error: ${error.message}` });
  }
};

export const getUserOrdersItem = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userID })
      .sort({ createdAt: -1 })
      .populate("shopOrder.shop", "name")
      .populate("shopOrder.owner", "fullname email mobileNo")
      .populate("shopOrder.shopOrderItems.item", "name image price");
    return res.status(200).json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error to get orders: ${error.message}` });
  }
};

export const getOwnerOrdersItem = async (req, res) => {
  try {
    const orders = await Order.find({ "shopOrder.owner": req.userID })
      .sort({ createdAt: -1 })
      .populate("shopOrder.shop", "name")
      .populate("user")
      .populate("shopOrder.shopOrderItems.item", "name image price");
    return res.status(200).json(orders);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error to get orders: ${error.message}` });
  }
};
