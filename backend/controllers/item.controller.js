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
