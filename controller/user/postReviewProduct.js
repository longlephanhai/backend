const Review = require("../../models/review");

const postReviewProduct = async (req, res) => {
    try {
        const userId = req?.userId
        const productId = req.body.productId.id
        const rating = req.body.rating
        const comment = req.body.comment
        const newReview = new Review({ productId, userId, rating, comment });
        await newReview.save();
        res.status(201).json({
            data: newReview,
            success: true,
            error: false
        })
    } catch (error) {
        console.log(error);
        res.json({
            message: error,
            success: false,
            error: true
        })
    }
}
module.exports = postReviewProduct