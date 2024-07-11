const orderModel = require("../../models/order")

const allOrder = async (req, res) => {
    try {
        const all = await orderModel.find().sort({ createdAt: -1 });
        res.json({
            data: all,
            success: true,
            error: false
        })
    } catch (error) {
        res.json({
            message: error,
            success: false,
            error: true
        })
    }
}
module.exports = allOrder