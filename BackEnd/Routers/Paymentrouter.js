import express from "express";
import Razorpay from "razorpay";
import crypto from "crypto";
import Payment from "../Models/PaymentSchema.js";

// ⚡ Router
const paymentRouter = express.Router();

// ⚡ Razorpay instance (test ya live keys .env se lo)
const rzp = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ==========================
// 1️⃣ Create Order
// ==========================
paymentRouter.post("/create-order", async (req, res) => {
  try {
    const { amountInRupees = 0, notes = {}, userId } = req.body;
    const amount = Math.round(Number(amountInRupees) * 100); // paisa me convert

    console.log(amount);
    const order = await rzp.orders.create({
      amount,
      currency: "INR",
      receipt: `rcpt_${Date.now()}`,
      notes,
    });

    // Save in DB
    const paymentDoc = new Payment({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      status: "created",
      receipt: order.receipt,
      notes,
      userId,
    });
    await paymentDoc.save();

    res.json(order);
  } catch (err) {
    console.error("Order Creation Error:", err);
    res.status(500).json({ error: "order_creation_failed" });
  }
});

// ==========================
// 2️⃣ Verify Payment (after checkout)
// ==========================

paymentRouter.post("/verify", async (req, res) => {
  try {
    console.log(req.body);  

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");

    if (expected === razorpay_signature) {
      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        {
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
          status: "paid",
        }
      );
      return res.json({ success: true });
    } else {
      await Payment.findOneAndUpdate(
        { orderId: razorpay_order_id },
        { status: "failed" }
      );
      return res.status(400).json({ success: false, error: "Invalid signature" });
    }
  } catch (err) {
    console.error("Verify Error:", err);
    res.status(500).json({ success: false });
  }
});


// ==========================
// 3️⃣ Webhook (for auto updates)
// ==========================
paymentRouter.post(
  "/webhook",
  express.raw({ type: "application/json" }), // 👈 raw body for signature verification
  async (req, res) => {
    try {
      const signature = req.headers["x-razorpay-signature"];
      const expected = crypto
        .createHmac("sha256", process.env.WEBHOOK_SECRET)
        .update(req.body)
        .digest("hex");

      if (signature === expected) {
        const event = JSON.parse(req.body.toString());

        if (event.event === "payment.captured") {
          await Payment.findOneAndUpdate(
            { orderId: event.payload.payment.entity.order_id },
            {
              status: "paid",
              paymentId: event.payload.payment.entity.id,
            }
          );
        }

        if (event.event === "payment.failed") {
          await Payment.findOneAndUpdate(
            { orderId: event.payload.payment.entity.order_id },
            { status: "failed" }
          );
        }

        return res.json({ status: "ok" });
      } else {
        return res.status(400).send("Invalid signature");
      }
    } catch (err) {
      console.error("Webhook Error:", err);
      res.status(500).send("Something went wrong");
    }
  }
);

export default paymentRouter;
