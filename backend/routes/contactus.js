const router = require("express").Router();
const dotenv = require("dotenv");

dotenv.config();

const transporter = require("./transporter");

// Update A CLub By Club ID When A Request To Be A Member is Accepted By The Club Managers
router.post("/", async(req, res, next) => {
    try {

        const mailOptions = {
            from: process.env.OTP_EMAIL,
            to: process.env.OTP_EMAIL,
            subject: "Contact Message",
            text: `From ${req.body.FirstName} ${req.body.LastName} \nEmail ${req.body.Email} \n Phone ${req.body.PhoneNumber}\n ${req.body.Message}`,
        };
        await transporter.sendMail(mailOptions);

        res
            .status(201)
            .json({ message: "Thank you for your message!" });
    } catch (error) {
        next(error);
    }

});

module.exports = router;