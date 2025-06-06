const OrderService = require("../models/OrderService");
const mongoose = require('mongoose');


// Đặt lịch mới
exports.createOrderService = async (req, res) => {
  try {
    const { name, phone, service, timeSlot, date, address, note } = req.body;

    if (!name || !phone || !service || !timeSlot || !date || !address) {
      return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
    }

    const formattedDate = new Date(date);
    if (isNaN(formattedDate.getTime())) {
      return res.status(400).json({ message: "Ngày không hợp lệ!" });
    }

    // Kiểm tra trùng khung giờ, ngày, dịch vụ
    const start = new Date(formattedDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(formattedDate);
    end.setHours(23, 59, 59, 999);

    const existedOrder = await OrderService.findOne({
      service,
      timeSlot,
      date: { $gte: start, $lte: end }
    });

    if (existedOrder) {
      return res.status(409).json({ message: "Khung giờ này đã được đặt cho dịch vụ này trong ngày này!" });
    }

    const newOrder = new OrderService({
      userId: new mongoose.Types.ObjectId(req.user?.id),
      name,
      phone,
      service,
      timeSlot,
      date: formattedDate,
      address,
      note,
    });

    await newOrder.save();
    res.status(201).json({ message: "Đặt lịch thành công!", order: newOrder });

  } catch (error) {
    console.error("Lỗi khi đặt lịch:", error.message);
    res.status(500).json({ message: "Lỗi server khi đặt lịch", error: error.message });
  }
};


// Lấy danh sách đặt lịch (tuỳ chọn)
exports.getOrders = async (req, res) => {
  try {
    const orders = await OrderService.find();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Lỗi lấy danh sách đặt lịch", error });
  }
};

exports.confirmOrderService = async (req, res) => {
  try {
    const orderId = req.params.id;
    const updatedOrder = await OrderService.findByIdAndUpdate(
      orderId,
      { confirmed: true },
      { new: true }
    );
    res.status(200).json({ status: "success", data: updatedOrder });
  } catch (error) {
    res.status(500).json({ status: "error", message: "Lỗi xác nhận đơn", error });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        status: "error",
        message: "User ID không hợp lệ",
      });
    }

    const orders = await OrderService.find({ userId });

    res.status(200).json({ status: "success", data: orders });
  } catch (error) {
    console.error("Lỗi tại getMyOrders:", error);
    res.status(500).json({ status: "error", message: "Lỗi server", error: error.message });
  }
};

exports.getBookedTimeSlots = async (req, res) => {
  try {
    const { date, service } = req.query;
    if (!date || !service) {
      return res.status(400).json({ message: "Missing date or service parameter" });
    }
    // Chuyển date về đầu ngày và cuối ngày để so sánh
    const start = new Date(date);
    start.setHours(0, 0, 0, 0);
    const end = new Date(date);
    end.setHours(23, 59, 59, 999);

    const orders = await OrderService.find({
      date: { $gte: start, $lte: end },
      service: service
    }).select("timeSlot -_id");

    const bookedTimeSlots = orders.map(order => order.timeSlot);
    res.json({ bookedTimeSlots });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.cancelOrderService = async (req, res) => {
  try {
    const order = await OrderService.findOne({
      _id: new mongoose.Types.ObjectId(req.params.id),
      userId: new mongoose.Types.ObjectId(req.user._id), // Đúng trường userId
      confirmed: false
    });
    console.log("Order found:", order);
    console.log("User ID:", req.user._id);
    console.log("Order ID:", req.params.id);
    console.log("Order confirmed:", order?.confirmed);
    if (!order) {
      return res.status(404).json({ status: "fail", message: "Không tìm thấy đơn hoặc đã xác nhận!" });
    }
    await order.deleteOne();
    res.json({ status: "success", message: "Đã hủy đơn thành công!" });
  } catch (error) {
    console.error("Cancel order error:", error);
    res.status(500).json({ status: "fail", message: "Lỗi server!" });
  }
};