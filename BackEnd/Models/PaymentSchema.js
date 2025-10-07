import mongoose from "mongoose";
const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true },   // Razorpay order id
  paymentId: { type: String },                 // Razorpay payment id (after payment)
  signature: { type: String },                 // razorpay_signature (after payment)
  amount: { type: Number, required: true },    // in paise
  currency: { type: String, default: "INR" },
  status: { type: String, default: "created" }, // created | paid | failed
  receipt: { type: String },
  notes: { type: Object },

  // optional - link to your User (agar tum login system already use kar rahe ho)
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },

  // meta
  createdAt: { type: Date, default: Date.now }
});
const Payment= mongoose.model("Payment", paymentSchema);
export default Payment
