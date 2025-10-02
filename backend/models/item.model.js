import mongoose from "mongoose";

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
      required: true,
    },
    category: {
      type: String,
      enum: [
        "Snacks",
        "Hilsa Curry",
        "Kacchi Biryani",
        "Bhuna Khichuri",
        "Beef Rezala",
        "Shutki Maach",
        "Chingri Malai Curry",
        "Fuchka",
        "Chotpoti",
        "Beguni",
        "Piyaju",
        "Morog Polao",
        "Patla Khichuri",
        "Misti Doi",
        "Rasgulla",
        "Chomchom",
        "Main Course",
        "Desserts",
        "Pizza",
        "Burgers",
        "Sandwitches",
        "Others",
      ],
      required: true,
    },
    price: {
      type: Number,
      min: 0,
      required: true,
    },
    foodType: {
      type: String,
      enum: ["Veg", "Non veg"],
      required: true,
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", itemSchema);
export default Item;
