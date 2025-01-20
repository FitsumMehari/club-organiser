const router = require("express").Router();
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const transporter = require("./transporter");
const verifyOTP = require("./verifyOTP");

// const jwtPrivateKey = fs.readFileSync('./rsa.pem', 'utf8');
const jwtPrivateKey = process.env.JWTKEY;

dotenv.config();

const User = require("../models/User");
const { verifyTokenAndAuthorization, verifyToken } = require("./verifyToken");

// Register
router.post("/register", async(req, res, next) => {
    if (!req.body.username ||
        !req.body.password ||
        !req.body.email ||
        !req.body.phone ||
        !req.body.userType
    ) {
        res.status(200).json({ message: "Please fill the required inputs!" });
    } else {
        // Check if user email exists
        const existingUser = await User.findOne({
            email: req.body.email,
        });

        if (!!existingUser) {
            return res.status(200).json({ message: "Email already taken!" });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);

        const newUser = new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email,
            phone: req.body.phone,
            userType: req.body.userType,
            clubs: req.body.clubs,
            profilePic: req.body.profilePic,
        });
        try {
            const savedUser = await newUser.save();

            const { password, ...otherUserInfo } = savedUser._doc;
            res
                .status(201)
                .json({ message: "Account Created Successfully!", otherUserInfo });
        } catch (err) {
            return next(err);
        }
    }
});

// Login
router.post("/login", async(req, res, next) => {
    if (!req.body.email || !req.body.password) {
        res.status(400).json("Please fill the required inputs!");
    } else {
        try {
            const user = await User.findOne({ email: req.body.email });

            if (!user) {
                return res.status(200).json({ message: "Wrong Credientials!" });
            }

            const passwordMatch = await bcrypt.compare(
                req.body.password,
                user.password
            );

            if (!passwordMatch) {
                return res.status(200).json({ message: "Wrong Credientials!" });
            }

            const accessToken = jwt.sign({
                    _id: user._id,
                    username: user.username,
                    email: user.email,
                    phone: user.phone,
                    isAdmin: user.userType === "admin",
                    userType: user.userType,
                    clubs: user.clubs,
                    profilePic: user.profilePic,
                    isLoggedIn: true,
                },
                jwtPrivateKey, {
                    expiresIn: "7d",
                }
            );

            res.status(200).json({ message: "Log In Successful!", accessToken });
        } catch (err) {
            return next(err);
        }
    }
});

// Update
router.put("/updateprofile", verifyToken, async(req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.body._id, {
            username: req.body.username,
            email: req.body.email,
            phone: req.body.phone,
            userType: req.body.userType,
            clubs: req.body.clubs,
            profilePic: req.body.profilePic,
        });

        const accessToken = jwt.sign({
                id: user._id,
                username: user.username,
                email: user.email,
                phone: user.phone,
                userType: user.userType,
                clubs: user.clubs,
                profilePic: user.profilePic,
                isLoggedIn: true,
            },
            jwtPrivateKey, {
                expiresIn: "7d",
            }
        );
        res.status(201).json({
            message: "Update Successful!",
            accessToken,
        });
    } catch (error) {
        next(error);
    }
});

// Reset Password
router.post("/forgot-password", async(req, res, next) => {
    try {
        const { email } = req.body;
        if (!email) return res.status(200).json({ message: "Email is required!" });

        const createdPasswordResetOTP = await sendPasswordResetOTP(email, res);

        res.status(200).json();
    } catch (error) {
        next(error);
    }
});

const sendPasswordResetOTP = async(email, res) => {
    try {
        const existingUser = await User.findOne({ email: email });

        if (!existingUser)
            return res.status(200).json({ message: "User not found" });

        const generatedOTP = generateOTP();
        const otpDetails = {
            email,
            subject: "Password Reset",
            message: `Enter the following code to reset your password. Your OTP is: ${generatedOTP}`,
            duration: 1,
            generatedOTP: generatedOTP,
        };

        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;
    } catch (error) {
        throw error;
    }
};

const sendOTP = async(otpDetails) => {
    const mailOptions = {
        from: process.env.OTP_EMAIL,
        to: otpDetails.email,
        subject: otpDetails.subject,
        text: otpDetails.message,
    };

    try {
        await transporter.sendMail(mailOptions);
        await User.findOneAndUpdate({ email: otpDetails.email }, { generatedOTP: otpDetails.generatedOTP });
    } catch (error) {
        console.error("Error sending OTP:", error);
        throw error;
    }
};

// Generate random code
function generateOTP() {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
}

router.post("/reset-password", verifyOTP, async(req, res, next) => {
    const { email, newPassword } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (!existingUser) {
            return res.status(200).json({ message: "User not found" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        existingUser.password = hashedPassword;
        existingUser.generatedOTP = undefined;
        await existingUser.save();

        res.json({ message: "Password reset successfully" });
    } catch (error) {
        next(error);
    }
});

router.get(
    "/organizers",
    verifyTokenAndAuthorization,
    async(req, res, next) => {
        const organizers = await User.find();

        res.status(200).json(organizers);
    }
);

router.delete(
    "/organizers/:organizerId",
    verifyTokenAndAuthorization,
    async(req, res, next) => {
        const organizers = await User.deleteOne({
            _id: req.params.organizerId,
        });

        res.status(200).json({ message: "Account Deleted Successfully!" });
    }
);

module.exports = router;