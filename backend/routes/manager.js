const router = require("express").Router();
const dotenv = require("dotenv");

dotenv.config();

const Club = require("../models/Club");
const Event = require("../models/Event");
const { verifyToken } = require("./verifyToken");

const transporter = require("./transporter");

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
router.put(
    "/club/approvemembership/:clubID",
    verifyToken,
    async(req, res, next) => {
        if (req.params.clubID) {
            try {
                const club = await Club.findById(req.params.clubID);

                const mailOptions = {
                    from: process.env.OTP_EMAIL,
                    to: req.body.email,
                    subject: "Membership Request",
                    text: `Your request to join ${club.name} club has been approved by the managers.`,
                };

                const pendingRequest = club.members.find(
                    (member) => member.email === req.body.email
                );
                if (pendingRequest) {
                    pendingRequest.status = "accepted";
                    await club.save();
                    await transporter.sendMail(mailOptions);
                    return res
                        .status(200)
                        .json({ message: "Membership request approved!" });
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
    }
);

// Update A CLub By Club ID When A Request To Be A Member is Declined By The Club Managers
router.put(
    "/club/declinemembership/:clubID",
    verifyToken,
    async(req, res, next) => {
        if (req.params.clubID) {
            try {
                const club = await Club.findById(req.params.clubID);

                const pendingRequest = club.members.find(
                    (member) => member.email === req.body.email
                );
                if (pendingRequest) {
                    club.members.splice(club.members.indexOf(pendingRequest), 1)
                    await club.save();
                    return res
                        .status(200)
                        .json({ message: "Membership request declined!" });
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
    }
);

// See membership requests to a club
router.get(
    "/club/membershiprequests/:clubID",
    verifyToken,
    async(req, res, next) => {
        if (req.params.clubID) {
            try {
                const club = await Club.findById(req.params.clubID);

                if (club.members.length > 0) {
                    const members = club.members
                    return res.status(200).json({ message: "Membership requests found", members });
                } else {
                    return res.status(500).json({
                        message: "Membership requests not found!"
                    });
                }
            } catch (error) {
                next(error);
            }
        } else {
            res.status(500).json({ message: "Invalid club ID!" });
        }
    }
);


// See reservation requests to an event using eventID
router.get(
    "/club/event/reservations/:eventID",
    verifyToken,
    async(req, res, next) => {
        if (req.params.eventID) {
            try {
                const event = await Event.findById(req.params.eventID);

                if (event.attendees.length > 0) {
                    const attendees = event.attendees
                    return res.status(200).json({ message: "Reservation requests found", attendees });
                } else {
                    return res.status(500).json({
                        message: "Reservation requests not found!"
                    });
                }
            } catch (error) {
                next(error);
            }
        } else {
            res.status(500).json({ message: "Invalid event ID!" });
        }
    }
);
// Add a new event
router.post("/club/events/:clubID", verifyToken, async(req, res, next) => {
    if (req.params.clubID) {
        if (!req.body.name ||
            !req.body.category ||
            !req.body.description ||
            !req.body.status
        ) {
            res.status(200).json({ message: "Please fill the required inputs!" });
        } else {
            const newEvent = new Event({
                logo: req.body.logo,
                name: req.body.name,
                category: req.body.category,
                description: req.body.description,
                organiser: req.params.clubID,
                location: req.body.location,
                date: req.body.date,
                attendees: req.body.attendees,
                status: req.body.status,
            });
            try {
                const savedEvent = await newEvent.save();

                if (savedEvent) {
                    const club = await Club.findById(req.params.clubID);
                    club.events.push(savedEvent._id);
                    console.log(savedEvent._id);
                    club.save();
                    res
                        .status(201)
                        .json({ message: "Event Created Successfully!", savedEvent });
                } else {
                    res.status(400).json({ message: "Not Saved!" });
                }
            } catch (err) {
                return next(err);
            }
        }
    } else {
        res.status(400).json({ message: "Invalid club ID!" });
    }
});

// Delete A event By event ID
router.delete("/club/events/:eventID", verifyToken, async(req, res, next) => {
    try {
        await Event.findByIdAndDelete(req.params.eventID);

        const clubs = await Club.find();
        clubs.forEach((club) => {
            club.events.forEach((event) => {
                if (event == req.params.eventID) {
                    club.events.splice(club.events.indexOf(event), 1);
                    club.save();
                }
            });
        });

        res.status(201).json({
            message: "Delete Successful!",
        });
    } catch (error) {
        next(error);
    }
});

module.exports = router;