const router = require("express").Router();
const dotenv = require("dotenv");

dotenv.config();

const Club = require("../models/Club");
const { verifyToken } = require("./verifyToken");

const transporter = require("./transporter")


// Get Single Club By ID Of Manager
router.get("/club", verifyToken, async(req, res, next) => {
    if (!req.user._id) {
        res.status(400).json({ message: "Invalid managerID!" });
    } else {
        try {
            const existingClub = await Club.findOne({
                managers: req.user._id,
            });
            res.status(200).json(existingClub);
        } catch (error) {
            next(error);
        }
    }
});

// Update A CLub By Club ID When A Request To Be A Member is Accepted By The Club Managers
router.put("/club/approvemembership/:clubID", verifyToken, async(req, res, next) => {
    if (req.params.clubID) {
        try {
            const club = await Club.findById(req.params.clubID);

            const mailOptions = {
                from: process.env.OTP_EMAIL,
                to: req.body.email,
                subject: "Membership Request",
                text: `Your request to join ${club.name} club has been approved by the managers.`,
            };

            const pendingRequest = club.members.find(member => member.email === req.body.email);
            if (pendingRequest) {
                pendingRequest.status = "accepted"
                await club.save()
                await transporter.sendMail(mailOptions);
                return res.status(400).json({ message: 'Membership request approved!' });
            }


            res.status(400).json({
                message: "Request not found!",
            });
        } catch (error) {
            next(error);
        }
    } else {
        res.status(400).json({ message: "Invalid club ID!" });

    }
});



module.exports = router;