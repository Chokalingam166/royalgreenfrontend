const express = require("express");
const Razorpay = require("razorpay");

const router = express.Router();

router.post("/razorpay/order", async (req, res) => {
  try {
    const { amount } = req.body;
    const amountNumber = Number(amount);

    if (!amountNumber || amountNumber <= 0) {
      return res.status(400).json({ msg: "Valid amount is required" });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(500).json({ msg: "Razorpay keys are not configured" });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const order = await razorpay.orders.create({
      amount: Math.round(amountNumber * 100),
      currency: "INR",
      receipt: `royal_green_${Date.now()}`
    });

    res.json({
      key: process.env.RAZORPAY_KEY_ID,
      order
    });
  } catch (err) {
    res.status(500).json({ msg: "Unable to create Razorpay order" });
  }
});

module.exports = router;
