const router = require("express").Router();
const { User, validate } = require("../models/user");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

// Function to send OTP email
async function sendOTPEmail(userEmail, otp) {
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: "naima261914@gmail.com",
			pass: "crej lbkv xjee wdlx",
		},
	});

	const mailOptions = {
		from: "naima261914@gmail.com",
		to: userEmail,
		subject: "Verify Your Email for Text AI Whisperer",

		html: `
	<div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
		<h2 style="color: #4CAF50;">Welcome to Text AI Whisperer!</h2>
		<p>Dear User,</p>
		<p>Thank you for signing up for <strong>Text AI Whisperer</strong>. We're thrilled to have you on board!</p>
		<p>To complete your registration, please use the following One-Time Password (OTP):</p>
		<div style="text-align: center; margin: 20px 0;">
			<span style="font-size: 24px; color: #4CAF50; font-weight: bold;">${otp}</span>
		</div>
		<p><em>This OTP is valid for the next 10 minutes. Please do not share it with anyone.</em></p>
		<p>Once your email is verified, you'll gain access to all the exciting features of <strong>Text AI Whisperer</strong>.</p>
		<hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
		<p style="font-size: 0.9em; color: #555;">If you didn’t request this email, please ignore it or contact our support team at <a href="mailto:support@textaiwhisperer.com" style="color: #4CAF50; text-decoration: none;">support@textaiwhisperer.com</a>.</p>
		<p style="font-size: 0.9em; color: #555;">Thank you,<br><strong>The Text AI Whisperer Team</strong></p>
	</div>
`,
	};

	try {
		const info = await transporter.sendMail(mailOptions);
		console.log("Email sent successfully:", info.response);
	} catch (error) {
		console.error("Error sending email:", error);
	}
}

// User Signup Route
router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error) return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user) return res.status(409).send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		// Generate OTP
		const otp = crypto.randomInt(100000, 999999).toString(); // Generate a 6-digit OTP

		// Save OTP to the database (you can use a temporary collection or session)
		const newUser = new User({ ...req.body, password: hashPassword, otp });
		await newUser.save();

		// Send OTP to user's email
		await sendOTPEmail(req.body.email, otp);

		res.status(201).send({ message: "User created. Please verify OTP sent to your email." });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// OTP Verification Route
router.post("/verify-otp", async (req, res) => {
	try {
		const { email, otp } = req.body;

		// Find user with the given email
		const user = await User.findOne({ email });
		if (!user) return res.status(404).send({ message: "User not found!" });

		// Check if OTP matches
		if (user.otp === otp) {
			// OTP matched, now mark the user as registered
			user.isVerified = true;  // Mark user as verified
			await user.save();
			res.status(200).send({ message: "OTP verified successfully. You are now registered." });
		} else {
			res.status(400).send({ message: "Invalid OTP." });
		}
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
