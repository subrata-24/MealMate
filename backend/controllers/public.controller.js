import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";

export const allFoods = async (req, res) => {
  try {
    const items = await Item.find({});
    if (!items) {
      return res.status(404).json({ error: "Item is not found" });
    }
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json(`Found error on fetching items ${error}`);
  }
};

export const allShop = async (req, res) => {
  try {
    const shops = await Shop.find({});
    if (!shops) {
      return res.status(404).json({ error: "Shop is not found" });
    }
    return res.status(200).json(shops);
  } catch (error) {
    return res.status(500).json(`Found error on fetching shop ${error}`);
  }
};
