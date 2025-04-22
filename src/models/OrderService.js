const mongoose = require("mongoose");

const OrderServiceSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  service: { type: String, required: true },
  timeSlot: { type: String, required: true },
  date: { type: Date, required: true },
  address: { type: String, required: true },
  note: { type: String },
  confirmed: { type: Boolean, default: false },
}, { timestamps: true });


const OrderService = mongoose.model("OrderService", OrderServiceSchema);
module.exports = OrderService;