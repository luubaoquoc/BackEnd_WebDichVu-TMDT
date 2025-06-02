const express = require("express");
const router = express.Router();
const OrderController = require("../controllers/OrderController");
const { authUserMiddleware, authMiddleware } = require("../middleware/authMiddleware");

// Tạo đơn hàng
router.post("/create", authUserMiddleware, OrderController.createOrder);

// Lấy đơn hàng của user hiện tại
router.get("/my-orders", authUserMiddleware, OrderController.getMyOrders);

// Admin: lấy tất cả đơn hàng
router.get("/all", authMiddleware, OrderController.getAllOrders);

module.exports = router;