import Order from "../models/Order.js";

// Create Order
export const createOrder = async (req, res) => {
  try {
    console.log("Create Order API Called");
    console.log("User:", req.user);
    console.log("Body:", req.body);

    const {
      items,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({
        message: "No order items provided",
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      totalPrice,
    });

    res.status(201).json({
      success: true,
      message: "Order Created Successfully",
      order,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Orders
export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .populate("items.productId");

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};