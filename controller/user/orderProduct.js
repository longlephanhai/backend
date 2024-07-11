const orderModel = require("../../models/order.js");
const userModel = require("../../models/userModal");
const addToCartModel = require("../../models/cartProduct.js")
const Stripe = require('stripe')

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

//placingg user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = process.env.FRONTEND_URL;
    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await addToCartModel.deleteMany({ userId: req.body.userId });
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "usd",
                product_data: {
                    name: item.productName
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
        line_items.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Delivery Changes"
                },
                unit_amount: 2 * 100
            },
            quantity: 1
        })
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({ success: true, session_url: session.url })
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}
module.exports = placeOrder;
