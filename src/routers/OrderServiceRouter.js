const express = require("express");
const { createOrderService, getOrders } = require("../controllers/OrderServiceController");

const router = express.Router();

router.post("/orderservice", createOrderService); // API đặt lịch
router.get("/orders", getOrders); // API lấy danh sách đặt lịch

module.exports = router;
