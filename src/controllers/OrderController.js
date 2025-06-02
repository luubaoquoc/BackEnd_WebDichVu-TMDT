const orderService = require("../services/OrderService");

exports.createOrder = async (req, res) => {
    try {
        const order = await orderService.createOrder(req.user._id, req.body);
        res.status(201).json({ status: "success", data: order });
    } catch (err) {
        res.status(400).json({ status: "error", message: err.message });
    }
};

exports.getMyOrders = async (req, res) => {
    try {
        const orders = await orderService.getOrdersByUser(req.user._id);
        res.status(200).json({ status: "success", data: orders });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json({ status: "success", data: orders });
    } catch (err) {
        res.status(500).json({ status: "error", message: err.message });
    }
};
