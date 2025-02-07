const router = require("express").Router();
const dotenv = require("dotenv");

dotenv.config();

const Club = require("../models/Club");
const Event = require("../models/Event");
const { verifyToken } = require("./verifyToken");

const transporter = require("./transporter");
const QRCode = require("qrcode");
const fs = require("fs");
const path = require("path");

const cloudinaryFileUpload = require("./cloudinaryFileUpload");
const multer = require("multer");

// Configure Multer for file upload handling
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

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
                    club.members.splice(club.members.indexOf(pendingRequest), 1);
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
                    const members = club.members;
                    return res
                        .status(200)
                        .json({ message: "Membership requests found", members });
                } else {
                    return res.status(400).json({
                        message: "Membership requests not found!",
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
                    const attendees = event.attendees;
                    return res
                        .status(200)
                        .json({ message: "Reservation requests found", attendees });
                } else {
                    return res.status(400).json({
                        message: "Reservation requests not found!",
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
router.post(
    "/club/events/:clubID",
    verifyToken,
    upload.single("logo"),
    async(req, res, next) => {
        console.log(req.body);
        console.log(req.file);

        let event = JSON.parse(req.body.event);

        if (req.file) {
            const tempfileName = req.file.originalname;
            const tempfileURL = req.file.path;
            const tempsavedFile = await cloudinaryFileUpload.setSavedFile(
                tempfileName,
                tempfileURL
            );

            if (req.params.clubID) {
                if (!event.name ||
                    !event.category ||
                    !event.description ||
                    !event.status
                ) {
                    res.status(200).json({ message: "Please fill the required inputs!" });
                } else {
                    const newEvent = new Event({
                        logo: tempsavedFile.fileURL,
                        name: event.name,
                        category: event.category,
                        description: event.description,
                        organiser: req.params.clubID,
                        location: event.location,
                        date: event.date,
                        attendees: event.attendees,
                        status: event.status,
                    });
                    try {
                        const savedEvent = await newEvent.save();

                        if (savedEvent) {
                            const club = await Club.findById(req.params.clubID);
                            club.events.push(savedEvent._id);
                            club.save();
                            fs.rmSync(path.join(__dirname, '..', 'uploads', tempsavedFile.fileName))

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
        } else {
            if (req.params.clubID) {
                if (!event.name ||
                    !event.category ||
                    !event.description ||
                    !event.status
                ) {
                    res.status(200).json({ message: "Please fill the required inputs!" });
                } else {
                    const newEvent = new Event({
                        logo: event.logo,
                        name: event.name,
                        category: event.category,
                        description: event.description,
                        organiser: req.params.clubID,
                        location: event.location,
                        date: event.date,
                        attendees: event.attendees,
                        status: event.status,
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
        }
    }
);

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

        res.status(200).json({
            message: "Delete Successful!",
        });
    } catch (error) {
        next(error);
    }
});

// Update an event By event ID When A Request is Accepted By The Club Managers
router.put(
    "/club/event/approvereservation/:eventID",
    verifyToken,
    async(req, res, next) => {
        if (req.params.eventID) {
            try {
                const event = await Event.findById(req.params.eventID);

                let mailOptions = {
                    from: process.env.OTP_EMAIL,
                    to: req.body.email,
                    subject: "Event Ticket",
                    text: `Your request to reserve a ticket ${event.name} event has been approved by the managers.`,
                    attachDataUrls: true,
                    attachments: [],
                };

                const pendingRequest = event.attendees.find(
                    (attendee) => attendee.email === req.body.email
                );

                if (pendingRequest) {
                    // move this code to its own file
                    let data = JSON.stringify({
                        eventName: event.name,
                        attendeeEmail: pendingRequest.email,
                        attendeeName: pendingRequest.name,
                        _id: pendingRequest._id,
                    });

                    // Options for QR code generation
                    const options = {
                        errorCorrectionLevel: "H",
                        type: "image/png",
                        quality: 0.92,
                        margin: 1,
                        color: {
                            dark: "#000000",
                            light: "#FFFFFF",
                        },
                    };
                    let imageFileName = `${pendingRequest.email}.png`;
                    // Generate QR code and save as image
                    QRCode.toFile(
                        path.join(__dirname, imageFileName),
                        data,
                        options,
                        function(err) {
                            if (err) throw err;
                            console.log("QR code saved!");
                        }
                    );

                    mailOptions.attachments.push({
                        // filename: imageFileName,
                        path: path.join(__dirname, imageFileName),
                        // cid: "qrcode",
                    });

                    pendingRequest.status = "accepted";
                    await event.save();

                    await transporter.sendMail(mailOptions);
                    try {
                        // remove the generated image
                        fs.rmSync(path.join(__dirname, imageFileName));
                    } catch (error) {
                        console.log(error);
                    }

                    return res
                        .status(200)
                        .json({ message: "Reservation request approved!" });
                }

                res.status(200).json({
                    message: "Request not found!",
                });
            } catch (error) {
                next(error);
            }
        } else {
            res.status(400).json({ message: "Invalid event ID!" });
        }
    }
);

// Update A CLub By Club ID When A Request To Be A Member is Declined By The Club Managers
router.put(
    "/club/event/declinereservation/:eventID",
    verifyToken,
    async(req, res, next) => {
        if (req.params.eventID) {
            try {
                const event = await Event.findById(req.params.eventID);

                const pendingRequest = event.attendees.find(
                    (attendee) => attendee.email === req.body.email
                );

                if (pendingRequest) {
                    event.attendees.splice(event.attendees.indexOf(pendingRequest), 1);
                    await event.save();
                    return res
                        .status(200)
                        .json({ message: "Reservation request declined!" });
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

module.exports = router;