const nodemailer = require("nodemailer");

const mailer = {};

mailer.otpSender = async (receiver, code) => {

	const testAccount = await nodemailer.createTestAccount();

	const transporter = nodemailer.createTransport({
		host: testAccount.smtp.host,
		port: testAccount.smtp.port,
		secure: testAccount.smtp.secure,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass,
		},
	});

	try {
		const info = await transporter.sendMail({
			from: testAccount.user, // sender address
			to: receiver, // list of recipients
			subject: "Forgot Password?", // subject line
			text: "Here is your OTP to reset password:" + code, // plain text body
		});

		console.log("Message sent: %s", info.messageId);
		// Preview URL is only available when using an Ethereal test account
		console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	} catch (err) {
		console.error("Error while sending mail:", err);
	}
}

module.exports = mailer;
