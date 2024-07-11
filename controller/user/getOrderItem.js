const orderModel = require("../../models/order");

const getOrderItem = async (req, res) => {
  try {
    const id=req.body.id
    const data=await orderModel.find({_id:id})
    const dataSend=data[0].items
    const status=data[0].status
    res.json({
      data:dataSend,
      status:status,
      success:true,
      error:false
    })
  } catch (error) {
    res.json({
      message:error.message,
      success:false,
      error:true
    })
  }
}
module.exports = getOrderItem