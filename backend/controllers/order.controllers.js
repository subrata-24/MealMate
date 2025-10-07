import DeliveryAssignment from "../models/deliveryAssignment.model.js";
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
    const { orderID, shopID } = req.params;
    const { status } = req.body;
    const order = await Order.findById(orderID);
    const shopOrders = order.shopOrder.find((o) => o.shop == shopID);

    if (!shopOrders) {
      return res.status(400).json({ message: "Shop order not found" });
    }

    shopOrders.status = status;
    let deliveryBoyPayload = [];
    if (status == "Out of Delivery" || !shopOrders.assignment) {
      const { longitude, latitude } = order.deliveryAddress;
      const nearByDeliveryBoys = await User.find({
        role: "deliveryBoy",
        location: {
          $near: {
            $geometry: {
              type: "Point",
              coordinates: [Number(longitude), Number(latitude)],
            },
            $maxDistance: 5000,
          },
        },
      });

      const nearByIds = nearByDeliveryBoys.map((b) => b._id);
      const busyIds = await DeliveryAssignment.find({
        assignedTo: { $in: nearByIds },
        status: { $nin: ["broadcasted", "completed"] },
      }).distinct("assignedTo");

      const busyIdSet = new Set(busyIds.map((id) => String(id)));
      const availableBoys = nearByDeliveryBoys.filter(
        (b) => !busyIdSet.has(String(b._id))
      );

      const candidates = availableBoys.map((b) => b._id);

      if (candidates.length == 0) {
        await order.save();
        return res.json({
          message: "Order status updated but there is no available boys",
        });
      }
      const deliveryAssignment = await DeliveryAssignment.create({
        order: order._id,
        shop: shopOrders.shop,
        shopOrderId: shopOrders._id,
        broadcastTo: candidates,
        status: "broadcasted",
      });

      shopOrders.assignment = deliveryAssignment._id;
      shopOrders.assignedDeliveryBoy = deliveryAssignment.assignedTo;

      deliveryBoyPayload = availableBoys.map((b) => ({
        id: b._id,
        fullname: b.fullname,
        longitude: b.location.coordinates?.[0],
        latitude: b.location.coordinates?.[1],
        mobileNo: b.mobileNo,
      }));
    }

    await order.save();

    await order.populate("shopOrder.shop", "name");
    await order.populate(
      "shopOrder.assignedDeliveryBoy",
      "fullname email mobileNo"
    );

    const updatedShopOrder = order.shopOrder.find((o) => o.shop == shopID);
    // await shopOrders.populate("shopOrderItems.item", "name image price");

    return res.status(200).json({
      shopOrder: updatedShopOrder,
      assignedDeliveryBoy: updatedShopOrder.assignedDeliveryBoy,
      availableBoys: deliveryBoyPayload,
      assignment: updatedShopOrder.assignment._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error to update status of order: ${error.message}` });
  }
};
