const orderModel = require("../../models/order");

const sendOrderItem = async (req, res) => {
    try {
        const { item, _id } = req.body;
        const data=await orderModel.findOne({_id:_id})
        const itemData=data.items
        res.json({
            message:"success",
            data:itemData,
            success: true,
            error: false
        })
    } catch (error) {
        res.json({
            message: error.message,
            success: false,
            error: true
        })
    }
}
module.exports = sendOrderItem