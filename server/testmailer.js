const nodemailer = require("nodemailer");

(async () => {
    // Create a transporter
    const transporter = nodemailer.createTransport({
        service: "gmail", // or another email service (e.g., Yahoo, Outlook)
        auth: {
            user: "naima261914@gmail.com", // Replace with your email
            pass: "crej lbkv xjee wdlx",      // Replace with your password or app password
        },
    });

    // Email options
    const mailOptions = {
        from: "naima261914@gmail.com", // Sender's email address
        to: "naimanoor665@gmail.com", // Replace with recipient email
        subject: "Test Email from NodeMailer",
        text: "Hello! this is test email.", // Plain text content
    };

    try {
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent successfully:", info.response);
    } catch (error) {
        console.error("Error sending email:", error);
    }
})();
