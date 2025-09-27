import Shop from "../models/shop.model";
import uploadOnCloudinary from "../utils/cloudinary";

export const createShop = async (req, res) => {
  try {
    // Extract shop details from request body
    const { name, city, state, address } = req.body;

    let image;
    // If a file was uploaded (handled by Multer), upload it to Cloudinary
    // and store the returned secure URL in the `image` variable
    if (req.file) {
      image = await uploadOnCloudinary(req.file.path);
    }

    // Create a new Shop document in MongoDB
    // - Saves the shop details
    // - Uses `req.userID` (set by authentication middleware) as the owner
    // - Stores the Cloudinary image URL if available
    const shop = await Shop.create({
      name,
      city,
      state,
      address,
      image,
      owner: req.userID,
    });

    //     Mongoose sees that owner is a reference to the User model (ref: "User" in your schema).
    // It uses the stored _id (from req.userID) to query the User collection in MongoDB.
    // It then replaces that _id with the full User document in the returned object.
    await shop.populate("owner");

    return res.status(201).json(shop);
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Found error when creating the shop` });
  }
};
