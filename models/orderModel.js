import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "users",
    },
    status: {
      type: String,
      default: "Not Proccedd",
      enum: [
        "Not Proccedd",
        "Processing",
        "Shipped",
        "On the way",
        "Delivered",
        "Canceled",
      ],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
