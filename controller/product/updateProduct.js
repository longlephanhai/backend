const uploadProductPermission = require("../../helpers/permission")
const productModel = require("../../models/productModel")

async function updateProductController(req, res) {
    try {
        if (!uploadProductPermission(req.userId)) {
            throw new Error("Permission denied")
        }
        const {_id,...resBody}=req.body
        const updateProduct=await productModel.findByIdAndUpdate(_id,resBody)
        res.json({
            message:"Product update successfully",
            data:updateProduct,
            success:true,
            error:false
        }) 
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

module.exports=updateProductController