const postModel = require("../../models/post");

const getPostById=async(req,res)=>{
    try {
        // console.log("dât",req.body._id);
        const data=await postModel.find({userId:req?.body?._id})
        // console.log("data",data);
        
        res.json({
            data:data,
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
module.exports=getPostById;