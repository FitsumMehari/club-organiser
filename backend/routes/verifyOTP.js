const User = require("../models/User")
    // Verify OTP Route
const verifyOTP = async(req, res, next) => {
    const { email, otp } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        if (existingUser.generatedOTP !== otp) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // res.json({ message: 'OTP verified' });
        next();
    } catch (error) {
        res.status(500).json({ message: "Error verifying OTP" });
    }
};

module.exports = verifyOTP