const router = require("express").Router();
const Event = require("../models/Event");
const { verifyToken } = require("./verifyToken")

const fs = require("fs");
const path = require("path")
const cloudinaryFileUpload = require("./cloudinaryFileUpload")
const multer = require('multer');

// Configure Multer for file upload handling
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
});
const upload = multer({ storage: storage })


// Update A CLub By Club ID When A Request To Be A Member is Accepted By The Club Managers
router.post("/reserve/:eventID", async(req, res, next) => {
    if (req.params.eventID) {
        try {
            const event = await Event.findById(req.params.eventID);

            const existingRequest = event.attendees.find(member => member.email === req.body.email);
            if (existingRequest) {
                return res.status(200).json({ message: 'Reservation request already exists' });
            }

            event.attendees.push({ name: req.body.name, email: req.body.email, status: "pending" });
            await event.save();

            res.status(201).json({ message: 'Reservation request submitted successfully' });

        } catch (error) {
            next(error);
        }
    } else {
        res.status(400).json({ message: "Invalid club ID!" });
    }
});

// Get Single event By ID Of organizer
router.get("/:organizerID", async(req, res, next) => {
    if (!req.params.organizerID) {
        res.status(400).json({ message: "Invalid organizer ID!" });
    } else {
        try {
            const existingEvents = await Event.find({ organiser: req.params.organizerID })
            res.status(200).json(existingEvents);
        } catch (error) {
            next(error);
        }
    }
});

// Get Single event By ID Of event
router.get("/byId/:eventId", async(req, res, next) => {
    if (!req.params.eventId) {
        res.status(200).json({ message: "Invalid event ID!" });
    } else {
        try {
            // const existingEvent = await Event.find({ _id: req.params.eventId })
            const existingEvent = await Event.findById(req.params.eventId)
            res.status(200).json(existingEvent);
        } catch (error) {
            next(error);
        }
    }
});

// Get All Events
router.get("/", async(req, res, next) => {
    try {
        const allEvents = await Event.find({});
        res.status(200).json(allEvents);
    } catch (error) {
        next(error);
    }
});

// Update A event By event ID
router.put("/:eventID", verifyToken, upload.single("logo"), async(req, res, next) => {
    let event = JSON.parse(req.body.event)

    if (req.file) {
        const tempfileName = req.file.originalname;
        const tempfileURL = req.file.path;
        const tempsavedFile = await cloudinaryFileUpload.setSavedFile(tempfileName, tempfileURL);

        const updatedEvent = await Event.findByIdAndUpdate(req.params.eventID, {
            name: event.name,
            category: event.category,
            description: event.description,
            organiser: event.organiser,
            attendees: event.attendees,
            status: event.status,
            logo: tempsavedFile.fileURL,
            location: event.location,
            date: event.date,
        });

        const newValues = await Event.findOne(updatedEvent._id);

        fs.rmSync(path.join(__dirname, '..', 'uploads', tempsavedFile.fileName))

        res.status(200).json({
            message: "Update Successful!",
            newValues,
        });
    } else {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.eventID, {
            name: event.name,
            category: event.category,
            description: event.description,
            organiser: event.organiser,
            attendees: event.attendees,
            status: event.status,
            logo: event.logo,
            location: event.location,
            date: event.date,
        });

        const newValues = await Event.findOne(updatedEvent._id);

        res.status(200).json({
            message: "Update Successful!",
            newValues,
        });
    }
    try {

    } catch (error) {
        next(error);
    }
});



module.exports = router;