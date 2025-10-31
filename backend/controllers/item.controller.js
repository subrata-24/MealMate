import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const createItem = async (req, res) => {
  try {
    const { name, category, price, foodType } = req.body;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const shop = await Shop.findOne({ owner: req.userID });
    if (!shop) {
      return res.status(400).json({ message: "Shop not found" });
    }

    const result = await Item.create({
      name,
      category,
      price,
      foodType,
      image,
      shop: shop._id,
    });

    shop.items.push(result._id);
    await shop.save();
    await shop.populate([
      { path: "owner" },
      { path: "items", options: { sort: { updatedAt: -1 } } },
    ]);

    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `Unable to create item: ${error}` });
  }
};

export const editItem = async (req, res) => {
  try {
    // console.log("Edit Item Called");
    const { name, category, price, foodType } = req.body;
    const itemID = req.params.itemID;
    let image;
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    const item = await Item.findByIdAndUpdate(
      itemID,
      {
        name,
        category,
        price,
        foodType,
        image,
      },
      { new: true }
    );

    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    const shop = await Shop.findOne({ owner: req.userID }).populate({
      path: "items",
      options: { sort: { updatedAt: -1 } },
    });
    return res.status(200).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `Unable to update item: ${error}` });
  }
};

export const getItemById = async (req, res) => {
  try {
    // console.log("getItemById called!");
    const itemID = req.params.itemID;
    const item = await Item.findById(itemID);
    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: `Unable to get item: ${error}` });
  }
};

export const deleteItem = async (req, res) => {
  try {
    const itemID = req.params.itemID;
    const item = await Item.findByIdAndDelete(itemID);
    if (!item) {
      return res.status(400).json({ message: "Item not found" });
    }

    const shop = await Shop.findOne({ owner: req.userID });
    shop.items = shop.items.filter((i) => i != item._id);
    await shop.save();
    await shop.populate({
      path: "items",
      options: { sort: { updatedAt: -1 } },
    });
    return res.status(200).json(shop);
  } catch (error) {
    return res.status(500).json({ message: `Unable to delete item: ${error}` });
  }
};

export const getItemByCity = async (req, res) => {
  try {
    const { city } = req.params;
    if (!city) {
      return res.status(400).json({ message: "City is required" });
    }

    const shop = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    }).populate("items");

    if (!shop) {
      return res.status(400).json({ message: "Shop not found" });
    }

    const shopIds = shop.map((shop) => shop._id);
    const items = await Item.find({ shop: { $in: shopIds } });
    return res.status(200).json(items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Unable to get item by city: ${error}` });
  }
};

export const getItemByShop = async (req, res) => {
  try {
    const { shopId } = req.params;
    const shop = await Shop.findById(shopId).populate("items");
    if (!shop) {
      return res.status(400).json({ message: "Shop not found" });
    }

    return res.status(200).json({
      shop,
      items: shop.items,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Unable to get item by shop: ${error}` });
  }
};

export const searchItem = async (req, res) => {
  try {
    const { name, city } = req.query;

    if (!name || !city) {
      return null;
    }

    const shops = await Shop.find({
      city: { $regex: new RegExp(`^${city}$`, "i") },
    }).populate("items");

    if (!shops) {
      return res.status(400).json({ message: "Shop not found" });
    }

    const shopIds = shops.map((shop) => shop._id);

    // $or: MongoDB operator that matches if ANY condition is true
    // $regex: name: Partial match (if name="piz", matches "pizza", "pizzeria")
    // options: "i": Case-insensitive search
    // Searches in BOTH name and category fields

    const items = await Item.find({
      shop: { $in: shopIds },
      $or: [
        { name: { $regex: name, $options: "i" } },
        { category: { $regex: name, $options: "i" } },
      ],
    }).populate("shop", "name image");

    return res.status(200).json(items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Unable to get item by name: ${error}` });
  }
};
