import Item from "../models/item.model";
import Shop from "../models/shop.model";
import uploadOnCloudinary from "../utils/cloudinary";

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

    return res.status(201).json(result);
  } catch (error) {
    return res.status(500).json({ message: `Unable to create item ${error}` });
  }
};
