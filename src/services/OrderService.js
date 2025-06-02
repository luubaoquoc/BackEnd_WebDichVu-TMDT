const Order = require("../models/OrderModel");

exports.createOrder = async (userId, data) => {
    const {
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    } = data;

    if (!orderItems || orderItems.length === 0) {
        throw new Error("Không có sản phẩm trong đơn hàng.");
    }

    const order = new Order({
        orderItems,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
        user: userId,
    });

    return await order.save();
};

exports.getOrdersByUser = async (userId) => {
    return await Order.find({ user: userId }).sort({ createdAt: -1 });
};

exports.getAllOrders = async () => {
    return await Order.find()
        .populate("user", "name email")
        .sort({ createdAt: -1 });
};
