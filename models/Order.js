import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
        name: String,
        image: String,
        quantity: Number,
        price: Number,
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      default: "Cash on Delivery",
    },

    orderStatus: {
      type: String,
      default: "Pending",
    },

    shippingAddress: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Order", orderSchema);