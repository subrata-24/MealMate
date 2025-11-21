import Item from "../models/item.model";

export const allFoods = async (req, res) => {
  try {
    const items = await Item.find({});
    if (!items) {
      return res.status(400).json({ error: "Item is not found" });
    }
    return res.status(200).json(items);
  } catch (error) {
    return res.status(500).json(`Found error on fetching data ${error}`);
  }
};
