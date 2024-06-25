const orderModel = require("../../models/order.js");
const userModel = require("../../models/userModal");
const Stripe = require('stripe')


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({ userId: req.body.userId });
        res.json({ success: true, data: orders })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
module.exports = userOrders