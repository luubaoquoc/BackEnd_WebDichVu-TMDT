const OrderService = require("../models/OrderService");

// Đặt lịch mới
exports.createOrderService = async (req, res) => {
    try {
        console.log("Dữ liệu nhận được:", req.body);
    
        const { name, phone, service, timeSlot, date, address, note } = req.body;
    
        if (!name || !phone || !service || !timeSlot || !date || !address) {
            return res.status(400).json({ message: "Vui lòng điền đầy đủ thông tin!" });
        }
    
        const formattedDate = new Date(date);
        if (isNaN(formattedDate.getTime())) {
            return res.status(400).json({ message: "Ngày không hợp lệ!" });
        }
    
        console.log("Formatted date:", formattedDate);
    
        const newOrder = new OrderService({
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
