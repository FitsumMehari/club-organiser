const router = require("express").Router();
const Event = require("../models/Event");

// Update A CLub By Club ID When A Request To Be A Member is Accepted By The Club Managers
router.post("/reserve/:eventID", async(req, res, next) => {
    if (req.params.eventID) {
        try {
            const event = await Event.findById(req.params.eventID);

            const existingRequest = event.attendees.find(member => member.email === req.body.email);
            if (existingRequest) {
                return res.status(400).json({ message: 'Reservation request already exists' });
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

// Get All Events
router.get("/", async(req, res, next) => {
    try {
        const allEvents = await Event.find({});
        res.status(200).json(allEvents);
    } catch (error) {
        next(error);
    }
});

// Get Single event By ID Of event
router.get("/:eventID", async(req, res, next) => {
    if (!req.params.eventID) {
        res.status(400).json({ message: "Invalid event ID!" });
    } else {
        try {
            const existingEvent = await Event.findById(req.params.eventID)
            res.status(200).json(existingEvent);
        } catch (error) {
            next(error);
        }
    }
});


module.exports = router;