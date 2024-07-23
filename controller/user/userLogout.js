async function userLogout(req, res) {
    try {
        res.clearCookie("token",{
            httpOnly: true,
            sameSite: 'None',
            secure: process.env.NODE_ENV === 'production',
          })
        res.json({
            message: "Logged out successfully",
            error: false,
            success: true,
            data: []
        })
    } catch (error) {
        res.json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}

module.exports = userLogout