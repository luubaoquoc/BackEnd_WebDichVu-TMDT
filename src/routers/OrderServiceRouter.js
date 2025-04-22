const express = require("express");
const { createOrderService, getOrders, confirmOrderService, getMyOrders } = require("../controllers/OrderServiceController");
const { authMiddleware, authUserMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/orderservice", createOrderService); // API đặt lịch
router.get("/get-orders-service", getOrders); // API lấy danh sách đặt lịch
router.get("/orderservice/my-orders", authUserMiddleware, getMyOrders);
router.patch("/orderservice/confirm/:id", authMiddleware, confirmOrderService);

module.exports = router;
