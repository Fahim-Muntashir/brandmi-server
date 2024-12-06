import { config } from "../config";

const otpEmail = (receiver: string, otpCode: number) => ({
    from: config.EMAIL_USER,
    to: receiver,
    subject: "Your One-Time Password (OTP) for Email Verification", // Subject line
    text: `Hello, 
   Thank you for choosing BrandMi. Your One-Time Password (OTP) for email verification is: ${otpCode}
   Please use this code to complete your verification process. If you did not request this, please ignore this email.

   Best regards,
   BrandMi Support Team
    `,
    html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
            <h2 style="color: #4CAF50;">Email Verification</h2>
            <p>Hi there,</p>
            <p>Thank you for choosing <strong>BrandMi</strong>. Please use the following One-Time Password (OTP) to verify your email address:</p>
            <div style="text-align: center; margin: 20px 0;">
                <span style="font-size: 24px; font-weight: bold; padding: 10px; background-color: #f8f8f8; border: 1px solid #ddd; display: inline-block;">
                    ${otpCode}
                </span>
            </div>
            <p>This OTP is valid for the next 10 minutes. If you did not request this, please disregard this email.</p>
            <br>
            <p>Best regards,</p>
            <p><strong>BrandMi Support Team</strong></p>
            <hr>
            <p style="font-size: 12px; color: #666;">If you have any questions or need assistance, please contact our support team.</p>
        </div>
    `,
});

export default otpEmail;
