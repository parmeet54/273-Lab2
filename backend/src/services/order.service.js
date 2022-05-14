const OrderModel = require("../models/order.model");

// Create Order
exports.createOrder = async (orderReqData, result) => {
  const order_ID = orderReqData.order_ID;
  const username = orderReqData.username;
  const items = orderReqData.items;
  const date_purc = orderReqData.date_purc;
  const total = orderReqData.total;

  try {
    await OrderModel.create({ order_ID, username, items, date_purc, total });

    result(null, { status: true, message: "Order Created" });
  } catch (err) {
    result(null, { status: false, message: "Order exists" }, err);
  }
};

// Get All Orders
exports.getAllOrders = async (result) => {
  try {
    const orders = await OrderModel.find();
    result(null, orders);
  } catch (err) {
    result(err);
  }
};

// Get Order By Username
exports.getOrdersByUsername = async (username, result) => {
  try {
    const orders = await OrderModel.find({ username: username });

    result(null, orders);
  } catch (err) {
    result(null, err);
  }
};
