const locationMap = async (req, res) => {
  try {
    const { address } = req.body
    const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${address}&format=json`);
    const data = await response.json();       
    res.json({
      data,
      success: true,
      error: false
    });
  } catch (error) {
    res.json({
      message: error.message,
      success: false,
      error: true
    })
  }
}
module.exports = locationMap