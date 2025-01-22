const router = require("express").Router();
const Event = require("../models/Event");
const { verifyToken } = require("./verifyToken")

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
router.put("/:eventID", verifyToken, async(req, res, next) => {
    try {
        const updatedEvent = await Event.findByIdAndUpdate(req.params.eventID, {
            name: req.body.name,
            category: req.body.category,
            description: req.body.description,
            organiser: req.body.organiser,
            attendees: req.body.attendees,
            status: req.body.status,
            logo: req.body.logo,
            location: req.body.location,
            date: req.body.date,
        });

        const newValues = await Event.findOne(updatedEvent._id);

        res.status(200).json({
            message: "Update Successful!",
            newValues,
        });
    } catch (error) {
        next(error);
    }
});


module.exports = router;