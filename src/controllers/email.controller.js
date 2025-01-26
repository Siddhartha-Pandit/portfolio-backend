import asyncHandler from "../utils/asyncHandler.js";
import { sendEmail } from "../utils/mailer.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const contactRecieveMail = asyncHandler(async (req, res) => {
  const { name, email: clientEmail, message } = req.body;

  // Plain text version of the email
  const text = `Name: ${name}\nEmail: ${clientEmail}\nMessage: ${message}`;

  // HTML version of the email
  const html = `
   Dear ${name},<br>

We successfully received your message: "${message}" from the email address ${clientEmail}. We will respond to you soon.

Please note that this is an automated message, and replies will not be monitored.<br>

Yours faithfully,  <br>
Siddhartha Pandit
  `;

  console.log(html);

  try {
    // Send email to yourself (website owner) from the client's email
    const recieveMail = await sendEmail(
      process.env.SMTP_USER, 
      clientEmail, 
      "Mail recieved successfully", // Subject
      text, // Plain text version
      html // HTML version
    );

    if (recieveMail) {
      res.status(200).json(new ApiResponse(200, null, "Mail sent successfully!"));
    } else {
      res.status(500).json(new ApiError(500, "Could not send the mail."));
    }
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json(new ApiError(500, "An error occurred while sending the mail."));
  }
});

export { contactRecieveMail };