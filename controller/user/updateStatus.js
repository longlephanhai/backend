const orderModel = require("../../models/order.js");
const userModel = require("../../models/userModal");
const Stripe = require('stripe')


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, { status: req.body.status });
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
module.exports = updateStatus