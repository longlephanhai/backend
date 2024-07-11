const Review = require('../../models/review');

const getReviewProduct = async (req, res) => {
    try {
        const productId = req.body.productId;
        const product = await Review.find({ productId }).populate('userId', 'name');
        if (!product) {
            return res.status(404).json({
                message: 'Không tìm thấy đánh giá cho sản phẩm này',
                success: false,
                error: true
            });
        }
        res.json({
            data: product,
            message: "OK",
            success: true,
            error: false
        });
    } catch (error) {
        console.error('Lỗi khi lấy đánh giá sản phẩm:', error);
        res.status(500).json({ message: 'Không thể lấy đánh giá sản phẩm' });
    }
};

module.exports = getReviewProduct;
