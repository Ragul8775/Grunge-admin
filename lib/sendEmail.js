import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendMail = async (to, subject, order) => {
  const itemsHtml = order.products
    .map(
      (product) => `
    <tr>
      <td>${product.title} (${product.size})</td>
      <td>${product.quantity}</td>
      <td>₹${product.price.toFixed(2)}</td>
    </tr>
  `
    )
    .join("");

  const emailHtml = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <div style="background-color: #1a120b; color: #fff; padding: 10px;">
        <h1 style="margin: 0; text-align: center;">GRUNGE</h1>
      </div>
      <div style="padding: 20px;">
        <h2 style="text-align: center;">THANK YOU FOR SHOPPING WITH US</h2>
        <h3 style="text-align: center;">Sales Receipt</h3>
        <p style="text-align: center;">${new Date(
          order.deliveryDate
        ).toLocaleDateString()} ${new Date(
    order.deliveryDate
  ).toLocaleTimeString()}</p>
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <thead>
            <tr>
              <th style="border-bottom: 2px solid #ccc; padding: 10px; text-align: left;">ITEM</th>
              <th style="border-bottom: 2px solid #ccc; padding: 10px; text-align: left;">QTY</th>
              <th style="border-bottom: 2px solid #ccc; padding: 10px; text-align: left;">PRICE</th>
            </tr>
          </thead>
          <tbody>
            ${itemsHtml}
          </tbody>
        </table>
        <p style="text-align: center; margin-top: 20px;">
          Want to check out all our products? We now offer free shipping!
        </p>
        <div style="text-align: center; margin-top: 10px;">
          <a href="https://yourshop.com" style="background-color: #1a120b; color: #fff; padding: 10px 20px; text-decoration: none;">Shop Online</a>
        </div>
      </div>
    </div>
  `;

  const msg = {
    to,
    from: process.env.EMAIL_FROM, // Use the email address or domain you verified with SendGrid
    subject,
    html: emailHtml,
  };

  try {
    const response = await sgMail.send(msg);
    console.log("Email sent successfully", response);
  } catch (error) {
    console.error("Error sending email:", error.response.body.errors);
  }
};
