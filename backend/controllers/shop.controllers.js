import Shop from "../models/shop.model.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

export const createAndEditShop = async (req, res) => {
  try {
    // Extract shop details from request body
    const { name, city, state, address } = req.body;

    let image;
    // If a file was uploaded (handled by Multer), upload it to Cloudinary
    // and store the returned secure URL in the `image` variable
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    let shop = await Shop.findOne({ owner: req.userID });
    if (!shop) {
      // Create a new Shop document in MongoDB
      // - Saves the shop details
      // - Uses `req.userID` (set by authentication middleware) as the owner
      // - Stores the Cloudinary image URL if available
      shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.userID,
      });
    } else {
      shop = await Shop.findByIdAndUpdate(
        shop._id,
        {
          name,
          city,
          state,
          address,
          image,
          owner: req.userID,
        },
        { new: true }
      );
    }

    //     Mongoose sees that owner is a reference to the User model (ref: "User" in your schema).
    // It uses the stored _id (from req.userID) to query the User collection in MongoDB.
    // It then replaces that _id with the full User document in the returned object.
    await shop.populate("owner");

    return res.status(201).json(shop);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Found error when creating the shop: ${error}` });
  }
};

export const getShop = async (req, res) => {
  try {
    // Using populate() will replace the "owner" and "items" ObjectIDs(which are just references in the schema) with their full documents.
    // This means:
    // - Instead of only returning the owner's ID, we get the full owner details.
    // - Instead of only returning an array of item IDs, we get the complete info for every item that belongs to the shop.
    // In short, populate() enriches the shop document with full related data
    // so the frontend can directly use it without making extra queries.

    const shop = await Shop.findOne({ owner: req.userID }).populate(
      "owner items"
    );
    if (!shop) {
      return null;
    }

    return res.status(200).json(shop);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Found error when get shop: ${error}` });
  }
};
