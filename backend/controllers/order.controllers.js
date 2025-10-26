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
        .populate("shopOrder.shopOrderItems.item", "name image price")
        .populate("shopOrder.assignedDeliveryBoy", "fullname mobileNo");
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

    const updatedShopOrder = order.shopOrder.find((o) => o.shop == shopID);

    await order.populate("shopOrder.shop", "name");
    await order.populate(
      "shopOrder.assignedDeliveryBoy",
      "fullname email mobileNo"
    );

    return res.status(200).json({
      shopOrder: updatedShopOrder,
      assignedDeliveryBoy: updatedShopOrder?.assignedDeliveryBoy,
      availableBoys: deliveryBoyPayload,
      assignment: updatedShopOrder?.assignment?._id,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error to update status of order: ${error.message}` });
  }
};

export const getDeliveryAssignment = async (req, res) => {
  try {
    const deliveryBoyId = req.userID;
    const assignments = await DeliveryAssignment.find({
      broadcastTo: deliveryBoyId,
      status: "broadcasted",
    })
      .populate("order")
      .populate("shop");

    const formated = assignments.map((a) => ({
      assignmentID: a._id,
      orderID: a.order._id,
      shopName: a.shop.name,
      deliveryAddress: a.order.deliveryAddress,
      items:
        a.order.shopOrder.find((so) => so._id.equals(a.shopOrderId))
          .shopOrderItems || [],
      subTotal: a.order.shopOrder.find((so) => so._id.equals(a.shopOrderId))
        ?.subTotal,
    }));

    return res.status(200).json(formated);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error to get the assignment: ${error.message}` });
  }
};

export const acceptOrder = async (req, res) => {
  try {
    const { assignmentId } = req.params;
    const assignment = await DeliveryAssignment.findById(assignmentId);
    if (!assignment) {
      return res.status(400).json({ message: "Assignment not found" });
    }
    if (assignment.status != "broadcasted") {
      return res.status(400).json({ message: "Assignment is expired" });
    }

    const alreadyAssigned = await DeliveryAssignment.findOne({
      assignedTo: req.userID,
      status: { $nin: ["broadcasted", "completed"] },
    });

    if (alreadyAssigned) {
      return res
        .status(400)
        .json({ message: "You are already busy with another order" });
    }

    assignment.assignedTo = req.userID;
    assignment.status = "assigned";
    assignment.acceptedAt = new Date();
    await assignment.save();

    const order = await Order.findById(assignment.order);
    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    const shopOrders = order.shopOrder.id(assignment.shopOrderId);

    shopOrders.assignedDeliveryBoy = req.userID;
    await order.save();

    return res.status(200).json({ message: "Order accepted" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error to accept order: ${error.message}` });
  }
};

export const getCurrentOrder = async (req, res) => {
  try {
    const assignment = await DeliveryAssignment.findOne({
      assignedTo: req.userID,
      status: "assigned",
    })
      .populate("shop", "name")
      .populate("assignedTo", "fullname email location mobileNo")
      .populate({
        path: "order",
        populate: [
          { path: "user", select: "fullname email location mobileNo" },
        ],
      });

    if (!assignment) {
      return res.status(400).json({ message: "Assignment not found" });
    }
    if (!assignment.order) {
      return res.status(400).json({ message: "Order not found" });
    }

    const shopOrders = assignment.order.shopOrder.find(
      (so) => String(so._id) === String(assignment.shopOrderId)
    );

    if (!shopOrders) {
      return res.status(400).json({ message: "Shop order not found" });
    }

    let deliveryBoyLocation = { lat: null, lon: null };
    if (assignment.assignedTo.location?.coordinates?.length === 2) {
      deliveryBoyLocation.lat = assignment.assignedTo.location.coordinates[1];
      deliveryBoyLocation.lon = assignment.assignedTo.location.coordinates[0];
    }

    let customerLocation = { lat: null, lon: null };
    if (assignment.order.deliveryAddress) {
      customerLocation.lat = assignment.order.deliveryAddress.latitude;
      customerLocation.lon = assignment.order.deliveryAddress.longitude;
    }

    return res.status(200).json({
      _id: assignment.order._id,
      shopName: assignment.shop.name,
      user: assignment.order.user,
      shopOrders,
      deliveryAddress: assignment.order.deliveryAddress,
      deliveryBoyLocation,
      customerLocation,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error to get current order: ${error.message}` });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findById(orderId)
      .populate("user")
      .populate("shopOrder.shop")
      .populate("shopOrder.assignedDeliveryBoy")
      .populate("shopOrder.shopOrderItems.item")
      .lean();

    if (!order) {
      return res.status(400).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error to get order by Id: ${error.message}` });
  }
};

/*After populate getCurrentOrder
{
  _id: "64fj23...",
  shop: { _id: "648a1...", name: "Coffee House" },
  assignedTo: {
    _id: "64f2dd...",
    fullname: "Rahim Delivery",
    email: "rahim@mail.com",
    mobileNo: "01712345678",
    location: { type: "Point", coordinates: [90.4125, 23.8103] }
  },
  order: {
    _id: "64abc123",
    user: {
      _id: "62user123",
      fullname: "John Buyer",
      email: "john@mail.com",
      mobileNo: "018998877",
      location: { ... }
    },
    // other order fields...
  }
}
*/
