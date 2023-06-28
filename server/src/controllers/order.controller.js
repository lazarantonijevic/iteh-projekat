const express = require("express");
const Order = require("../models/order.model");

const router = express.Router();


router.post("", async (req, res) => {
    try {
      const { items } = req.body;
  
      
      const orderItems = items.map(item => ({
        itemId: item.itemId,
        itemPrice: item.itemPrice,
        amount: item.amount
      }));
  
      const order = new Order({ items: orderItems });
  
      await order.save();
  
      res.status(201).json({ message: "Order saved successfully" });
    } catch (error) {
      console.error("Error saving order:", error);
      res.status(500).json({ message: "Error saving order" });
    }
});





module.exports = router;