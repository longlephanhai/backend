const nodemailer = require('nodemailer');
const sendEmail = async (req, res) => {
  const { email, orderData } = req.body;
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS_EMAIL 
    }
  });

  const createEmailContent = (order) => {
    let itemsContent = '';
    for (let item of order.items) {
      itemsContent += `
        <p><strong>Product:</strong> ${item.productName}</p>
        <p><strong>Quantity:</strong> ${item.quantity}</p>
        <p><strong>Price:</strong> $${item.price}</p>
        <p><img src="${item.image}" alt="${item.productName}" width="100" /></p>
        <hr>
      `;
    }

    return `
      <h1>Order confirmation</h1>
      <p>Hi ${order.address.firstName} ${order.address.lastName},</p>
      <p>Thank you for your order. Below is your order information:</p>
      <h2>Delivery address</h2>
      <p><strong>Address:</strong> ${order.address.street}</p>
      <p><strong>City:</strong> ${order.address.city}</p>
      <p><strong>District:</strong> ${order.address.state}</p>
      <p><strong>Zip code:</strong> ${order.address.zipcode}</p>
      <p><strong>Country:</strong> ${order.address.country}</p>
      <p><strong>Phone number:</strong> ${order.address.phone}</p>
      <h2>Product</h2>
      ${itemsContent}
      <h2>Total: $${order.amount}</h2>
    `;
  };

  const emailContent = createEmailContent(orderData);

  const mailOptions = {
    from: process.env.MAIL,
    to: email,
    subject: 'Order Confirmation',
    html: emailContent
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent to ' + email + ': ' + info.response);
    res.status(200).json({
      success: true,
      message: 'Email sent successfully'
    });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to send email'
    });
  }
};

module.exports = sendEmail;
